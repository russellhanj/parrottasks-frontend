export default function Page() {
  return (
    <section className="space-y-6">
      <header>
        <h2 className="text-xl font-semibold">About ParrotTasks</h2>
        <p className="text-sm text-gray-600">Lightweight app to turn meeting recordings into actionable tasks.</p>
      </header>

      <div className="rounded-xl border bg-white p-4">
        <ul className="list-disc pl-5 text-sm text-gray-700">
          <li>Next.js (TypeScript) on Vercel</li>
          <li>FastAPI backend on Render</li>
          <li>Upstash Redis, Neon Postgres, Cloudflare R2</li>
          <li>OpenAI Whisper + GPT, Wrike API</li>
        </ul>
      </div>
    </section>
  );
}
