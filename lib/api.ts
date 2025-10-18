// lib/api.ts
const BASE = process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "") || "http://127.0.0.1:8000";

async function get<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, { ...init, cache: "no-store" });
  if (!res.ok) throw new Error(`${path} ${res.status}`);
  return res.json() as Promise<T>;
}

export const api = {
  apiHealth: () => get<{ ok: boolean }>("/healthz"),
  dbHealth: () => get<{ ok: boolean; error?: string }>("/db/health"),
  listRecordings: () => get<Array<{ id: string }>>("/recordings"),
  listTasksFor: (id: string) =>
    get<Array<{ id: number }>>(`/recordings/${id}/tasks`),
};
