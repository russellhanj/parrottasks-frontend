import PageHeader from "@/components/common/PageHeader";
import Button from "@/components/common/Button";
import Chip from "@/components/common/Chip";
import Alert from "@/components/common/Alert";
import Tabs from "@/components/common/Tabs";

export default function Page() {
  return (
    <section className="space-y-6">
      <header>
        <h2 className="text-xl font-semibold">Recordings</h2>
        <p className="text-sm text-gray-600">List of recordings with status.</p>
      </header>

      <div className="flex gap-2">
        <Chip variant="accent1">Queued</Chip>
        <Chip variant="accent2">Needs Review</Chip>
        <Chip variant="neutral">Transcribed</Chip>
      </div>
    </section>
  );
}
