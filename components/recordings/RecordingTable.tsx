"use client";

import Link from "next/link";
import StatusDot from "@/components/common/StatusDot"; // you already have this
import { useMemo } from "react";

export type RecordingRow = {
  id: string;
  filename: string;
  createdAt: string; // ISO
  durationSec?: number;
  status: "uploaded" | "processing" | "transcribed" | "summarized" | "error";
};

export default function RecordingTable({ rows }: { rows: RecordingRow[] }) {
  const items = useMemo(
    () =>
      rows.slice().sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt)),
    [rows]
  );

  return (
    <div className="overflow-x-auto rounded-xl border bg-white">
      <table className="min-w-full text-sm">
        <thead className="text-left text-gray-500 border-b">
          <tr>
            <th className="px-4 py-3">Filename</th>
            <th className="px-4 py-3">Created</th>
            <th className="px-4 py-3">Duration</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {items.map((r) => (
            <tr key={r.id} className="border-b last:border-none">
              <td className="px-4 py-3 font-medium">{r.filename}</td>
              <td className="px-4 py-3">{formatDate(r.createdAt)}</td>
              <td className="px-4 py-3">{formatDuration(r.durationSec)}</td>
              <td className="px-4 py-3">
                <span className="inline-flex items-center gap-2">
                  <StatusDot tone={toneFor(r.status)} />
                  {labelFor(r.status)}
                </span>
              </td>
              <td className="px-4 py-3 text-right">
                <Link
                  href={`/recordings/${r.id}`}
                  className="underline text-indigo-600"
                >
                  View
                </Link>
              </td>
            </tr>
          ))}
          {items.length === 0 && (
            <tr>
              <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                No recordings yet. <Link href="/uploads" className="underline">Upload one</Link>.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

function labelFor(s: RecordingRow["status"]) {
  switch (s) {
    case "uploaded": return "Uploaded";
    case "processing": return "Processing";
    case "transcribed": return "Transcribed";
    case "summarized": return "Summarized";
    default: return "Error";
  }
}
function toneFor(s: RecordingRow["status"]) {
  switch (s) {
    case "uploaded": return "warn" as const;
    case "processing": return "warn" as const;
    case "transcribed": return "ok" as const;
    case "summarized": return "ok" as const;
    default: return "bad" as const;
  }
}
function formatDuration(sec?: number) {
  if (!sec && sec !== 0) return "—";
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}m ${s}s`;
}
function formatDate(iso: string) {
  try {
    return new Intl.DateTimeFormat(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}
