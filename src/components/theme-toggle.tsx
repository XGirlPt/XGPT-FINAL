'use client';

import { Moon, Sun } from 'lucide-react';
import { Button } from './ui/button';
import { useTheme } from 'next-themes';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      className="relative h-9 w-16 rounded-full border bg-muted p-0.5"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    >
      <div
        className={`absolute inset-0.5 flex w-8 items-center justify-center rounded-full bg-white transition-all duration-300 dark:bg-zinc-950 ${
          theme === 'dark' ? 'translate-x-7' : 'translate-x-0'
        }`}
      >
        {theme === 'dark' ? (
          <Moon className="h-4 w-4 text-zinc-700 dark:text-zinc-200" />
        ) : (
          <Sun className="h-4 w-4 text-zinc-700" />
        )}
      </div>
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
