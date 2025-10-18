// lib/api.ts
const BASE =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "") || "http://127.0.0.1:8000";

async function get<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, { ...init, cache: "no-store" });
  if (!res.ok) throw new Error(`${path} ${res.status}`);
  return res.json() as Promise<T>;
}

async function post<T, B = unknown>(path: string, body: B, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    method: "POST",
    headers: { "content-type": "application/json", ...(init?.headers || {}) },
    body: JSON.stringify(body),
    cache: "no-store",
    ...init,
  });
  if (!res.ok) throw new Error(`${path} ${res.status}`);
  return res.json() as Promise<T>;
}

export interface ListOpts { limit?: number; offset?: number }
export type RecordingStatus = "uploaded" | "processing" | "transcribed" | "summarized" | "error";

export interface RecordingRow {
  id: string;
  filename: string;
  createdAt: string;
  durationSec?: number;
  status: RecordingStatus;
}

export interface TaskItem {
  id: number | string;
  recordingId: string;
  title: string;
  assignee?: string | null;
  dueDate?: string | null;
  priority?: "low" | "med" | "high" | null;
  status?: "todo" | "doing" | "done";
  confidence?: number | null;
}

export const api = {
  apiHealth: (init?: RequestInit) => get<{ ok: boolean }>("/healthz", init),

  dbHealth: (init?: RequestInit) =>
    get<{ ok: boolean; error?: string }>("/db/health", init),

  listRecordings: (opts: ListOpts = {}, init?: RequestInit) => {
    const q = new URLSearchParams();
    if (opts.limit != null) q.set("limit", String(opts.limit));
    if (opts.offset != null) q.set("offset", String(opts.offset));
    const qs = q.toString();
    return get<RecordingRow[]>(`/recordings${qs ? `?${qs}` : ""}`, init);
  },

  getRecording: (id: string, init?: RequestInit) =>
    get<RecordingRow & { summary?: string | null }>(`/recordings/${id}`, init),

  listTasksFor: (id: string, init?: RequestInit) =>
    get<TaskItem[]>(`/recordings/${id}/tasks`, init),

  // used by the dashboard (optional, but recommended)
  stats: (init?: RequestInit) =>
    get<{ recordings: number; tasks: number }>("/stats", init),

  // MVP upload flow (create row with status=uploaded; wire real upload later)
  createRecording: (filename: string, init?: RequestInit) =>
    post<{ id: string }, { filename: string }>("/recordings", { filename }, init),
};
