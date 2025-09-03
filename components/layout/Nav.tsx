"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="mb-6 border-b border-gray-200">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex items-center justify-between py-3">
          {/* Brand with logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="ParrotTasks logo"
              width={32}
              height={32}
              className="rounded-full"
            />
            <span className="text-xl sm:text-2xl font-semibold">ParrotTasks</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex gap-4 text-sm">
            <Link href="/" className="hover:underline">Dashboard</Link>
            <Link href="/uploads" className="hover:underline">Upload</Link>
            <Link href="/recordings" className="hover:underline">Recordings</Link>
            <Link href="/settings" className="hover:underline">Settings</Link>
            <Link href="/about" className="hover:underline">About</Link>
          </nav>

          {/* Mobile toggle */}
          <button
            className="md:hidden rounded-lg border px-3 py-2 text-sm"
            onClick={() => setOpen((v) => !v)}
          >
            Menu
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden grid gap-1 pb-3">
            <Link href="/" className="rounded-md px-3 py-2 hover:bg-gray-100">Dashboard</Link>
            <Link href="/uploads" className="rounded-md px-3 py-2 hover:bg-gray-100">Upload</Link>
            <Link href="/recordings" className="rounded-md px-3 py-2 hover:bg-gray-100">Recordings</Link>
            <Link href="/settings" className="rounded-md px-3 py-2 hover:bg-gray-100">Settings</Link>
            <Link href="/about" className="rounded-md px-3 py-2 hover:bg-gray-100">About</Link>
          </div>
        )}
      </div>
    </header>
  );
}
