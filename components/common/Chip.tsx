import { cn } from "@/lib/utils";

type Variant = "accent1" | "accent2" | "neutral" | "success" | "warning";

export default function Chip({
  children,
  variant = "neutral",
  className,
}: {
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
}) {
  const base = "inline-flex items-center gap-2 px-2.5 py-1.5 rounded-full font-semibold text-sm";
  const variants: Record<Variant, string> = {
    accent1: "bg-brand-accent1 text-brand-secondary",
    accent2: "bg-brand-accent2 text-white",
    neutral: "bg-gray-100 text-brand-text",
    success: "bg-green-100 text-green-800",
    warning: "bg-yellow-100 text-yellow-800",
  };
  return <span className={cn(base, variants[variant], className)}>{children}</span>;
}
