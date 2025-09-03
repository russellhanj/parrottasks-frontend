type Props = { params: { id: string } };

export default function Page({ params }: Props) {
  const { id } = params;
  return (
    <section className="space-y-6">
      <header>
        <h2 className="text-xl font-semibold">Recording #{id}</h2>
        <p className="text-sm text-gray-600">Summary • Transcript • Tasks</p>
      </header>

      <div className="rounded-xl border bg-white p-4">
        <div className="mb-4 flex gap-2 text-sm">
          <button className="rounded-md border px-3 py-1.5">Summary</button>
          <button className="rounded-md border px-3 py-1.5">Transcript</button>
          <button className="rounded-md border px-3 py-1.5">Tasks</button>
        </div>
        <div className="text-sm text-gray-600">Select a tab (placeholder).</div>
      </div>
    </section>
  );
}
