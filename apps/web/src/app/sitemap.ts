import type { MetadataRoute } from "next";

import { siteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl.href, priority: 1 },
    { url: new URL("/team", siteUrl).href, priority: 0.8 },
    { url: new URL("/mark", siteUrl).href, priority: 0.6 },
  ];
}
