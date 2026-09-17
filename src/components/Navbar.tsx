"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Terminal } from "lucide-react";
import ScrambleText from "@/components/ScrambleText";
import ThemeSwitcher from "@/components/ThemeSwitcher";

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { name: "Home", href: "/" },
    { name: "Projects", href: "/projects" },
    { name: "Interests", href: "/interests" },
    { name: "Blog", href: "/blog" },
  ];

  const triggerCommandPalette = () => {
    window.dispatchEvent(new CustomEvent("open-cyber-palette"));
  };

  return (
    <nav className="border-b border-neutral-800/80 bg-neutral-950/60 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14">
        {/* Logo / Brand */}
        <Link
          href="/"
          className="flex items-center gap-2 group"
        >
          <span className="w-2 h-2 bg-[var(--cyber-primary)] shadow-[0_0_8px_var(--cyber-primary)] inline-block transition-all group-hover:scale-125" />
          <span className="text-sm font-mono font-bold tracking-widest text-white group-hover:text-[var(--cyber-primary)] transition-colors">
            NET://PORTFOLIO
          </span>
        </Link>

        {/* Links + Controls */}
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="flex items-center gap-3 sm:gap-5">
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-xs sm:text-sm font-mono uppercase tracking-wider transition-all relative py-1 ${
                    isActive
                      ? "text-[var(--cyber-primary)] font-bold"
                      : "text-neutral-400 hover:text-white"
                  }`}
                >
                  <ScrambleText text={link.name} />
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[var(--cyber-primary)] shadow-[0_0_6px_var(--cyber-primary)]" />
                  )}
                </Link>
              );
            })}
          </div>

          <div className="h-4 w-[1px] bg-neutral-800 hidden sm:block" />

          {/* Command Palette Trigger Button */}
          <button
            type="button"
            onClick={triggerCommandPalette}
            className="flex items-center gap-1.5 px-2 py-1 text-xs font-mono text-neutral-400 hover:text-white hover:border-[var(--cyber-primary)] border border-neutral-800 bg-neutral-900/60 transition-all cyber-cut-sm cursor-pointer"
            title="Open Command Palette (⌘K / Ctrl+K)"
          >
            <Terminal className="w-3 h-3 text-[var(--cyber-primary)]" />
            <span className="hidden sm:inline font-mono text-[10px]">CMD:</span>
            <kbd className="text-[10px] text-neutral-300 font-mono">⌘K</kbd>
          </button>

          {/* Theme switcher */}
          <ThemeSwitcher />
        </div>
      </div>
    </nav>
  );
}
