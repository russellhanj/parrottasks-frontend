import { cn } from "@/lib/utils";

type Variant = "success" | "error";

export default function Alert({
  children,
  variant = "success",
  className,
}: {
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
}) {
  const base = "flex items-start gap-2.5 px-3.5 py-3 rounded-xl border text-sm";
  const variants: Record<Variant, string> = {
    success: "bg-green-50 border-green-300 text-green-800",
    error: "bg-red-50 border-red-300 text-red-700",
  };
  return <div className={cn(base, variants[variant], className)}>{children}</div>;
}
