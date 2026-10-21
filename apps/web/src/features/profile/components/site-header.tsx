import { Button } from "@halmahera/ui/components/button";
import Link from "next/link";

import { ModeToggle } from "@/components/mode-toggle";
import { Mark } from "@/features/mark/mark";

export const contactEmail = "support@halmahera.site";

export function SiteHeader() {
  return (
    <header className="fixed inset-x-4 top-3 z-30 mx-auto flex max-w-6xl items-center gap-1 rounded-full border glass py-1.5 pr-1.5 pl-4">
      <Link href="/" className="flex items-center gap-2 font-heading text-sm font-semibold">
        <Mark className="size-5" />
        Halmahera
      </Link>
      <nav aria-label="Site" className="ml-auto hidden sm:flex">
        <Button variant="ghost" size="sm" nativeButton={false} render={<Link href="/#work" />}>
          Work
        </Button>
        <Button variant="ghost" size="sm" nativeButton={false} render={<Link href="/#services" />}>
          Services
        </Button>
        <Button variant="ghost" size="sm" nativeButton={false} render={<Link href="/team" />}>
          Team
        </Button>
      </nav>
      <div className="mr-1 ml-auto shrink-0 sm:ml-0">
        <Button
          variant="outline"
          nativeButton={false}
          render={<a href={`mailto:${contactEmail}`} />}
        >
          Email us
        </Button>
      </div>
      <ModeToggle />
    </header>
  );
}
