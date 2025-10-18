"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api";

type Health = "checking" | "healthy" | "down";
// 👇 add this helper at top-level
function errorMessage(e: unknown): string {
  if (e instanceof Error) return e.message;
  if (typeof e === "string") return e;
  try {
    return JSON.stringify(e);
  } catch {
    return "Unknown error";
  }
}

export default function Page() {
  const [apiHealth, setApiHealth] = useState<Health>("checking");
  const [dbHealth, setDbHealth] = useState<Health>("checking");
  const [recordingCount, setRecordingCount] = useState<number | null>(null);
  const [taskCount, setTaskCount] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
  let cancelled = false;

  (async () => {
    try {
      // API health
      const apiOk = await api.apiHealth().then((r) => r.ok).catch(() => false);
      if (!cancelled) setApiHealth(apiOk ? "healthy" : "down");

      // DB health
      const dbOk = await api.dbHealth().then((r) => r.ok).catch(() => false);
      if (!cancelled) setDbHealth(dbOk ? "healthy" : "down");

      // Recordings + tasks
      const recs = await api.listRecordings().catch(() => []);
      if (!cancelled) setRecordingCount(recs.length);

      // Sum tasks across these recordings (lightweight for MVP)
      const counts = await Promise.all(
        recs.slice(0, 25).map((r) =>
          api.listTasksFor(r.id).then((ts) => ts.length).catch(() => 0)
        )
      );
      if (!cancelled) setTaskCount(counts.reduce((a, b) => a + b, 0));
    } catch (e: unknown) {        // <- typed unknown
      if (!cancelled) {
        setError(errorMessage(e)); // <- safe stringify
        setApiHealth("down");
        setDbHealth("down");
      }
    }
  })();

  return () => {
    cancelled = true;
  };
}, []);


  const apiLabel = useMemo(() => labelFor(apiHealth), [apiHealth]);
  const dbLabel = useMemo(() => labelFor(dbHealth), [dbHealth]);

  return (
    <section className="space-y-6">
      <header>
        <h2 className="text-xl sm:text-2xl font-semibold">Dashboard</h2>
        <p className="text-sm text-gray-600">API health, quick stats, recent recordings.</p>
      </header>

      {/* Stats grid */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard title="API" value={apiLabel.text} tone={apiLabel.tone} />
        <StatCard title="Database" value={dbLabel.text} tone={dbLabel.tone} />
        <StatCard title="Recordings" value={fmtCount(recordingCount)} />
        <StatCard title="Tasks extracted" value={fmtCount(taskCount)} />
      </div>

      {error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      <div className="rounded-xl border bg-white p-6">
        <h3 className="mb-2 text-lg font-medium">Recent Recordings</h3>
        <p className="text-sm text-gray-600">
          No recordings yet.{" "}
          <Link href="/uploads" className="underline">Upload one</Link>.
        </p>
      </div>
    </section>
  );
}

function StatCard({
  title,
  value,
  tone,
}: {
  title: string;
  value: string;
  tone?: "ok" | "warn" | "bad";
}) {
  return (
    <div className="rounded-xl border bg-white p-4">
      <div className="flex items-center gap-2 text-sm text-gray-500">
        {tone ? <StatusDot tone={tone} /> : null}
        <span>{title}</span>
      </div>
      <div className="mt-1 text-2xl font-semibold">{value}</div>
    </div>
  );
}

function StatusDot({ tone = "ok" }: { tone?: "ok" | "warn" | "bad" }) {
  const toneClass =
    tone === "ok" ? "bg-emerald-500" : tone === "warn" ? "bg-amber-500" : "bg-red-500";
  return <span className={`inline-block h-2.5 w-2.5 rounded-full ${toneClass}`} />;
}

function labelFor(state: Health) {
  if (state === "checking") return { text: "Checking…", tone: "warn" as const };
  if (state === "healthy") return { text: "Healthy", tone: "ok" as const };
  return { text: "Down", tone: "bad" as const };
}

function fmtCount(n: number | null) {
  if (n === null) return "—";
  return new Intl.NumberFormat().format(n);
}
