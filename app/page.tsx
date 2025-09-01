"use client";

import { useEffect, useState } from "react";

export default function Page() {
  const [status, setStatus] = useState<string>("checking...");

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) {
      setStatus("NEXT_PUBLIC_API_URL not set");
      return;
    }

    fetch(`${apiUrl}/healthz`)
      .then((res) => res.json())
      .then((data) => setStatus(data.ok ? "Backend is OK ✅" : "Backend error ❌"))
      .catch(() => setStatus("Failed to reach backend ❌"));
  }, []);

  return (
    <main style={{ padding: 24 }}>
      <h1 className="text-xl font-bold">ParrotTasks Frontend</h1>
      <p>{status}</p>
    </main>
  );
}
