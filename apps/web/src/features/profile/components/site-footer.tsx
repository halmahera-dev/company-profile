import Link from "next/link";

import { contactEmail } from "@/features/profile/components/site-header";

export function SiteFooter() {
  const links = [
    { href: "/#work", label: "Work" },
    { href: "/team", label: "Team" },
    { href: "/#contact", label: "Contact" },
    { href: "/mark", label: "Mark" },
    { href: "/design-system", label: "Design System" },
  ] as const;

  return (
    <footer className="bg-background text-foreground">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:grid-cols-3 sm:px-8">
        <div className="grid content-start gap-2">
          <p className="flex items-center gap-2 font-heading text-sm font-medium">
            <span aria-hidden className="size-2.5 rounded-full bg-brand" />
            Halmahera
          </p>
          <p className="text-sm text-muted-foreground">
            A small AI team from Indonesia. A clickable demo in 14 days.
          </p>
        </div>

        <nav aria-label="Footer" className="grid content-start gap-2">
          <p className="type-caption text-muted-foreground">Pages</p>
          {links.map(function renderLink(link) {
            return (
              <Link
                key={link.href}
                href={link.href}
                className="w-fit text-sm text-muted-foreground transition-colors duration-150 ease-out hover:text-foreground"
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="grid content-start gap-2">
          <p className="type-caption text-muted-foreground">Email</p>
          <a
            href={`mailto:${contactEmail}`}
            className="w-fit text-sm text-muted-foreground transition-colors duration-150 ease-out hover:text-foreground"
          >
            {contactEmail}
          </a>
          <p className="text-sm text-muted-foreground">Indonesia</p>
          <p className="mt-4 type-caption text-muted-foreground">Social</p>
          <a
            href="https://github.com/halmahera-dev"
            className="w-fit text-sm text-muted-foreground transition-colors duration-150 ease-out hover:text-foreground"
          >
            GitHub
          </a>
        </div>
      </div>
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-2 px-4 pb-8 sm:px-8">
        <p className="text-xs text-muted-foreground">© 2026 Halmahera</p>
        <span aria-hidden className="size-1.5 rounded-full bg-brand" />
        <p className="text-xs text-muted-foreground">Built in Indonesia</p>
      </div>
    </footer>
  );
}
