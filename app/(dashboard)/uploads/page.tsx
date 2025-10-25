"use client";

import * as React from "react";
import { api } from "@/lib/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type Item = {
  file: File;
  progress: number;
  status: "queued" | "uploading" | "processing" | "done" | "error";
  message?: string;
  id?: string;
};

const ACCEPTED_MIME = new Set([
  "video/mp4",
  "audio/mp4",   // <— key for macOS Voice Memos .m4a
  "audio/x-m4a",
  "audio/m4a",
  "audio/mpeg",  // mp3
  "audio/aac",
  "audio/x-aac",
  "audio/wav",
  "audio/x-wav",
]);
const ACCEPTED_EXT = new Set(["mp4", "m4a", "mp3", "wav"]);

function isAcceptedFile(f: File) {
  const ext = f.name.split(".").pop()?.toLowerCase() ?? "";
  // Some browsers set empty type or generic application/octet-stream.
  return ACCEPTED_MIME.has(f.type) || ACCEPTED_EXT.has(ext);
}

export default function Page() {
  const [items, setItems] = React.useState<Item[]>([]);
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const [dragOver, setDragOver] = React.useState(false);
  const router = useRouter();

  const onPickClick = () => inputRef.current?.click();

  const acceptFiles = (files: FileList | File[]) => {
    const arr = Array.from(files);
    const accepted = arr.filter((f) => isAcceptedFile(f));
    const rejected = arr.filter((f) => !isAcceptedFile(f));

    if (rejected.length) {
      const names = rejected.slice(0, 3).map(f => f.name).join(", ");
      toast.error(
        `Unsupported file type. Please upload mp4, m4a, mp3, or wav.${names ? " Rejected: " + names : ""}`
      );
    }
    if (!accepted.length) return;

    const next = accepted.map<Item>((file) => ({
      file,
      progress: 0,
      status: "queued",
    }));
    setItems((prev) => [...next, ...prev]);
    toast.success(`Added ${accepted.length} file${accepted.length > 1 ? "s" : ""} to the queue`);
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) acceptFiles(e.target.files);
    e.currentTarget.value = ""; // reset so re-select works
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files?.length) acceptFiles(e.dataTransfer.files);
  };

  async function startUpload(idx: number) {
    const file = items[idx].file;

    setItems((prev) =>
      prev.map((it, i) =>
        i === idx ? { ...it, status: "uploading", progress: 5 } : it
      )
    );

    const progressTimer = setInterval(() => {
      setItems((prev) =>
        prev.map((it, i) => {
          if (i !== idx || it.status !== "uploading") return it;
          const next = Math.min(95, it.progress + Math.random() * 5);
          return { ...it, progress: Math.floor(next) };
        })
      );
    }, 300);

    try {
      toast.info(`Uploading "${file.name}"...`);
      const res = await api.createRecording(file, 1);
      clearInterval(progressTimer);
      toast.success(`Uploaded "${file.name}" successfully`);

      setItems((prev) =>
        prev.map((it, i) =>
          i === idx
            ? { ...it, id: res.id, status: "done", progress: 100 }
            : it
        )
      );
    } catch (err: any) {
      clearInterval(progressTimer);
      const msg = String(err?.message || "Upload failed");
      toast.error(msg);
      setItems((prev) =>
        prev.map((it, i) =>
          i === idx ? { ...it, status: "error", message: msg } : it
        )
      );
    }
  }

  return (
    <section className="space-y-6">
      <header>
        <h2 className="text-xl font-semibold">Upload</h2>
        <p className="text-sm text-gray-600">
          Upload your Microsoft Teams recording to process.
        </p>
      </header>

      {/* Dropzone */}
      <div
        className={`rounded-xl border border-dashed bg-white p-12 text-center cursor-pointer transition ${
          dragOver ? "bg-gray-50 border-gray-800" : "hover:bg-gray-50"
        }`}
        onClick={onPickClick}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          accept=".mp4,.m4a,.mp3,.wav"
          className="hidden"
          onChange={onInputChange}
        />
        <p className="text-sm text-gray-600">
          Drag &amp; drop files here, or <span className="underline">click to select</span>
        </p>
        <p className="mt-1 text-xs text-gray-500">
          Accepted: .mp4, .m4a, .mp3, .wav
        </p>
      </div>

      {/* Upload list */}
      {items.length > 0 && (
        <div className="space-y-3">
          {items.map((it, idx) => (
            <div key={`${it.file.name}-${idx}`} className="rounded-lg border bg-white p-4">
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="truncate font-medium">{it.file.name}</div>
                  <div className="text-xs text-gray-500">
                    {(it.file.size / 1_000_000).toFixed(2)} MB · {it.file.type || "unknown"}
                  </div>
                </div>

                {it.status === "queued" && (
                  <button
                    className="rounded-md bg-gray-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-gray-800"
                    onClick={() => startUpload(idx)}
                  >
                    Start
                  </button>
                )}

                {it.status === "done" && (
                  <button
                    className="text-sm text-gray-600 underline"
                    onClick={() => router.push("/recordings")}
                  >
                    View in recordings →
                  </button>
                )}
              </div>

              <div className="mt-3 h-2 w-full rounded bg-gray-100">
                <div
                  className={`h-2 rounded transition-all ${
                    it.status === "error" ? "bg-red-500" : "bg-gray-900"
                  }`}
                  style={{ width: `${it.progress}%` }}
                />
              </div>

              <div className="mt-2 text-sm">
                {it.status === "queued" && "Queued"}
                {it.status === "uploading" && "Uploading…"}
                {it.status === "done" && "Done ✓"}
                {it.status === "error" && (
                  <span className="text-red-600">Error: {it.message}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
