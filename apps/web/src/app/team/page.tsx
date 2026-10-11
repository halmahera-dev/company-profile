import type { Metadata } from "next";

import { TeamContent } from "@/features/profile/components/team-content";

export const metadata: Metadata = {
  title: "Team · Halmahera",
  description: "Meet the five award-winning builders behind Halmahera.",
};

export default function TeamPage() {
  return <TeamContent />;
}
