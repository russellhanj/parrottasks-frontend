export default function Page() {
  return (
    <section className="space-y-6">
      <header>
        <h2 className="text-xl font-semibold">Recordings</h2>
        <p className="text-sm text-gray-600">List of recordings with status.</p>
      </header>

      <div className="overflow-hidden rounded-xl border bg-white">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left font-medium">Filename</th>
              <th className="px-4 py-2 text-left font-medium">Created</th>
              <th className="px-4 py-2 text-left font-medium">Duration</th>
              <th className="px-4 py-2 text-left font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="px-4 py-2">—</td>
              <td className="px-4 py-2">—</td>
              <td className="px-4 py-2">—</td>
              <td className="px-4 py-2"><span className="inline-block h-2 w-2 rounded-full bg-gray-300 align-middle" /> <span className="ml-2 text-gray-600">empty</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
