"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type CyberThemeId = "night-city" | "arasaka" | "netrunner" | "neo-tokyo";

export interface CyberTheme {
  id: CyberThemeId;
  name: string;
  code: string;
  primary: string; // Main neon accent
  secondary: string; // Complementary neon accent
  glow: string; // Glow rgba
  glowSoft: string;
  border: string;
  bgTint: string;
}

export const THEMES: Record<CyberThemeId, CyberTheme> = {
  "night-city": {
    id: "night-city",
    name: "NIGHT CITY",
    code: "CYAN // PINK",
    primary: "#00f0ff",
    secondary: "#ff003c",
    glow: "rgba(0, 240, 255, 0.4)",
    glowSoft: "rgba(0, 240, 255, 0.08)",
    border: "rgba(0, 240, 255, 0.3)",
    bgTint: "rgba(0, 240, 255, 0.02)",
  },
  "arasaka": {
    id: "arasaka",
    name: "ARASAKA",
    code: "AMBER // GOLD",
    primary: "#fcee0a",
    secondary: "#ff4400",
    glow: "rgba(252, 238, 10, 0.4)",
    glowSoft: "rgba(252, 238, 10, 0.08)",
    border: "rgba(252, 238, 10, 0.3)",
    bgTint: "rgba(252, 238, 10, 0.02)",
  },
  "netrunner": {
    id: "netrunner",
    name: "NETRUNNER",
    code: "ACID // EMERALD",
    primary: "#00ff66",
    secondary: "#00f0ff",
    glow: "rgba(0, 255, 102, 0.4)",
    glowSoft: "rgba(0, 255, 102, 0.08)",
    border: "rgba(0, 255, 102, 0.3)",
    bgTint: "rgba(0, 255, 102, 0.02)",
  },
  "neo-tokyo": {
    id: "neo-tokyo",
    name: "NEO TOKYO",
    code: "MAGENTA // CYAN",
    primary: "#e024c3",
    secondary: "#00f0ff",
    glow: "rgba(224, 36, 195, 0.4)",
    glowSoft: "rgba(224, 36, 195, 0.08)",
    border: "rgba(224, 36, 195, 0.3)",
    bgTint: "rgba(224, 36, 195, 0.02)",
  },
};

interface ThemeContextType {
  theme: CyberTheme;
  themeId: CyberThemeId;
  setThemeId: (id: CyberThemeId) => void;
  cycleTheme: () => void;
  availableThemes: CyberTheme[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeId, setThemeIdState] = useState<CyberThemeId>("night-city");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("cyber_theme") as CyberThemeId;
    if (saved && THEMES[saved]) {
      setThemeIdState(saved);
    }
  }, []);

  const currentTheme = THEMES[themeId] || THEMES["night-city"];

  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;
    root.style.setProperty("--cyber-primary", currentTheme.primary);
    root.style.setProperty("--cyber-secondary", currentTheme.secondary);
    root.style.setProperty("--cyber-glow", currentTheme.glow);
    root.style.setProperty("--cyber-glow-soft", currentTheme.glowSoft);
    root.style.setProperty("--cyber-border", currentTheme.border);
    root.style.setProperty("--cyber-bg-tint", currentTheme.bgTint);
    root.setAttribute("data-cyber-theme", currentTheme.id);
  }, [currentTheme, mounted]);

  const setThemeId = (id: CyberThemeId) => {
    if (THEMES[id]) {
      setThemeIdState(id);
      localStorage.setItem("cyber_theme", id);
    }
  };

  const cycleTheme = () => {
    const keys = Object.keys(THEMES) as CyberThemeId[];
    const nextIndex = (keys.indexOf(themeId) + 1) % keys.length;
    setThemeId(keys[nextIndex]);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme: currentTheme,
        themeId,
        setThemeId,
        cycleTheme,
        availableThemes: Object.values(THEMES),
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useCyberTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useCyberTheme must be used within a ThemeProvider");
  }
  return context;
}
