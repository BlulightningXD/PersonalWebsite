import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Terminal,
  ExternalLink,
  Code,
  CheckCircle2,
  Calendar,
  UserCheck,
  Layers,
  Sparkles,
} from "lucide-react";
import ScrambleText from "@/components/ScrambleText";
import { getProjects, getProjectBySlug } from "@/lib/contentStore";

// Generate static params for existing project slugs
export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((p) => ({
    slug: p.slug,
  }));
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const project = await getProjectBySlug(resolvedParams.slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="py-12 space-y-12 w-full">
      {/* Back Navigation */}
      <Link
        href="/projects"
        className="inline-flex items-center gap-2 text-xs font-mono text-neutral-400 hover:text-[var(--cyber-primary)] transition-colors uppercase tracking-wider group"
      >
        <ArrowLeft className="h-3.5 w-3.5 group-hover:-translate-x-1 transition-transform" />
        <ScrambleText text="CD .. // RETURN_TO_PROJECTS" />
      </Link>

      {/* Main Project Dossier Container */}
      <article className="space-y-10">
        {/* Top Header Card */}
        <div className="cyber-panel cyber-cut p-6 sm:p-8 border border-neutral-800 relative">
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-neutral-500 mb-4 border-b border-neutral-900 pb-3">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-[var(--cyber-primary)]" />
              <span>DOSSIER://{project.id}</span>
              <span>//</span>
              <span className="text-[var(--cyber-primary)] font-bold">{project.status}</span>
            </div>
            <div className="flex items-center gap-4 text-neutral-400">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-neutral-500" />
                {project.timeline}
              </span>
              <span className="flex items-center gap-1.5 hidden sm:flex">
                <UserCheck className="w-3.5 h-3.5 text-neutral-500" />
                {project.role}
              </span>
            </div>
          </div>

          {/* Title & Tagline */}
          <div className="space-y-2 mb-6">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-mono">
              {project.title}
            </h1>
            <p className="text-sm sm:text-base font-mono text-[var(--cyber-primary)]">
              // {project.tagline}
            </p>
          </div>

          {/* Action Links */}
          <div className="flex flex-wrap gap-4 pt-4 border-t border-neutral-900">
            <Link
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-neutral-900 hover:bg-[var(--cyber-primary)] border border-[var(--cyber-primary)] text-white hover:text-black font-mono text-xs uppercase tracking-widest transition-all cyber-cut-sm shadow-[0_0_12px_var(--cyber-glow-soft)]"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>LAUNCH_LIVE_DEMO</span>
            </Link>

            <Link
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-neutral-950 hover:bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-neutral-300 hover:text-white font-mono text-xs uppercase tracking-widest transition-all cyber-cut-sm"
            >
              <Code className="w-3.5 h-3.5" />
              <span>INSPECT_SOURCE_CODE</span>
            </Link>
          </div>
        </div>

        {/* Image Showcase Gallery */}
        {project.images && project.images.length > 0 && (
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-400">
              <Sparkles className="w-4 h-4 text-[var(--cyber-primary)]" />
              <span>VISUAL_TELEMETRY // IMAGE_GALLERY ({project.images.length})</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.images.map((img, idx) => (
                <div
                  key={idx}
                  className="cyber-panel cyber-cut p-2 border border-neutral-800 hover:border-[var(--cyber-primary)] transition-all group overflow-hidden"
                >
                  <div className="relative aspect-video w-full overflow-hidden bg-neutral-900">
                    {/* Image with fallback styling */}
                    <img
                      src={img.url}
                      alt={img.alt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-85 group-hover:opacity-100"
                    />

                    {/* HUD watermark & Scanline overlay */}
                    <div className="absolute top-2 left-2 px-1.5 py-0.5 bg-black/80 border border-neutral-800 text-[9px] font-mono text-[var(--cyber-primary)]">
                      FIG_0{idx + 1} // CAM_FEED
                    </div>
                  </div>

                  <div className="p-3 text-[11px] font-mono text-neutral-400 border-t border-neutral-900 mt-2 flex items-center justify-between">
                    <span>{img.caption}</span>
                    <span className="text-neutral-600">[HD]</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* In-Depth Overview & Architecture */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <div className="cyber-panel cyber-cut p-6 border border-neutral-800 space-y-4">
              <h2 className="text-sm font-mono font-bold uppercase tracking-widest text-white flex items-center gap-2 border-b border-neutral-900 pb-2">
                <span>[//]</span>
                <span>SYSTEM_OVERVIEW</span>
              </h2>
              <div className="text-xs sm:text-sm font-mono text-neutral-300 leading-relaxed whitespace-pre-wrap">
                {project.fullDescription}
              </div>
            </div>

            {/* Architecture Notes if present */}
            {project.architectureNotes && (
              <div className="cyber-panel cyber-cut p-6 border border-neutral-800 space-y-4">
                <h2 className="text-sm font-mono font-bold uppercase tracking-widest text-white flex items-center gap-2 border-b border-neutral-900 pb-2">
                  <span>[#]</span>
                  <span>ENGINEERING_HIGHLIGHTS</span>
                </h2>
                <ul className="space-y-2.5 font-mono text-xs sm:text-sm text-neutral-400">
                  {project.architectureNotes.map((note, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[var(--cyber-primary)] mt-0.5">▶</span>
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Sidebar: Features & Tech Stack */}
          <div className="space-y-6">
            {/* Features */}
            <div className="cyber-panel cyber-cut p-5 border border-neutral-800 space-y-4">
              <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-white flex items-center gap-2 border-b border-neutral-900 pb-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[var(--cyber-primary)]" />
                <span>CAPABILITIES</span>
              </h3>
              <ul className="space-y-2 text-xs font-mono text-neutral-400">
                {project.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[var(--cyber-primary)]" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech Stack */}
            <div className="cyber-panel cyber-cut p-5 border border-neutral-800 space-y-4">
              <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-white flex items-center gap-2 border-b border-neutral-900 pb-2">
                <Layers className="w-3.5 h-3.5 text-[var(--cyber-secondary)]" />
                <span>TECH_STACK</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((t, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] font-mono text-neutral-300 bg-neutral-900 border border-neutral-800 px-2 py-0.5 hover:border-[var(--cyber-primary)] transition-colors"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      </article>
    </div>
  );
}
