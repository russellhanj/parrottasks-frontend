// lib/api.ts
const BASE =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "") || "http://127.0.0.1:8000";

async function get<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, { ...init, cache: "no-store" });
  if (!res.ok) throw new Error(`${path} ${res.status} ${await res.text()}`);
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
  if (!res.ok) throw new Error(`${path} ${res.status} ${await res.text()}`);
  return res.json() as Promise<T>;
}

export interface ListOpts { limit?: number; offset?: number }
export type RecordingStatus = "uploaded" | "processing" | "transcribed" | "summarized" | "error";

export interface RecordingRow {
  id: string;
  filename: string;
  createdAt: string;
  durationSec?: number | null;
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

export interface CreateRecordingResponse extends RecordingRow {
  fileSize?: number;
  mimeType?: string;
  sha256?: string;
}

async function createRecording(file: File, userId = 1, init?: RequestInit): Promise<CreateRecordingResponse> {
  const form = new FormData();
  form.append("file", file, file.name);
  form.append("user_id", String(userId)); // matches FastAPI Form(...) param

  const res = await fetch(`${BASE}/recordings`, {
    method: "POST",
    body: form,            // ⚠️ do NOT set Content-Type; browser sets it with boundary
    cache: "no-store",
    ...init,
  });

  if (!res.ok) {
    const msg = await res.text().catch(() => "");
    throw new Error(`/recordings ${res.status} ${msg}`);
  }
  return res.json() as Promise<CreateRecordingResponse>;
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

  stats: (init?: RequestInit) =>
    get<{ recordings: number; tasks: number }>("/stats", init),

  // ✅ Real upload (multipart)
  createRecording,
};
