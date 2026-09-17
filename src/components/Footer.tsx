"use client";

import Link from "next/link";
import ScrambleText from "@/components/ScrambleText";
import { useCyberTheme } from "@/context/ThemeContext";

export default function Footer() {
  const { theme } = useCyberTheme();

  return (
    <footer className="border-t border-neutral-900 py-8 mt-auto bg-neutral-950/80 backdrop-blur-sm">
      <div className="max-w-3xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono text-neutral-500">
        <div className="flex items-center gap-2">
          <span
            className="w-1.5 h-1.5 rounded-full inline-block animate-pulse"
            style={{ backgroundColor: theme.primary }}
          />
          <p>
            CYBER_NET // {new Date().getFullYear()} // ACTIVE_HUD:{" "}
            <span className="text-white font-semibold">{theme.name}</span>
          </p>
        </div>

        <div className="flex gap-6">
          <Link
            href="#"
            className="hover:text-[var(--cyber-primary)] transition-colors"
          >
            <ScrambleText text="[GITHUB]" />
          </Link>
          <Link
            href="#"
            className="hover:text-[var(--cyber-primary)] transition-colors"
          >
            <ScrambleText text="[LINKEDIN]" />
          </Link>
          <Link
            href="mailto:hello@example.com"
            className="hover:text-[var(--cyber-primary)] transition-colors"
          >
            <ScrambleText text="[TRANSMIT_MSG]" />
          </Link>
          <Link
            href="/admin"
            className="text-neutral-600 hover:text-[var(--cyber-primary)] transition-colors"
            title="Open Admin Portal"
          >
            [ADMIN]
          </Link>
        </div>
      </div>
    </footer>
  );
}
