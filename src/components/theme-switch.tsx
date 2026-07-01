"use client";

import { useEffect, useState } from "react";

type ThemeChoice = "sand" | "night";

const THEME_KEY = "pp-theme";

function applyTheme(nextTheme: ThemeChoice) {
  document.documentElement.dataset.theme = nextTheme;
  window.localStorage.setItem(THEME_KEY, nextTheme);
}

export function ThemeSwitch() {
  const [theme, setTheme] = useState<ThemeChoice>("sand");

  useEffect(() => {
    const stored = window.localStorage.getItem(THEME_KEY);
    const system: ThemeChoice = window.matchMedia("(prefers-color-scheme: dark)").matches ? "night" : "sand";
    const resolved = stored === "night" || stored === "sand" ? stored : system;
    setTheme(resolved);
    document.documentElement.dataset.theme = resolved;
  }, []);

  function handleChange(nextTheme: ThemeChoice) {
    setTheme(nextTheme);
    applyTheme(nextTheme);
  }

  return (
    <div className="theme-switch" aria-label="Theme switch">
      <button
        type="button"
        className={`theme-option${theme === "sand" ? " is-active" : ""}`}
        onClick={() => handleChange("sand")}
        aria-pressed={theme === "sand"}
      >
        Sand
      </button>
      <button
        type="button"
        className={`theme-option${theme === "night" ? " is-active" : ""}`}
        onClick={() => handleChange("night")}
        aria-pressed={theme === "night"}
      >
        Night
      </button>
    </div>
  );
}
