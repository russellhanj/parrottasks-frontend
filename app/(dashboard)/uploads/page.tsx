export default function Page() {
  return (
    <section className="space-y-6">
      <header>
        <h2 className="text-xl font-semibold">Upload</h2>
        <p className="text-sm text-gray-600">Upload your Microsoft Teams recording to process.</p>
      </header>

      <div className="rounded-xl border border-dashed bg-white p-12 text-center">
        <p className="text-sm text-gray-600">Drag & drop file here, or click to select</p>
      </div>

      <div className="rounded-lg border bg-white p-4">
        <p className="text-sm text-gray-600">Progress: 0%</p>
        <div className="mt-2 h-2 w-full rounded bg-gray-100">
          <div className="h-2 w-0 rounded bg-gray-800 transition-all" />
        </div>
      </div>
    </section>
  );
}
