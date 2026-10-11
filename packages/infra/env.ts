import { createEnv } from "@t3-oss/env-core";
import { readFileSync } from "node:fs";
import { parseEnv } from "node:util";
import { z } from "zod";

// Alchemy runs this file under Bun or Node, and Bun has no process.loadEnvFile.
try {
  const parsed = parseEnv(readFileSync(`${import.meta.dirname}/.env`, "utf8"));
  for (const [key, value] of Object.entries(parsed)) process.env[key] ??= value;
} catch (error) {
  // CI provides these through the real environment instead of a .env file.
  if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
}

export const env = createEnv({
  server: {
    CLOUDFLARE_API_TOKEN: z.string().min(1),
    CLOUDFLARE_ACCOUNT_ID: z.string().min(1),
    ALCHEMY_PASSWORD: z.string().min(1).optional(),
  },
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
});
