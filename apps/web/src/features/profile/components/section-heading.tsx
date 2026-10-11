import { Badge } from "@halmahera/ui/components/badge";

export function SectionHeading({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <div className="max-w-2xl reveal-on-scroll">
      <Badge variant="brand">{eyebrow}</Badge>
      <h2 className="mt-3 type-display text-balance">{title}</h2>
      {children ? (
        <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
          {children}
        </p>
      ) : null}
    </div>
  );
}
