// app/layout.tsx
import "./globals.css";
import Nav from "@/components/layout/Nav";
import { Toaster } from "sonner";

export const metadata = {
  title: "ParrotTasks",
  description: "Transcribe → Summarize → Extract tasks → Push to Wrike",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-dvh bg-brand-bg text-brand-text antialiased">
        <Nav />
        <main className="mx-auto max-w-6xl px-4 sm:px-6">{children}</main>
        <footer className="mx-auto max-w-6xl px-4 sm:px-6 mt-12 text-xs text-gray-500 pb-8">
          © {new Date().getFullYear()} ParrotTasks
        </footer>

        {/* Toasts */}
        <Toaster richColors position="bottom-right" />
      </body>
    </html>
  );
}
