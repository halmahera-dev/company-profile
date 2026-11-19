"use client";

import { TooltipProvider } from "@halmahera/ui/components/tooltip";

import { ThemeProvider } from "./theme-provider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <TooltipProvider>{children}</TooltipProvider>
    </ThemeProvider>
  );
}
