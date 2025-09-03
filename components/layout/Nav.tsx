"use client";

import Link from "next/link";
import { useState } from "react";

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="mb-6">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex items-center justify-between py-3">
          <h1 className="text-xl sm:text-2xl font-semibold">ParrotTasks</h1>

          {/* Desktop nav */}
          <nav className="hidden md:flex gap-4 text-sm">
            <Link href="/" className="hover:underline">Dashboard</Link>
            <Link href="/uploads" className="hover:underline">Upload</Link>
            <Link href="/recordings" className="hover:underline">Recordings</Link>
            <Link href="/settings" className="hover:underline">Settings</Link>
            <Link href="/about" className="hover:underline">About</Link>
          </nav>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden rounded-lg border px-3 py-2 text-sm"
            onClick={() => setOpen((v) => !v)}
          >
            Menu
          </button>
        </div>

        {/* Mobile nav */}
        {open && (
          <div className="md:hidden grid gap-1 pb-3">
            <Link className="rounded-md px-3 py-2 hover:bg-gray-100" href="/">Dashboard</Link>
            <Link className="rounded-md px-3 py-2 hover:bg-gray-100" href="/uploads">Upload</Link>
            <Link className="rounded-md px-3 py-2 hover:bg-gray-100" href="/recordings">Recordings</Link>
            <Link className="rounded-md px-3 py-2 hover:bg-gray-100" href="/settings">Settings</Link>
            <Link className="rounded-md px-3 py-2 hover:bg-gray-100" href="/about">About</Link>
          </div>
        )}
      </div>
    </header>
  );
}
