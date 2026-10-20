import "./src/env";
import type { NextConfig } from "next";

import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

const nextConfig: NextConfig = {
  typedRoutes: true,
  reactCompiler: true,
  images: {
    qualities: [75, 90],
  },
};

export default nextConfig;

initOpenNextCloudflareForDev();
