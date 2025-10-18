// app/(dashboard)/recordings/[id]/page.tsx
"use client";

import { use, useEffect, useState } from "react";
import { api } from "@/lib/api";

// local types (avoid any)
type RecordingStatus = "uploaded" | "processing" | "transcribed" | "summarized" | "error";
type RecDetail = {
  id: string;
  filename: string;
  createdAt: string;
  durationSec?: number;
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

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params); // Next 15 params are a Promise

  const [rec, setRec] = useState<RecDetail | null>(null);     // was any
  const [tasks, setTasks] = useState<TaskItem[]>([]);         // was any[]
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    let cancel = false;
    Promise.all([api.getRecording(id), api.listTasksFor(id)])
      .then(([r, ts]) => { if (!cancel) { setRec(r); setTasks(ts); } })
      .catch((e: unknown) => {
        const msg = e instanceof Error ? e.message : String(e);
        if (!cancel) setErr(msg);
      });
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
          {tasks.map(t => (
            <li key={String(t.id)}>
              {t.title}{t.assignee ? ` — ${t.assignee}` : ""}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
