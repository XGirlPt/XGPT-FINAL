"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center justify-center w-10 h-10 rounded-full  hover:bg-gray-100 dark:hover:bg-gray-700 transition backdrop-blur-sm"
      // aria-label="Toggle Theme"
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5 text-yellow-500  " />
      ) : (
        <Moon className="h-5 w-5 text-gray-800 backdrop-blur-sm" />
      )}
    </button>
  );
}
