// app/(dashboard)/recordings/[id]/page.tsx
"use client";

import { use, useEffect, useState } from "react";
import { api } from "@/lib/api";

type RouteParams = { id: string };

export default function Page({ params }: { params: Promise<RouteParams> }) {
  const { id } = use(params); // ✅ unwrap once

  const [rec, setRec] = useState<any>(null);
  const [tasks, setTasks] = useState<any[]>([]);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    let cancel = false;
    Promise.all([api.getRecording(id), api.listTasksFor(id)])
      .then(([r, ts]) => { if (!cancel) { setRec(r); setTasks(ts); } })
      .catch(e => !cancel && setErr(e instanceof Error ? e.message : "Load error"));
    return () => { cancel = true; };
  }, [id]);

  if (err) return <div className="p-4 border bg-red-50">{err}</div>;
  if (!rec) return <div className="p-4 border">Loading…</div>;

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">{rec.filename}</h2>
        <p className="text-sm text-gray-500">{rec.status}</p>
      </div>

      <div>
        <h3 className="font-medium">Summary</h3>
        <p className="text-sm">{rec.summary ?? "No summary yet."}</p>
      </div>

      <div>
        <h3 className="font-medium">Tasks</h3>
        <ul className="list-disc pl-6">
          {tasks.map(t => <li key={t.id}>{t.title}{t.assignee ? ` — ${t.assignee}` : ""}</li>)}
        </ul>
      </div>
    </section>
  );
}
