import type { Metadata } from "next";

import { TeamContent } from "@/features/profile/components/team-content";

export const metadata: Metadata = {
  title: "Team",
  description:
    "Meet the five award-winning builders behind Halmahera: product, design, research, AI, and data.",
  alternates: { canonical: "/team" },
};

export default function TeamPage() {
  return <TeamContent />;
}
