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
    <div className="max-w-2xl">
      <Badge variant="brand">{eyebrow}</Badge>
      <h2 className="mt-3 type-headline text-balance">{title}</h2>
      {children ? <p className="mt-4 type-lead text-muted-foreground">{children}</p> : null}
    </div>
  );
}
