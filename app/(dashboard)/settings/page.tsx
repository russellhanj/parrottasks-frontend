export default function Page() {
  return (
    <section className="space-y-6">
      <header>
        <h2 className="text-xl font-semibold">Settings</h2>
        <p className="text-sm text-gray-600">Profile & Wrike connection (placeholder).</p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border bg-white p-4">
          <h3 className="font-medium">Profile</h3>
          <p className="mt-1 text-sm text-gray-600">Sign-in and profile settings TBD.</p>
        </div>
        <div className="rounded-xl border bg-white p-4">
          <h3 className="font-medium">Wrike</h3>
          <p className="mt-1 text-sm text-gray-600">Connect your Wrike account (coming soon).</p>
        </div>
      </div>
    </section>
  );
}
