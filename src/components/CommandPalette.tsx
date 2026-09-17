"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Terminal,
  Search,
  Layers,
  Sparkles,
  ExternalLink,
  ChevronRight,
} from "lucide-react";
import { useCyberTheme, CyberThemeId } from "@/context/ThemeContext";
import { PROJECTS } from "@/data/projects";

interface CommandItem {
  id: string;
  category: "NAVIGATION" | "PROJECTS" | "THEMES" | "CONTROLS";
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  action: () => void;
}

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const { theme, setThemeId, availableThemes } = useCyberTheme();

  // Open / Close with keyboard (Cmd+K / Ctrl+K) or custom event
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    const handleCustomOpen = () => {
      setIsOpen(true);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("open-cyber-palette", handleCustomOpen);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("open-cyber-palette", handleCustomOpen);
    };
  }, [isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
      setQuery("");
    }
  }, [isOpen]);

  const closeAndExecute = (fn: () => void) => {
    setIsOpen(false);
    fn();
  };

  // Compile all actionable commands
  const commands: CommandItem[] = [
    // Navigation
    {
      id: "nav-home",
      category: "NAVIGATION",
      title: "GOTO // ROOT_PORTAL",
      subtitle: "Return to initial landing overview",
      icon: <Terminal className="w-4 h-4 text-[var(--cyber-primary)]" />,
      action: () => router.push("/"),
    },
    {
      id: "nav-projects",
      category: "NAVIGATION",
      title: "GOTO // PROJECTS_ARCHIVE",
      subtitle: "Explore all compiled systems and applications",
      icon: <Layers className="w-4 h-4 text-[var(--cyber-primary)]" />,
      action: () => router.push("/projects"),
    },
    {
      id: "nav-interests",
      category: "NAVIGATION",
      title: "GOTO // NEURAL_PREFERENCES",
      subtitle: "View technical interests and active gaming simulations",
      icon: <Sparkles className="w-4 h-4 text-[var(--cyber-primary)]" />,
      action: () => router.push("/interests"),
    },
    {
      id: "nav-blog",
      category: "NAVIGATION",
      title: "GOTO // SYSTEM_LOGS",
      subtitle: "Read architectural transmissions and notes",
      icon: <Terminal className="w-4 h-4 text-[var(--cyber-primary)]" />,
      action: () => router.push("/blog"),
    },

    // Individual Projects direct jump
    ...PROJECTS.map((proj) => ({
      id: `proj-${proj.slug}`,
      category: "PROJECTS" as const,
      title: `DOSSIER // ${proj.title.toUpperCase()}`,
      subtitle: proj.tagline,
      icon: <ChevronRight className="w-4 h-4 text-[var(--cyber-secondary)]" />,
      action: () => router.push(`/projects/${proj.slug}`),
    })),

    // Themes
    ...availableThemes.map((t) => ({
      id: `theme-${t.id}`,
      category: "THEMES" as const,
      title: `SET_THEME // ${t.name}`,
      subtitle: `Switch HUD palette to ${t.code}`,
      icon: (
        <span
          className="w-3 h-3 rounded-full border border-neutral-700"
          style={{ backgroundColor: t.primary }}
        />
      ),
      action: () => {
        setThemeId(t.id as CyberThemeId);
      },
    })),

    // Controls
    {
      id: "ctrl-admin",
      category: "CONTROLS",
      title: "ACCESS // ADMIN_CONSOLE",
      subtitle: "Open live content management & blog publisher",
      icon: <Terminal className="w-4 h-4 text-[var(--cyber-primary)]" />,
      action: () => router.push("/admin"),
    },
    {
      id: "ctrl-contact",
      category: "CONTROLS",
      title: "TRANSMIT // SEND_EMAIL",
      subtitle: "Open email dispatch to hello@example.com",
      icon: <ExternalLink className="w-4 h-4 text-neutral-400" />,
      action: () => {
        window.location.href = "mailto:hello@example.com";
      },
    },
  ];

  // Filter commands by query
  const filtered = commands.filter((cmd) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      cmd.title.toLowerCase().includes(q) ||
      cmd.category.toLowerCase().includes(q) ||
      (cmd.subtitle && cmd.subtitle.toLowerCase().includes(q))
    );
  });

  // Handle arrow navigation & selection
  const handleKeyNavigation = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filtered.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
    } else if (e.key === "Enter" && filtered[selectedIndex]) {
      e.preventDefault();
      closeAndExecute(filtered[selectedIndex].action);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/80 backdrop-blur-md transition-opacity"
      onClick={() => setIsOpen(false)}
    >
      <div
        className="w-full max-w-xl bg-neutral-950 border border-[var(--cyber-primary)] shadow-[0_0_30px_var(--cyber-glow-soft),0_10px_40px_rgba(0,0,0,0.9)] cyber-cut p-1 overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyNavigation}
      >
        {/* Top HUD Frame */}
        <div className="flex items-center justify-between px-3 py-1.5 border-b border-neutral-900 text-[10px] font-mono text-neutral-500 bg-neutral-900/40">
          <div className="flex items-center gap-2">
            <Terminal className="w-3 h-3 text-[var(--cyber-primary)]" />
            <span>COMMAND_MATRIX // v2.0</span>
          </div>
          <div className="flex items-center gap-2">
            <span>THEME: {theme.name}</span>
            <span>|</span>
            <span>ESC TO ABORT</span>
          </div>
        </div>

        {/* Input Bar */}
        <div className="relative flex items-center px-4 py-3 border-b border-neutral-900">
          <Search className="w-4 h-4 text-neutral-500 mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Type a command or query (e.g. 'theme', 'alpha', 'home')..."
            className="w-full bg-transparent text-sm font-mono text-white placeholder-neutral-600 focus:outline-none"
          />
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono text-neutral-400 bg-neutral-900 border border-neutral-800 rounded-none">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1 font-mono">
          {filtered.length === 0 ? (
            <div className="py-8 text-center text-xs text-neutral-600 font-mono">
              // NO RECOGNIZED INSTRUCTION FOR "{query}"
            </div>
          ) : (
            filtered.map((item, index) => {
              const isSelected = index === selectedIndex;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => closeAndExecute(item.action)}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`w-full flex items-center justify-between px-3 py-2 text-left text-xs transition-all cyber-cut-sm ${
                    isSelected
                      ? "bg-neutral-900 text-white border-l-2 border-[var(--cyber-primary)] shadow-[0_0_10px_var(--cyber-glow-soft)]"
                      : "text-neutral-400 hover:text-neutral-200"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="shrink-0">{item.icon}</div>
                    <div>
                      <div className="font-semibold">{item.title}</div>
                      {item.subtitle && (
                        <div className="text-[10px] text-neutral-500">
                          {item.subtitle}
                        </div>
                      )}
                    </div>
                  </div>
                  <span className="text-[9px] text-neutral-600 uppercase border border-neutral-800 px-1 py-0.5">
                    {item.category}
                  </span>
                </button>
              );
            })
          )}
        </div>

        {/* Bottom Key Guidance */}
        <div className="flex items-center justify-between px-3 py-1.5 border-t border-neutral-900 text-[10px] font-mono text-neutral-600 bg-neutral-900/30">
          <div className="flex gap-3">
            <span>↑↓ NAVIGATE</span>
            <span>↵ EXECUTE</span>
          </div>
          <span className="text-[var(--cyber-primary)]">SYS_READY</span>
        </div>
      </div>
    </div>
  );
}
