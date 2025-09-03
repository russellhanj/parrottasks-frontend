import Link from "next/link";

export default function Page() {
  return (
    <section className="space-y-6">
      <header>
        <h2 className="text-xl sm:text-2xl font-semibold">Dashboard</h2>
        <p className="text-sm text-gray-600">
          API health, quick stats, recent recordings.
        </p>
      </header>

      {/* Stats grid only */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-xl border bg-white p-4">
          <div className="text-sm text-gray-500">API</div>
          <div className="mt-1 text-2xl font-semibold">Healthy</div>
        </div>
        <div className="rounded-xl border bg-white p-4">
          <div className="text-sm text-gray-500">Recordings</div>
          <div className="mt-1 text-2xl font-semibold">0</div>
        </div>
        <div className="rounded-xl border bg-white p-4">
          <div className="text-sm text-gray-500">Tasks extracted</div>
          <div className="mt-1 text-2xl font-semibold">0</div>
        </div>
      </div>

      <div className="rounded-xl border bg-white p-6">
        <h3 className="mb-2 text-lg font-medium">Recent Recordings</h3>
        <p className="text-sm text-gray-600">
          No recordings yet.{" "}
          <Link href="/uploads" className="underline">Upload one</Link>.
        </p>
      </div>
    </section>
  );
}
