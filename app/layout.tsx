import "./globals.css";

export const metadata = {
  title: "ParrotTasks",
  description: "Transcribe → Summarize → Extract tasks → Push to Wrike",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-dvh bg-gray-50 text-gray-900 antialiased">
        <div className="mx-auto max-w-6xl p-6">
          <header className="mb-8 flex items-center justify-between">
            <h1 className="text-2xl font-semibold">ParrotTasks</h1>
            <nav className="flex gap-4 text-sm">
              <a href="/" className="hover:underline">Dashboard</a>
              <a href="/uploads" className="hover:underline">Upload</a>
              <a href="/recordings" className="hover:underline">Recordings</a>
              <a href="/settings" className="hover:underline">Settings</a>
              <a href="/about" className="hover:underline">About</a>
            </nav>
          </header>
          <main>{children}</main>
          <footer className="mt-12 text-xs text-gray-500">© {new Date().getFullYear()} ParrotTasks</footer>
        </div>
      </body>
    </html>
  );
}
