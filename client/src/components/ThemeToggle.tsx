import * as React from "react";
import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/components/ThemeProvider";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="relative h-9 w-9 rounded-full border-slate-200 dark:border-slate-800 bg-slate-100/80 dark:bg-slate-950/80 backdrop-blur-sm">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:rotate-90 dark:scale-0 text-slate-700" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-slate-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-lg">
        <DropdownMenuItem
          className={`${theme === 'light' ? 'bg-slate-100 dark:bg-slate-800/50' : ''} text-slate-700 dark:text-slate-200 cursor-pointer`}
          onClick={() => setTheme("light")}
        >
          <Sun className="mr-2 h-4 w-4" />
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className={`${theme === 'dark' ? 'bg-slate-100 dark:bg-slate-800/50' : ''} text-slate-700 dark:text-slate-200 cursor-pointer`}
          onClick={() => setTheme("dark")}
        >
          <Moon className="mr-2 h-4 w-4" />
          <span>Dark</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}