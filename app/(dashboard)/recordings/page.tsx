"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import PageHeader from "@/components/common/PageHeader";
import Button from "@/components/common/Button";
import Alert from "@/components/common/Alert";
import RecordingTable, { RecordingRow } from "@/components/recordings/RecordingTable";
import { api } from "@/lib/api";

const PAGE_SIZE = 20;

export default function Page() {
  const [rows, setRows] = useState<RecordingRow[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    api
      .listRecordings({ limit: PAGE_SIZE + 1, offset })
      .then((data) => {
        if (cancelled) return;
        setHasMore(data.length > PAGE_SIZE);
        setRows(
          data.slice(0, PAGE_SIZE).map((r) => ({
            ...r,
            durationSec: r.durationSec ?? undefined,
          }))
        );
      })
      .catch((e) => {
        if (cancelled) return;
        setError(e instanceof Error ? e.message : "Failed to load recordings");
        setRows([]);
      })
      .finally(() => !cancelled && setLoading(false));

    return () => {
      cancelled = true;
    };
  }, [offset]);

  return (
    <section className="space-y-6">
      <PageHeader
        title="Recordings"
        subtitle="List of recordings with status."
        action={
          <Link href="/uploads">
            <Button variant="primary">Upload</Button>
          </Link>
        }
      />

      {error && <Alert variant="error">{error}</Alert>}

      {loading ? (
        <div className="animate-pulse rounded-xl border bg-white p-6 text-sm text-gray-500">
          Loading recordings…
        </div>
      ) : (
        <RecordingTable rows={rows} />
      )}

      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-500">
          {rows.length > 0 ? `${offset + 1}–${offset + rows.length}` : "0"}{" "}
          {rows.length > 0 ? "of" : ""} {rows.length > 0 ? (hasMore ? "…" : offset + rows.length) : ""}
        </div>
        <div className="flex gap-2">
          <Button
            variant="secondary"
            disabled={offset === 0}
            onClick={() => setOffset((o) => Math.max(0, o - PAGE_SIZE))}
          >
            Previous
          </Button>
          <Button
            variant="secondary"
            disabled={!hasMore}
            onClick={() => setOffset((o) => o + PAGE_SIZE)}
          >
            Next
          </Button>
        </div>
      </div>
    </section>
  );
}
