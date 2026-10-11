import Link from "next/link";

import { contactEmail } from "@/features/profile/components/site-header";

export function SiteFooter() {
  const links = [
    { href: "/#work", label: "Work" },
    { href: "/#services", label: "Services" },
    { href: "/#sprint", label: "The sprint" },
    { href: "/team", label: "Team" },
  ] as const;

  return (
    <footer className="border-t">
      <div className="mx-auto grid max-w-5xl gap-10 px-4 py-12 sm:grid-cols-3 sm:px-6">
        <div className="grid content-start gap-2">
          <p className="flex items-center gap-2 font-heading text-sm font-bold">
            <span aria-hidden className="size-2.5 rounded-full bg-brand" />
            Halmahera
          </p>
          <p className="text-sm text-muted-foreground">
            Award-winning AI builders from Indonesia. Working prototypes in two weeks.
          </p>
        </div>

        <nav aria-label="Footer" className="grid content-start gap-2">
          <p className="text-xs font-semibold text-muted-foreground">EXPLORE</p>
          {links.map(function renderLink(link) {
            return (
              <Link
                key={link.href}
                href={link.href}
                className="w-fit text-sm transition-colors duration-150 ease-out hover:text-brand-text"
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="grid content-start gap-2">
          <p className="text-xs font-semibold text-muted-foreground">GET IN TOUCH</p>
          <a
            href={`mailto:${contactEmail}`}
            className="w-fit text-sm transition-colors duration-150 ease-out hover:text-brand-text"
          >
            {contactEmail}
          </a>
          <p className="text-sm text-muted-foreground">Indonesia</p>
        </div>
      </div>
      <div className="mx-auto max-w-5xl px-4 pb-8 sm:px-6">
        <p className="text-xs text-muted-foreground">© 2026 Halmahera. All rights reserved.</p>
      </div>
    </footer>
  );
}
