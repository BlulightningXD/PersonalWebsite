import Link from "next/link";
import { ArrowRight, Terminal, Cpu, Gamepad2, BookOpen } from "lucide-react";
import GlitchText from "@/components/GlitchText";
import ScrambleText from "@/components/ScrambleText";

export default function Home() {
  return (
    <div className="py-12 space-y-16 w-full">
      {/* HUD System Status Bar */}
      <div className="flex items-center justify-between border-b border-neutral-900 pb-3 text-[11px] font-mono text-neutral-500">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-neutral-400">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--cyber-primary)] animate-ping inline-block" />
            <span className="text-[var(--cyber-primary)] font-semibold">SYS.ONLINE</span>
          </span>
          <span className="text-neutral-700">|</span>
          <span>HOST: 127.0.0.1</span>
          <span className="text-neutral-700">|</span>
          <span className="hidden sm:inline">PING: 14ms</span>
        </div>
        <div className="text-[var(--cyber-primary)] opacity-70 tracking-widest">
          // CYBER.PORTAL_READY
        </div>
      </div>

      {/* Hero Section */}
      <section className="space-y-6">
        <div className="space-y-3">
          <div className="text-xs font-mono uppercase tracking-widest text-[var(--cyber-primary)] flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5" />
            <span>IDENTITY_CONFIRMED</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight">
            Hi, I am <br />
            <GlitchText text="Aditya." as="span" className="text-[var(--cyber-primary)]" />
          </h1>
        </div>

        <p className="text-base sm:text-lg text-neutral-400 max-w-xl leading-relaxed font-mono">
          Making the most random techs and Projects. Have interest in a lot of things but all of them lead to creation.
        </p>

        {/* Action Buttons with Cyberpunk Chamfered Cut */}
        <div className="flex flex-wrap gap-4 pt-2">
          <Link
            href="/projects"
            className="group relative inline-flex items-center gap-2 px-5 py-2.5 bg-neutral-900 hover:bg-[var(--cyber-primary)] border border-[var(--cyber-primary)] text-white hover:text-black font-mono text-xs uppercase tracking-widest transition-all cyber-cut-sm shadow-[0_0_12px_var(--cyber-glow-soft)]"
          >
            <span>Execute Projects</span>
            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-neutral-950 hover:bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-neutral-400 hover:text-white font-mono text-xs uppercase tracking-widest transition-all cyber-cut-sm"
          >
            <ScrambleText text="Access System Logs" />
          </Link>
        </div>
      </section>

      {/* Modular HUD Cards */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
          <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-neutral-400 flex items-center gap-2">
            <span>[#]</span>
            <ScrambleText text="CORE_SUBSYSTEMS" />
          </h2>
          <span className="text-[10px] font-mono text-neutral-600">SECTOR_03</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <Link href="/projects" className="group">
            <div className="cyber-panel cyber-cut p-5 border border-neutral-800 group-hover:border-[var(--cyber-primary)] transition-all h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-neutral-500 text-xs font-mono mb-3">
                  <Cpu className="w-4 h-4 text-[var(--cyber-primary)]" />
                  <span>MOD_01</span>
                </div>
                <h3 className="text-white font-semibold group-hover:text-[var(--cyber-primary)] transition-colors mb-2 font-mono flex items-center gap-1.5">
                  <span>//</span>
                  <ScrambleText text="Projects" />
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed font-mono">
                  Full-stack applications, developer utilities, and high-performance frontend interfaces.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-neutral-900 flex justify-between text-[11px] font-mono text-neutral-500 group-hover:text-neutral-300">
                <span>STATUS: COMPILED</span>
                <span>-&gt;</span>
              </div>
            </div>
          </Link>

          {/* Card 2 */}
          <Link href="/interests" className="group">
            <div className="cyber-panel cyber-cut p-5 border border-neutral-800 group-hover:border-[var(--cyber-primary)] transition-all h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-neutral-500 text-xs font-mono mb-3">
                  <Gamepad2 className="w-4 h-4 text-[var(--cyber-secondary)]" />
                  <span>MOD_02</span>
                </div>
                <h3 className="text-white font-semibold group-hover:text-[var(--cyber-primary)] transition-colors mb-2 font-mono flex items-center gap-1.5">
                  <span>//</span>
                  <ScrambleText text="Simulations" />
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed font-mono">
                  Neural interests and active game simulations: Night City, Soulsborne, and open worlds.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-neutral-900 flex justify-between text-[11px] font-mono text-neutral-500 group-hover:text-neutral-300">
                <span>STATUS: RUNNING</span>
                <span>-&gt;</span>
              </div>
            </div>
          </Link>

          {/* Card 3 */}
          <Link href="/blog" className="group">
            <div className="cyber-panel cyber-cut p-5 border border-neutral-800 group-hover:border-[var(--cyber-primary)] transition-all h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-neutral-500 text-xs font-mono mb-3">
                  <BookOpen className="w-4 h-4 text-[var(--cyber-primary)]" />
                  <span>MOD_03</span>
                </div>
                <h3 className="text-white font-semibold group-hover:text-[var(--cyber-primary)] transition-colors mb-2 font-mono flex items-center gap-1.5">
                  <span>//</span>
                  <ScrambleText text="System_Logs" />
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed font-mono">
                  Technical write-ups, architecture breakdowns, and personal logs saved to memory.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-neutral-900 flex justify-between text-[11px] font-mono text-neutral-500 group-hover:text-neutral-300">
                <span>STATUS: INDEXED</span>
                <span>-&gt;</span>
              </div>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}
