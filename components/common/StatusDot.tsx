export default function StatusDot({ color }: { color: string }) {
  return (
    <span
      className="inline-block h-2.5 w-2.5 rounded-full align-middle"
      style={{ backgroundColor: color }}
      aria-hidden="true"
    />
  );
}
