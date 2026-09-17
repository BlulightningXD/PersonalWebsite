import { Cpu, Gamepad2, Radio, Terminal } from "lucide-react";
import ScrambleText from "@/components/ScrambleText";

export default function Interests() {
  const interests = [
    {
      code: "SPEC_01",
      name: "Web Architecture",
      detail: "React, Next.js, and high-frequency real-time web UI engineering.",
    },
    {
      code: "SPEC_02",
      name: "Neural Networks & AI",
      detail: "Large Language Models, cognitive agents, prompt matrixing, and tool interop.",
    },
    {
      code: "SPEC_03",
      name: "Open Source Commons",
      detail: "Contributing to decentralized libraries, reviewing pull requests, and public software tooling.",
    },
    {
      code: "SPEC_04",
      name: "Cybernetic UI/UX",
      detail: "High-contrast minimalist dark aesthetics, responsive HUDs, and friction-free micro-interactions.",
    },
  ];

  const currentlyPlaying = [
    { title: "Elden Ring", platform: "PC // STEAM", status: "NG+ RUN" },
    { title: "Valorant", platform: "RIOT NET", status: "COMPETITIVE" },
    { title: "Stardew Valley", platform: "CO-OP MATRIX", status: "CHILL MODE" },
  ];

  const allTimeFavorites = [
    { title: "The Witcher 3: Wild Hunt", year: "2015" },
    { title: "Cyberpunk 2077", year: "2020" },
    { title: "Minecraft", year: "2011" },
    { title: "Portal 2", year: "2011" },
  ];

  return (
    <div className="py-12 space-y-16 w-full">
      {/* Header */}
      <div className="border-b border-neutral-800 pb-4 space-y-2">
        <div className="text-xs font-mono text-[var(--cyber-primary)] flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5" />
          <span>SYS://NEURAL_PREFERENCES</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight font-mono">
          <ScrambleText text="FIELDS_OF_INTEREST" />
        </h1>
        <p className="text-sm text-neutral-400 font-mono">
          Technical specializations, research nodes, and recreation matrix.
        </p>
      </div>

      {/* Interests Section */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-400">
          <Cpu className="w-4 h-4 text-[var(--cyber-primary)]" />
          <span>PRIMARY_DIRECTIVES</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {interests.map((item) => (
            <div
              key={item.code}
              className="cyber-panel cyber-cut-sm p-5 border border-neutral-800 hover:border-[var(--cyber-primary)] transition-all"
            >
              <div className="text-[10px] font-mono text-[var(--cyber-primary)] mb-1">
                {item.code}
              </div>
              <h3 className="text-white font-bold font-mono text-base mb-1">
                {item.name}
              </h3>
              <p className="text-xs text-neutral-400 font-mono leading-relaxed">
                {item.detail}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Gaming Section */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-400">
          <Gamepad2 className="w-4 h-4 text-[var(--cyber-secondary)]" />
          <span>RECREATION_TELEMETRY // GAMING</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Active Sessions */}
          <div className="cyber-panel cyber-cut p-5 border border-neutral-800">
            <div className="flex items-center justify-between text-xs font-mono text-neutral-400 mb-4 border-b border-neutral-900 pb-2">
              <span className="flex items-center gap-1.5">
                <Radio className="w-3.5 h-3.5 text-[var(--cyber-primary)] animate-pulse" />
                ACTIVE_SESSIONS
              </span>
              <span className="text-[10px] text-neutral-600">[LIVE]</span>
            </div>

            <div className="space-y-3">
              {currentlyPlaying.map((game, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between text-xs font-mono p-2 bg-neutral-900/50 border border-neutral-900"
                >
                  <div>
                    <div className="text-white font-semibold">{game.title}</div>
                    <div className="text-[10px] text-neutral-500">{game.platform}</div>
                  </div>
                  <span className="text-[10px] text-[var(--cyber-primary)] border border-[var(--cyber-border)] px-1.5 py-0.5">
                    {game.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Hall of Fame */}
          <div className="cyber-panel cyber-cut p-5 border border-neutral-800">
            <div className="flex items-center justify-between text-xs font-mono text-neutral-400 mb-4 border-b border-neutral-900 pb-2">
              <span>HALL_OF_FAME // ARCHIVED</span>
              <span className="text-[10px] text-neutral-600">[CLASSICS]</span>
            </div>

            <div className="space-y-3">
              {allTimeFavorites.map((game, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between text-xs font-mono p-2 bg-neutral-900/50 border border-neutral-900"
                >
                  <span className="text-neutral-300 font-medium">{game.title}</span>
                  <span className="text-[10px] text-neutral-500 font-mono">
                    REL_{game.year}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
