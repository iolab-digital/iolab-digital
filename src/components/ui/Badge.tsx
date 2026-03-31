import { cn } from "@/lib/utils";

export function Badge({
  children,
  variant = "primary",
  className,
}: {
  children: React.ReactNode;
  variant?: "primary" | "accent" | "dark";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider",
        variant === "primary" && "bg-primary/10 text-primary",
        variant === "accent" && "bg-accent/10 text-accent",
        variant === "dark" && "bg-dark-700 text-gray-300",
        className
      )}
    >
      {children}
    </span>
  );
}
