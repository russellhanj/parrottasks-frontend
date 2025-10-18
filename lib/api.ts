// lib/api.ts
const BASE = process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "") || "http://127.0.0.1:8000";

async function get<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, { ...init, cache: "no-store" });
  if (!res.ok) throw new Error(`${path} ${res.status}`);
  return res.json() as Promise<T>;
}

export const api = {
  apiHealth: (init?: RequestInit) => get<{ ok: boolean }>("/healthz", init),
  dbHealth: (init?: RequestInit) => get<{ ok: boolean; error?: string }>("/db/health", init),
  listRecordings: (init?: RequestInit) => get<Array<{ id: string }>>("/recordings", init),
  listTasksFor: (id: string, init?: RequestInit) =>
    get<Array<{ id: number }>>(`/recordings/${id}/tasks`, init),
};
