export default function Page() {
  return (
    <section className="space-y-6">
      <header>
        <h2 className="text-xl font-semibold">Dashboard</h2>
        <p className="text-sm text-gray-600">
          API health, quick stats, recent recordings.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-3">
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
          No recordings yet. <a href="/uploads" className="underline">Upload one</a>.
        </p>
      </div>
    </section>
  );
}
