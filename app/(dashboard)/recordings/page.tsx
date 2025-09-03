import PageHeader from "@/components/common/PageHeader";
import Button from "@/components/common/Button";
import Chip from "@/components/common/Chip";
import Alert from "@/components/common/Alert";
import Tabs from "@/components/common/Tabs";

export default function Page() {
  return (
    <section className="space-y-6">
      <PageHeader
        title="Recordings"
        subtitle="List of recordings with status."
        action={<Button variant="primary">Upload</Button>}
      />

      <Tabs tabs={["Summary", "Transcript", "Tasks"]} />

      <div className="space-y-3">
        <Alert variant="success">Task push to Wrike succeeded</Alert>
        <Alert variant="error">Action extraction failed — retry</Alert>
      </div>

      <div className="flex gap-2">
        <Chip variant="accent1">Queued</Chip>
        <Chip variant="accent2">Needs Review</Chip>
        <Chip variant="neutral">Transcribed</Chip>
      </div>
    </section>
  );
}
