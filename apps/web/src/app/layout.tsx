import type { Metadata } from "next";

import "../index.css";
import Providers from "@/components/providers";
import { siteDescription, siteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: siteUrl,
  applicationName: "Halmahera",
  title: {
    default: "Halmahera · AI prototypes in two weeks",
    template: "%s · Halmahera",
  },
  description: siteDescription,
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Halmahera",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
