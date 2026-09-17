import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Terminal } from "lucide-react";
import ScrambleText from "@/components/ScrambleText";
import { getBlogPostBySlug, getBlogPosts } from "@/lib/contentStore";

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((p) => ({
    slug: p.slug,
  }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const post = await getBlogPostBySlug(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="py-12 space-y-8 w-full">
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-xs font-mono text-neutral-400 hover:text-[var(--cyber-primary)] transition-colors uppercase tracking-wider"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        <ScrambleText text="CD .. // RETURN_TO_LOGS" />
      </Link>

      <article className="cyber-panel cyber-cut p-6 sm:p-8 border border-neutral-800">
        {/* Terminal Header */}
        <div className="flex items-center justify-between border-b border-neutral-800 pb-3 mb-6 text-xs font-mono text-neutral-500">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-[var(--cyber-primary)]" />
            <span>DECRYPTED: {resolvedParams.slug}.md</span>
          </div>
          <span className="text-[var(--cyber-primary)]">{post.id}</span>
        </div>

        <header className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-mono mb-2">
            {post.title}
          </h1>
          <div className="flex items-center gap-3 text-xs font-mono text-neutral-500">
            <span>TIMESTAMP: {post.date}</span>
            <span>//</span>
            <span>AUTHOR: {post.author}</span>
            <span>//</span>
            <span className="text-[var(--cyber-primary)]">[{post.category}]</span>
          </div>
        </header>

        <div className="text-xs sm:text-sm font-mono text-neutral-300 leading-relaxed whitespace-pre-wrap bg-neutral-950/80 p-4 border border-neutral-900 border-l-2 border-l-[var(--cyber-primary)]">
          {post.content}
        </div>

        <div className="mt-8 pt-4 border-t border-neutral-900 flex justify-between text-[11px] font-mono text-neutral-600">
          <span>INTEGRITY_CHECK: 100% OK</span>
          <span>CHKSUM: 0x9AF8</span>
        </div>
      </article>
    </div>
  );
}
