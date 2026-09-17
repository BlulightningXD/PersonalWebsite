import { ExternalLink, Code, Terminal, ArrowRight } from "lucide-react";
import Link from "next/link";
import ScrambleText from "@/components/ScrambleText";
import { getProjects } from "@/lib/contentStore";

export default async function Projects() {
  const projects = await getProjects();

  return (
    <div className="py-12 space-y-12 w-full">
      {/* Header */}
      <div className="border-b border-neutral-800 pb-4 space-y-2">
        <div className="text-xs font-mono text-[var(--cyber-primary)] flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5" />
          <span>INDEX://PROJECT_REPOSITORY</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight font-mono">
          <ScrambleText text="DEPLOYED_PROJECTS" />
        </h1>
        <p className="text-sm text-neutral-400 font-mono">
          Interactive systems, neural tools, and compiled codebases. Select a dossier for full architecture details and imagery.
        </p>
      </div>

      {/* Projects List */}
      <div className="space-y-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="cyber-panel cyber-cut p-6 border border-neutral-800 hover:border-[var(--cyber-primary)] transition-all relative group"
          >
            {/* Top info line */}
            <div className="flex items-center justify-between text-xs font-mono text-neutral-500 mb-3">
              <span className="text-[var(--cyber-primary)] font-semibold">{project.id}</span>
              <div className="flex items-center gap-3">
                <span className="text-[11px] text-neutral-600 hidden sm:inline">
                  [{project.timeline}]
                </span>
                <span className="border border-neutral-800 px-2 py-0.5 text-[10px] text-neutral-400 group-hover:border-[var(--cyber-primary)] group-hover:text-[var(--cyber-primary)] transition-colors">
                  STATUS: {project.status}
                </span>
              </div>
            </div>

            {/* Title linking to dedicated detail page */}
            <Link href={`/projects/${project.slug}`} className="block group/link mb-2">
              <h3 className="text-xl font-bold text-white font-mono group-hover/link:text-[var(--cyber-primary)] transition-colors flex items-center gap-2">
                <ScrambleText text={project.title} />
                <ArrowRight className="w-4 h-4 opacity-0 group-hover/link:opacity-100 group-hover/link:translate-x-1 transition-all text-[var(--cyber-primary)]" />
              </h3>
            </Link>

            <p className="text-xs font-mono text-[var(--cyber-primary)] opacity-80 mb-3">
              // {project.tagline}
            </p>

            <p className="text-sm text-neutral-400 mb-5 leading-relaxed font-mono">
              {project.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.map((tag, tagIndex) => (
                <span
                  key={tagIndex}
                  className="text-[11px] font-mono text-neutral-400 bg-neutral-900 border border-neutral-800 px-2 py-0.5"
                >
                  [{tag}]
                </span>
              ))}
            </div>

            {/* Actions: Full Dossier + External links */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-neutral-900">
              <Link
                href={`/projects/${project.slug}`}
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-neutral-900 hover:bg-[var(--cyber-primary)] border border-[var(--cyber-primary)] text-white hover:text-black text-xs font-mono font-semibold tracking-wider cyber-cut-sm transition-all shadow-[0_0_8px_var(--cyber-glow-soft)]"
              >
                <span>OPEN_FULL_DOSSIER</span>
                <ArrowRight className="h-3 w-3" />
              </Link>

              <div className="flex gap-4">
                <Link
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-neutral-500 hover:text-white transition-colors"
                >
                  <Code className="h-3.5 w-3.5" />
                  <span>SOURCE</span>
                </Link>
                <Link
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-neutral-500 hover:text-white transition-colors"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  <span>DEMO</span>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
