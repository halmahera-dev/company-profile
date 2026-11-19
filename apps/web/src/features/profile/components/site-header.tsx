import { Button } from "@halmahera/ui/components/button";
import Link from "next/link";

import { ModeToggle } from "@/components/mode-toggle";
import { Mark } from "@/features/mark/mark";

export const contactEmail = "support@halmahera.site";

const navLinks = [
  { href: "/#work", label: "Work" },
  { href: "/team", label: "Team" },
  { href: "/#contact", label: "Contact" },
] as const;

export function SiteHeader() {
  return (
    <header className="fixed inset-x-4 top-3 z-30 mx-auto flex max-w-6xl items-center gap-1 rounded-full border glass py-1.5 pr-1.5 pl-4">
      <Link href="/" className="flex items-center gap-2 font-heading text-sm font-medium">
        <Mark className="size-5" />
        Halmahera
      </Link>
      <nav aria-label="Site" className="ml-auto hidden sm:flex">
        {navLinks.map(function renderLink(link) {
          return (
            <Button
              key={link.href}
              variant="ghost"
              size="sm"
              nativeButton={false}
              render={<Link href={link.href} />}
            >
              {link.label}
            </Button>
          );
        })}
      </nav>
      <div className="mr-1 ml-auto shrink-0 sm:ml-0">
        <Button nativeButton={false} render={<Link href="/#contact" />}>
          Book a call
        </Button>
      </div>
      <ModeToggle />
    </header>
  );
}
