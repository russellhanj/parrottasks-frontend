// lib/api.ts
const BASE = process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "") || "http://127.0.0.1:8000";

async function get<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, { ...init, cache: "no-store" });
  if (!res.ok) throw new Error(`${path} ${res.status}`);
  return res.json() as Promise<T>;
}

export interface ListOpts { limit?: number; offset?: number }

export const api = {
  apiHealth: (init?: RequestInit) => get<{ ok: boolean }>("/healthz", init),
  dbHealth: (init?: RequestInit) =>
    get<{ ok: boolean; error?: string }>("/db/health", init),
  listRecordings: (opts: ListOpts = {}, init?: RequestInit) => {
    const q = new URLSearchParams();
    if (opts.limit != null) q.set("limit", String(opts.limit));
    if (opts.offset != null) q.set("offset", String(opts.offset));
    const qs = q.toString();
    return get<
      Array<{
        id: string;
        filename: string;
        createdAt: string;
        durationSec?: number;
        status: "uploaded" | "processing" | "transcribed" | "summarized" | "error";
      }>
    >(`/recordings${qs ? `?${qs}` : ""}`, init);
  },
  listTasksFor: (id: string, init?: RequestInit) =>
    get<Array<{ id: number }>>(`/recordings/${id}/tasks`, init),
};