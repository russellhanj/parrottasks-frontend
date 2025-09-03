import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "destructive";

export default function Button({
  children,
  variant = "primary",
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  const base =
    "inline-flex items-center gap-2 rounded-xl px-3.5 py-2 font-semibold transition border active:translate-y-[1px]";
  const variants: Record<Variant, string> = {
    primary: "bg-brand-primary text-white border-transparent",
    secondary: "bg-brand-secondary text-white border-transparent",
    ghost: "bg-transparent text-brand-text border border-brand-border",
    destructive: "bg-brand-accent2 text-white border-transparent",
  };
  return (
    <button className={cn(base, variants[variant], className)} {...props}>
      {children}
    </button>
  );
}
