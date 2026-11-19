"use client";

import { Button } from "@halmahera/ui/components/button";
import { MoonFastWindIcon, Sun03Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useTheme } from "next-themes";
import * as React from "react";

const themes = ["light", "dark", "system"] as const;

type ThemeChoice = (typeof themes)[number];

function nextTheme(current: string | undefined): ThemeChoice {
  const index = themes.indexOf((current as ThemeChoice) || "system");
  const from = index === -1 ? 0 : index;
  return themes[(from + 1) % themes.length];
}

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="outline"
      size="icon"
      type="button"
      onClick={function cycleTheme() {
        setTheme(nextTheme(theme));
      }}
    >
      <HugeiconsIcon
        icon={Sun03Icon}
        className="scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90"
      />
      <HugeiconsIcon
        icon={MoonFastWindIcon}
        className="absolute scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0"
      />
      <span className="sr-only">Cycle theme</span>
    </Button>
  );
}
