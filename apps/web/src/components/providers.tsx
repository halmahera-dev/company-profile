"use client";

import { Toaster } from "@halmahera/ui/components/sonner";
import { TooltipProvider } from "@halmahera/ui/components/tooltip";

import { ThemeProvider } from "./theme-provider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <TooltipProvider>{children}</TooltipProvider>
      <Toaster richColors />
    </ThemeProvider>
  );
}
