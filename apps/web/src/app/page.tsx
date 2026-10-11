import type { Metadata } from "next";

import { ProfileContent } from "@/features/profile/components/profile-content";
import { contactEmail } from "@/features/profile/components/site-header";
import { awards, members } from "@/features/profile/team";
import { siteDescription, siteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Halmahera",
    url: siteUrl.href,
    email: contactEmail,
    description: siteDescription,
    areaServed: "Indonesia",
    award: Object.values(awards).map(function toAwardName(award) {
      return `${award.place}, ${award.event}`;
    }),
    member: members.map(function toPerson(member) {
      return { "@type": "Person", name: member.name, jobTitle: member.title };
    }),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organization).replace(/</g, "\\u003c"),
        }}
      />
      <ProfileContent />
    </>
  );
}
