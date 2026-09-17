import Link from "next/link";
import { Terminal, FileText, ChevronRight } from "lucide-react";
import ScrambleText from "@/components/ScrambleText";
import { getBlogPosts } from "@/lib/contentStore";

export default async function BlogList() {
  const posts = await getBlogPosts();

  return (
    <div className="py-12 space-y-12 w-full">
      {/* Header */}
      <div className="border-b border-neutral-800 pb-4 space-y-2">
        <div className="text-xs font-mono text-[var(--cyber-primary)] flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5" />
          <span>SYS://NEURAL_LOGS</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight font-mono">
          <ScrambleText text="SYSTEM_LOGS" />
        </h1>
        <p className="text-sm text-neutral-400 font-mono">
          Architectural breakdowns, developer notes, and neural transmissions.
        </p>
      </div>

      {/* Post List */}
      <div className="space-y-6">
        {posts.map((post) => (
          <Link href={`/blog/${post.slug}`} key={post.slug} className="block group">
            <div className="cyber-panel cyber-cut p-6 border border-neutral-800 group-hover:border-[var(--cyber-primary)] transition-all">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 text-xs font-mono text-neutral-500 gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-[var(--cyber-primary)] font-bold">{post.id}</span>
                  <span>//</span>
                  <span className="text-neutral-400">[{post.category}]</span>
                </div>
                <span className="text-neutral-600 font-mono">
                  TIMESTAMP: {post.date}
                </span>
              </div>

              <h2 className="text-lg sm:text-xl font-bold text-white group-hover:text-[var(--cyber-primary)] transition-colors mb-2 font-mono flex items-center gap-2">
                <FileText className="w-4 h-4 text-neutral-500 group-hover:text-[var(--cyber-primary)] transition-colors" />
                <ScrambleText text={post.title} />
              </h2>

              <p className="text-xs sm:text-sm text-neutral-400 font-mono leading-relaxed mb-4">
                &gt; {post.excerpt}
              </p>

              <div className="flex items-center gap-1 text-xs font-mono text-[var(--cyber-primary)] opacity-0 group-hover:opacity-100 transition-opacity">
                <span>READ TRANSMISSION</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
