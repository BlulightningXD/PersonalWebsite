"use client";

import React, { useState, useRef, useEffect } from "react";
import { useCyberTheme, CyberThemeId } from "@/context/ThemeContext";

export default function ThemeSwitcher() {
  const { theme, setThemeId, availableThemes } = useCyberTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center gap-2 px-2.5 py-1 text-xs font-mono tracking-wider border border-neutral-800 hover:border-[var(--cyber-primary)] bg-neutral-900/80 transition-all cursor-pointer cyber-cut-sm"
        title="Switch Cyberpunk Theme"
      >
        {/* Glow indicator dot */}
        <span
          className="w-2 h-2 rounded-full transition-all duration-300 shadow-[0_0_8px_var(--cyber-primary)]"
          style={{ backgroundColor: theme.primary }}
        />
        <span className="text-neutral-400 group-hover:text-white transition-colors">
          HEX://<span className="text-[var(--cyber-primary)] font-semibold">{theme.name}</span>
        </span>
      </button>

      {/* Cyber HUD Dropdown */}
      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-48 bg-neutral-950/95 border border-[var(--cyber-border)] p-2 shadow-[0_4px_24px_rgba(0,0,0,0.8),0_0_15px_var(--cyber-glow-soft)] z-50 backdrop-blur-md cyber-cut-corner"
        >
          <div className="text-[10px] font-mono text-neutral-500 uppercase px-2 py-1 tracking-widest border-b border-neutral-900 mb-1 flex justify-between">
            <span>SELECT HUD FREQ</span>
            <span>[4 CH]</span>
          </div>

          <div className="space-y-1">
            {availableThemes.map((item) => {
              const isSelected = item.id === theme.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setThemeId(item.id as CyberThemeId);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-2 py-1.5 text-xs font-mono text-left transition-all ${
                    isSelected
                      ? "bg-neutral-900 text-white font-bold border-l-2 border-[var(--cyber-primary)]"
                      : "text-neutral-400 hover:text-white hover:bg-neutral-900/50"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-sm"
                      style={{
                        backgroundColor: item.primary,
                        boxShadow: isSelected ? `0 0 8px ${item.primary}` : "none",
                      }}
                    />
                    <span>{item.name}</span>
                  </div>
                  {isSelected && (
                    <span className="text-[10px] text-[var(--cyber-primary)] font-mono">
                      ACTIVE
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
