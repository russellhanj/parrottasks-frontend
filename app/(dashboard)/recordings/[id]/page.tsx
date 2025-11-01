// app/(dashboard)/recordings/[id]/page.tsx
"use client";

import { use, useEffect, useState } from "react";
import { api, processRecording } from "@/lib/api";

// local types
// local types
type RecordingStatus =
  | "queued" | "processing" | "ready" | "failed"   // new pipeline
  | "uploaded" | "transcribed" | "summarized" | "error"; // legacy
type RecDetail = {
  id: string;
  filename: string;
  createdAt: string;
  durationSec?: number; // keep as number | undefined locally
  status: RecordingStatus;
  summary?: string | null;
};
type TaskItem = {
  id: number | string;
  recordingId: string;
  title: string;
  assignee?: string | null;
  dueDate?: string | null;
  priority?: "low" | "med" | "high" | null;
  status?: "todo" | "doing" | "done";
  confidence?: number | null;
};
const isTerminal = (s: RecordingStatus) =>
  s === "ready" || s === "failed" || s === "error";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  const [rec, setRec] = useState<RecDetail | null>(null);
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [err, setErr] = useState<string | null>(null);
  const [isEnqueuing, setIsEnqueuing] = useState(false);

  // initial load
  useEffect(() => {
    let cancel = false;
    Promise.all([api.getRecording(id), api.listTasksFor(id)])
      .then(([r, ts]) => {
        if (!cancel) {
          const normalized: RecDetail = { ...r, durationSec: r.durationSec ?? undefined };
          setRec(normalized);
          setTasks(ts);
        }
      })
      .catch((e: unknown) => {
        const msg = e instanceof Error ? e.message : String(e);
        if (!cancel) setErr(msg);
      });
    return () => { cancel = true; };
  }, [id]);

  // polling while not terminal
  useEffect(() => {
    if (!rec || isTerminal(rec.status)) return;
    let stop = false;
    const tick = async () => {
      try {
        const r = await api.getRecording(id);
        if (stop) return;
        setRec({ ...r, durationSec: r.durationSec ?? undefined });

        // refresh tasks periodically too (cheap & simple)
        const ts = await api.listTasksFor(id);
        if (stop) return;
        setTasks(ts);
      } catch (e) {
        // swallow transient polling errors
      } finally {
        if (!stop && rec && !isTerminal(rec.status)) {
          setTimeout(tick, 3000);
        }
      }
    };
    const t = setTimeout(tick, 3000);
    return () => { stop = true; clearTimeout(t); };
    // re-evaluate when status flips
  }, [id, rec?.status]);

  async function onProcess() {
    if (!rec) return;
    setIsEnqueuing(true);
    try {
      await processRecording(id);
      // optimistic nudge; polling will pick up real state
      setRec({ ...rec, status: rec.status === "uploaded" ? "queued" : rec.status });
    } catch (e) {
      setErr(e instanceof Error ? e.message : String(e));
    } finally {
      setIsEnqueuing(false);
    }
  }

  if (err) return <div className="p-4 border bg-red-50">{err}</div>;
  if (!rec) return <div className="p-4 border">Loading…</div>;

  const canProcess = !["processing", "ready"].includes(rec.status);

  return (
    <section className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-xl font-semibold">{rec.filename}</h2>
          <p className="text-sm text-gray-500">Status: {rec.status}</p>
        </div>
        <button
          onClick={onProcess}
          disabled={!canProcess || isEnqueuing}
          className="rounded-xl px-3 py-2 border shadow-sm disabled:opacity-50"
        >
          {isEnqueuing
            ? "Enqueuing…"
            : canProcess
            ? "Process recording"
            : rec.status === "processing"
            ? "Processing…"
            : "Ready"}
        </button>
      </div>

      <div>
        <h3 className="font-medium">Summary</h3>
        <p className="text-sm">{rec.summary ?? "No summary yet."}</p>
      </div>

      <div>
        <h3 className="font-medium">Tasks</h3>
        <ul className="list-disc pl-6">
          {tasks.map((t) => (
            <li key={String(t.id)}>
              {t.title}
              {t.assignee ? ` — ${t.assignee}` : ""}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}