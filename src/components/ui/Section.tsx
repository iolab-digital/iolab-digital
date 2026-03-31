import { cn } from "@/lib/utils";
import { Container } from "./Container";

export function Section({
  children,
  className,
  dark,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={cn(
        "py-16 md:py-24",
        dark && "bg-dark text-white",
        className
      )}
    >
      <Container>{children}</Container>
    </section>
  );
}
