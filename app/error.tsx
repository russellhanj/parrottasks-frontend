"use client";
export default function Error({ error }: { error: Error & { digest?: string } }) {
  return (
    <div className="rounded-lg border border-red-200 bg-red-50 p-4">
      <h2 className="mb-1 font-semibold text-red-700">Something went wrong</h2>
      <p className="text-sm text-red-700/80">{error.message}</p>
    </div>
  );
}
