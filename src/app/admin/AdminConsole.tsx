"use client";

import React, { useState } from "react";
import {
  Terminal,
  Plus,
  Edit2,
  Trash2,
  LogOut,
  Save,
  X,
  FileText,
  Layers,
  Sparkles,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Image as ImageIcon,
} from "lucide-react";
import {
  saveBlogPostAction,
  deleteBlogPostAction,
  saveProjectAction,
  deleteProjectAction,
  logoutAction,
} from "./actions";
import { BlogPost } from "@/lib/contentStore";
import { Project, ProjectImage } from "@/data/projects";

interface AdminConsoleProps {
  initialProjects: Project[];
  initialPosts: BlogPost[];
}

export default function AdminConsole({ initialProjects, initialPosts }: AdminConsoleProps) {
  const [activeTab, setActiveTab] = useState<"posts" | "projects">("posts");
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Editing state for Blog
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [isNewPost, setIsNewPost] = useState(false);

  // Editing state for Projects
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isNewProject, setIsNewProject] = useState(false);

  const showStatus = (type: "success" | "error", text: string) => {
    setStatusMsg({ type, text });
    setTimeout(() => setStatusMsg(null), 4000);
  };

  // ---------------- BLOG HANDLERS ----------------

  const handleStartNewPost = () => {
    const today = new Date().toISOString().slice(0, 10).replace(/-/g, ".");
    setEditingPost({
      slug: "",
      id: `LOG_0x0${posts.length + 1}`,
      title: "",
      date: today,
      category: "TECH_NOTES",
      author: "NETRUNNER_ROOT",
      excerpt: "",
      content: "",
    });
    setIsNewPost(true);
  };

  const handleSavePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPost || !editingPost.title || !editingPost.slug) {
      showStatus("error", "TITLE AND SLUG ARE REQUIRED.");
      return;
    }

    setIsSaving(true);
    try {
      await saveBlogPostAction(editingPost);
      setPosts((prev) => {
        const index = prev.findIndex((p) => p.slug === editingPost.slug);
        if (index >= 0) {
          const next = [...prev];
          next[index] = editingPost;
          return next;
        }
        return [editingPost, ...prev];
      });
      showStatus("success", `TRANSMISSION // [${editingPost.slug}] SAVED.`);
      setEditingPost(null);
      setIsNewPost(false);
    } catch {
      showStatus("error", "FAILED TO COMMIT BLOG TRANSMISSION.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeletePost = async (slug: string) => {
    if (!confirm(`CONFIRM PURGE: Delete log [${slug}] permanently?`)) return;
    try {
      await deleteBlogPostAction(slug);
      setPosts((prev) => prev.filter((p) => p.slug !== slug));
      showStatus("success", `LOG [${slug}] EXPUNGED.`);
      if (editingPost?.slug === slug) setEditingPost(null);
    } catch {
      showStatus("error", "FAILED TO EXPUNGE TRANSMISSION.");
    }
  };

  // ---------------- PROJECT HANDLERS ----------------

  const handleStartNewProject = () => {
    setEditingProject({
      slug: "",
      id: `0x0${projects.length + 1}`,
      title: "",
      tagline: "",
      status: "ONLINE",
      timeline: "Q4 2026",
      role: "Full-Stack Developer",
      description: "",
      fullDescription: "",
      architectureNotes: [],
      features: [],
      tags: ["NEXT.JS", "TYPESCRIPT"],
      githubUrl: "https://github.com",
      liveUrl: "https://example.com",
      images: [
        {
          url: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80",
          caption: "Primary System Telemetry",
          alt: "System screenshot",
        },
      ],
    });
    setIsNewProject(true);
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject || !editingProject.title || !editingProject.slug) {
      showStatus("error", "TITLE AND SLUG ARE REQUIRED.");
      return;
    }

    setIsSaving(true);
    try {
      await saveProjectAction(editingProject);
      setProjects((prev) => {
        const index = prev.findIndex((p) => p.slug === editingProject.slug);
        if (index >= 0) {
          const next = [...prev];
          next[index] = editingProject;
          return next;
        }
        return [editingProject, ...prev];
      });
      showStatus("success", `PROJECT DOSSIER // [${editingProject.slug}] SAVED.`);
      setEditingProject(null);
      setIsNewProject(false);
    } catch {
      showStatus("error", "FAILED TO COMMIT PROJECT DOSSIER.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteProject = async (slug: string) => {
    if (!confirm(`CONFIRM PURGE: Delete project dossier [${slug}] permanently?`)) return;
    try {
      await deleteProjectAction(slug);
      setProjects((prev) => prev.filter((p) => p.slug !== slug));
      showStatus("success", `PROJECT [${slug}] EXPUNGED.`);
      if (editingProject?.slug === slug) setEditingProject(null);
    } catch {
      showStatus("error", "FAILED TO EXPUNGE PROJECT.");
    }
  };

  return (
    <div className="py-10 space-y-8 w-full font-mono">
      {/* Top HUD Bar */}
      <div className="flex flex-wrap items-center justify-between border-b border-neutral-800 pb-4 gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs text-[var(--cyber-primary)]">
            <Terminal className="w-4 h-4" />
            <span>ROOT_SESSION // AUTHORIZED</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight uppercase">
            CYBER_CMS // CONTROL_MATRIX
          </h1>
        </div>

        {/* Status Toast Banner */}
        {statusMsg && (
          <div
            className={`px-3 py-1.5 text-xs flex items-center gap-2 cyber-cut-sm animate-in fade-in ${
              statusMsg.type === "success"
                ? "bg-green-950/80 border border-green-500 text-green-400"
                : "bg-red-950/80 border border-red-500 text-red-400"
            }`}
          >
            {statusMsg.type === "success" ? (
              <CheckCircle2 className="w-3.5 h-3.5" />
            ) : (
              <AlertCircle className="w-3.5 h-3.5" />
            )}
            <span>{statusMsg.text}</span>
          </div>
        )}

        {/* Session Logout Action */}
        <form action={async () => { await logoutAction(); }}>
          <button
            type="submit"
            className="flex items-center gap-2 px-3 py-1.5 bg-neutral-900 hover:bg-red-950 border border-neutral-800 hover:border-red-500 text-neutral-400 hover:text-red-400 text-xs uppercase tracking-wider cyber-cut-sm transition-all cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>TERMINATE_SESSION</span>
          </button>
        </form>
      </div>

      {/* Tabs */}
      <div className="flex gap-3 border-b border-neutral-800 pb-2">
        <button
          type="button"
          onClick={() => {
            setActiveTab("posts");
            setEditingPost(null);
          }}
          className={`px-4 py-2 text-xs uppercase tracking-wider transition-all cyber-cut-sm cursor-pointer flex items-center gap-2 ${
            activeTab === "posts"
              ? "bg-[var(--cyber-primary)] text-black font-bold shadow-[0_0_10px_var(--cyber-glow-soft)]"
              : "bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800"
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>TRANSMISSIONS // BLOG ({posts.length})</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setActiveTab("projects");
            setEditingProject(null);
          }}
          className={`px-4 py-2 text-xs uppercase tracking-wider transition-all cyber-cut-sm cursor-pointer flex items-center gap-2 ${
            activeTab === "projects"
              ? "bg-[var(--cyber-primary)] text-black font-bold shadow-[0_0_10px_var(--cyber-glow-soft)]"
              : "bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800"
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>DOSSIERS // PROJECTS ({projects.length})</span>
        </button>
      </div>

      {/* ========================================================= */}
      {/* -------------------- BLOG SECTION ---------------------- */}
      {/* ========================================================= */}
      {activeTab === "posts" && (
        <div className="space-y-6">
          {!editingPost ? (
            <>
              <div className="flex items-center justify-between">
                <p className="text-xs text-neutral-400">
                  Manage written entries, technical logs, and field notes. Updates appear on /blog in real time.
                </p>
                <button
                  type="button"
                  onClick={handleStartNewPost}
                  className="inline-flex items-center gap-2 px-3 py-2 bg-neutral-900 hover:bg-[var(--cyber-primary)] border border-[var(--cyber-primary)] text-white hover:text-black text-xs font-bold uppercase tracking-wider cyber-cut-sm transition-all shadow-[0_0_10px_var(--cyber-glow-soft)] cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>NEW_TRANSMISSION</span>
                </button>
              </div>

              {/* Post List */}
              <div className="space-y-3">
                {posts.map((post) => (
                  <div
                    key={post.slug}
                    className="cyber-panel cyber-cut p-4 border border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs">
                        <span className="text-[var(--cyber-primary)] font-bold">{post.id}</span>
                        <span className="text-neutral-600">//</span>
                        <span className="text-neutral-400">[{post.category}]</span>
                        <span className="text-neutral-600">//</span>
                        <span className="text-neutral-500">{post.date}</span>
                      </div>
                      <h3 className="text-sm sm:text-base font-bold text-white">{post.title}</h3>
                      <p className="text-xs text-neutral-400 line-clamp-1">{post.excerpt}</p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingPost(post);
                          setIsNewPost(false);
                        }}
                        className="p-1.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700 text-neutral-300 hover:text-white text-xs cyber-cut-sm transition-colors cursor-pointer"
                        title="Edit Transmission"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeletePost(post.slug)}
                        className="p-1.5 bg-neutral-900 hover:bg-red-950 border border-neutral-800 hover:border-red-500 text-neutral-500 hover:text-red-400 text-xs cyber-cut-sm transition-colors cursor-pointer"
                        title="Delete Transmission"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            /* Post Form */
            <form onSubmit={handleSavePost} className="cyber-panel cyber-cut p-6 border border-neutral-800 space-y-6">
              <div className="flex items-center justify-between border-b border-neutral-900 pb-3">
                <div className="flex items-center gap-2 text-xs text-[var(--cyber-primary)]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{isNewPost ? "CREATE_TRANSMISSION" : `EDITING // ${editingPost.slug}`}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setEditingPost(null)}
                  className="text-neutral-500 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1">
                  <label className="text-neutral-400">TITLE:</label>
                  <input
                    type="text"
                    required
                    value={editingPost.title}
                    onChange={(e) => {
                      const title = e.target.value;
                      setEditingPost((prev) =>
                        prev
                          ? {
                              ...prev,
                              title,
                              slug: isNewPost
                                ? title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
                                : prev.slug,
                            }
                          : null
                      );
                    }}
                    placeholder="E.g. Building Neural Interfaces"
                    className="w-full bg-neutral-900 border border-neutral-800 p-2 text-white focus:border-[var(--cyber-primary)] focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-neutral-400">SLUG (URL):</label>
                  <input
                    type="text"
                    required
                    value={editingPost.slug}
                    onChange={(e) => setEditingPost((prev) => (prev ? { ...prev, slug: e.target.value } : null))}
                    placeholder="building-neural-interfaces"
                    className="w-full bg-neutral-900 border border-neutral-800 p-2 text-white focus:border-[var(--cyber-primary)] focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-neutral-400">CATEGORY TAG:</label>
                  <input
                    type="text"
                    value={editingPost.category}
                    onChange={(e) => setEditingPost((prev) => (prev ? { ...prev, category: e.target.value } : null))}
                    placeholder="CREATIVE_CODE"
                    className="w-full bg-neutral-900 border border-neutral-800 p-2 text-white focus:border-[var(--cyber-primary)] focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-neutral-400">DATE STAMP:</label>
                  <input
                    type="text"
                    value={editingPost.date}
                    onChange={(e) => setEditingPost((prev) => (prev ? { ...prev, date: e.target.value } : null))}
                    placeholder="2026.09.18"
                    className="w-full bg-neutral-900 border border-neutral-800 p-2 text-white focus:border-[var(--cyber-primary)] focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1 text-xs">
                <label className="text-neutral-400">EXCERPT (SHORT SUMMARY):</label>
                <textarea
                  rows={2}
                  value={editingPost.excerpt}
                  onChange={(e) => setEditingPost((prev) => (prev ? { ...prev, excerpt: e.target.value } : null))}
                  placeholder="One or two sentences explaining the key takeaway..."
                  className="w-full bg-neutral-900 border border-neutral-800 p-2 text-white focus:border-[var(--cyber-primary)] focus:outline-none"
                />
              </div>

              <div className="space-y-1 text-xs">
                <label className="text-neutral-400">CONTENT (MARKDOWN / PLAIN TEXT):</label>
                <textarea
                  rows={10}
                  value={editingPost.content}
                  onChange={(e) => setEditingPost((prev) => (prev ? { ...prev, content: e.target.value } : null))}
                  placeholder="Write full article here..."
                  className="w-full bg-neutral-900 border border-neutral-800 p-3 text-white focus:border-[var(--cyber-primary)] focus:outline-none font-mono text-xs leading-relaxed"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-neutral-900">
                <button
                  type="button"
                  onClick={() => setEditingPost(null)}
                  className="px-4 py-2 bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800 text-xs cyber-cut-sm cursor-pointer"
                >
                  ABORT
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="inline-flex items-center gap-2 px-5 py-2 bg-[var(--cyber-primary)] text-black font-bold text-xs uppercase tracking-wider cyber-cut-sm cursor-pointer disabled:opacity-50"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{isSaving ? "TRANSMITTING..." : "PUBLISH_TRANSMISSION"}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      {/* ========================================================= */}
      {/* ------------------- PROJECTS SECTION -------------------- */}
      {/* ========================================================= */}
      {activeTab === "projects" && (
        <div className="space-y-6">
          {!editingProject ? (
            <>
              <div className="flex items-center justify-between">
                <p className="text-xs text-neutral-400">
                  Add or edit portfolio projects, imagery, telemetry specs, and live links.
                </p>
                <button
                  type="button"
                  onClick={handleStartNewProject}
                  className="inline-flex items-center gap-2 px-3 py-2 bg-neutral-900 hover:bg-[var(--cyber-primary)] border border-[var(--cyber-primary)] text-white hover:text-black text-xs font-bold uppercase tracking-wider cyber-cut-sm transition-all shadow-[0_0_10px_var(--cyber-glow-soft)] cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>NEW_DOSSIER</span>
                </button>
              </div>

              {/* Project Cards List */}
              <div className="space-y-3">
                {projects.map((proj) => (
                  <div
                    key={proj.slug}
                    className="cyber-panel cyber-cut p-4 border border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs">
                        <span className="text-[var(--cyber-primary)] font-bold">{proj.id}</span>
                        <span className="text-neutral-600">//</span>
                        <span className="border border-neutral-800 px-1.5 text-[10px] text-neutral-400">
                          {proj.status}
                        </span>
                        <span className="text-neutral-600">//</span>
                        <span className="text-neutral-500">{proj.timeline}</span>
                      </div>
                      <h3 className="text-sm sm:text-base font-bold text-white">{proj.title}</h3>
                      <p className="text-xs text-neutral-400 line-clamp-1">// {proj.tagline}</p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingProject(proj);
                          setIsNewProject(false);
                        }}
                        className="p-1.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700 text-neutral-300 hover:text-white text-xs cyber-cut-sm transition-colors cursor-pointer"
                        title="Edit Project"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteProject(proj.slug)}
                        className="p-1.5 bg-neutral-900 hover:bg-red-950 border border-neutral-800 hover:border-red-500 text-neutral-500 hover:text-red-400 text-xs cyber-cut-sm transition-colors cursor-pointer"
                        title="Delete Project"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            /* Project Form */
            <form onSubmit={handleSaveProject} className="cyber-panel cyber-cut p-6 border border-neutral-800 space-y-6">
              <div className="flex items-center justify-between border-b border-neutral-900 pb-3">
                <div className="flex items-center gap-2 text-xs text-[var(--cyber-primary)]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{isNewProject ? "INITIALIZE_PROJECT_DOSSIER" : `MODIFYING // ${editingProject.slug}`}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setEditingProject(null)}
                  className="text-neutral-500 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="space-y-1">
                  <label className="text-neutral-400">PROJECT TITLE:</label>
                  <input
                    type="text"
                    required
                    value={editingProject.title}
                    onChange={(e) => {
                      const title = e.target.value;
                      setEditingProject((prev) =>
                        prev
                          ? {
                              ...prev,
                              title,
                              slug: isNewProject
                                ? title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
                                : prev.slug,
                            }
                          : null
                      );
                    }}
                    placeholder="Project Alpha"
                    className="w-full bg-neutral-900 border border-neutral-800 p-2 text-white focus:border-[var(--cyber-primary)] focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-neutral-400">SLUG (URL):</label>
                  <input
                    type="text"
                    required
                    value={editingProject.slug}
                    onChange={(e) => setEditingProject((prev) => (prev ? { ...prev, slug: e.target.value } : null))}
                    placeholder="project-alpha"
                    className="w-full bg-neutral-900 border border-neutral-800 p-2 text-white focus:border-[var(--cyber-primary)] focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-neutral-400">STATUS:</label>
                  <select
                    value={editingProject.status}
                    onChange={(e) =>
                      setEditingProject((prev) =>
                        prev ? { ...prev, status: e.target.value as Project["status"] } : null
                      )
                    }
                    className="w-full bg-neutral-900 border border-neutral-800 p-2 text-white focus:border-[var(--cyber-primary)] focus:outline-none"
                  >
                    <option value="ONLINE">ONLINE</option>
                    <option value="DEPLOYED">DEPLOYED</option>
                    <option value="STANDBY">STANDBY</option>
                    <option value="ARCHIVED">ARCHIVED</option>
                  </select>
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="text-neutral-400">TAGLINE (ONE-LINER):</label>
                  <input
                    type="text"
                    value={editingProject.tagline}
                    onChange={(e) => setEditingProject((prev) => (prev ? { ...prev, tagline: e.target.value } : null))}
                    placeholder="High-Frequency Task Optimization Matrix"
                    className="w-full bg-neutral-900 border border-neutral-800 p-2 text-white focus:border-[var(--cyber-primary)] focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-neutral-400">TIMELINE:</label>
                  <input
                    type="text"
                    value={editingProject.timeline}
                    onChange={(e) => setEditingProject((prev) => (prev ? { ...prev, timeline: e.target.value } : null))}
                    placeholder="Q3 2026"
                    className="w-full bg-neutral-900 border border-neutral-800 p-2 text-white focus:border-[var(--cyber-primary)] focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1 text-xs">
                <label className="text-neutral-400">SHORT SUMMARY (FOR CARDS):</label>
                <textarea
                  rows={2}
                  value={editingProject.description}
                  onChange={(e) => setEditingProject((prev) => (prev ? { ...prev, description: e.target.value } : null))}
                  placeholder="Appears on /projects list..."
                  className="w-full bg-neutral-900 border border-neutral-800 p-2 text-white focus:border-[var(--cyber-primary)] focus:outline-none"
                />
              </div>

              <div className="space-y-1 text-xs">
                <label className="text-neutral-400">FULL SYSTEM OVERVIEW (PAGE BODY):</label>
                <textarea
                  rows={6}
                  value={editingProject.fullDescription}
                  onChange={(e) =>
                    setEditingProject((prev) => (prev ? { ...prev, fullDescription: e.target.value } : null))
                  }
                  placeholder="Detailed architecture description..."
                  className="w-full bg-neutral-900 border border-neutral-800 p-3 text-white focus:border-[var(--cyber-primary)] focus:outline-none font-mono text-xs leading-relaxed"
                />
              </div>

              {/* Tech Tags & URLs */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="space-y-1">
                  <label className="text-neutral-400">TECH TAGS (COMMA SEPARATED):</label>
                  <input
                    type="text"
                    value={editingProject.tags.join(", ")}
                    onChange={(e) =>
                      setEditingProject((prev) =>
                        prev
                          ? {
                              ...prev,
                              tags: e.target.value.split(",").map((s) => s.trim().toUpperCase()).filter(Boolean),
                            }
                          : null
                      )
                    }
                    placeholder="REACT, TYPESCRIPT, TAILWIND"
                    className="w-full bg-neutral-900 border border-neutral-800 p-2 text-white focus:border-[var(--cyber-primary)] focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-neutral-400">GITHUB URL:</label>
                  <input
                    type="text"
                    value={editingProject.githubUrl}
                    onChange={(e) => setEditingProject((prev) => (prev ? { ...prev, githubUrl: e.target.value } : null))}
                    placeholder="https://github.com/..."
                    className="w-full bg-neutral-900 border border-neutral-800 p-2 text-white focus:border-[var(--cyber-primary)] focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-neutral-400">LIVE DEMO URL:</label>
                  <input
                    type="text"
                    value={editingProject.liveUrl}
                    onChange={(e) => setEditingProject((prev) => (prev ? { ...prev, liveUrl: e.target.value } : null))}
                    placeholder="https://..."
                    className="w-full bg-neutral-900 border border-neutral-800 p-2 text-white focus:border-[var(--cyber-primary)] focus:outline-none"
                  />
                </div>
              </div>

              {/* Image Manager */}
              <div className="space-y-3 text-xs border-t border-neutral-900 pt-4">
                <div className="flex items-center justify-between">
                  <label className="text-neutral-300 font-bold flex items-center gap-1.5">
                    <ImageIcon className="w-3.5 h-3.5 text-[var(--cyber-primary)]" />
                    <span>SHOWCASE IMAGES ({editingProject.images?.length || 0})</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setEditingProject((prev) =>
                        prev
                          ? {
                              ...prev,
                              images: [
                                ...(prev.images || []),
                                {
                                  url: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80",
                                  caption: "System UI Preview",
                                  alt: "Screenshot",
                                },
                              ],
                            }
                          : null
                      );
                    }}
                    className="text-[10px] text-[var(--cyber-primary)] hover:underline"
                  >
                    + ADD IMAGE SLOT
                  </button>
                </div>

                {editingProject.images?.map((img, idx) => (
                  <div key={idx} className="p-3 bg-neutral-900/60 border border-neutral-800 flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                    <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 gap-2 w-full">
                      <input
                        type="text"
                        value={img.url}
                        onChange={(e) => {
                          const val = e.target.value;
                          setEditingProject((prev) => {
                            if (!prev) return null;
                            const newImgs = [...(prev.images || [])];
                            newImgs[idx].url = val;
                            return { ...prev, images: newImgs };
                          });
                        }}
                        placeholder="Image URL..."
                        className="bg-neutral-900 border border-neutral-800 p-1.5 text-white text-xs"
                      />
                      <input
                        type="text"
                        value={img.caption}
                        onChange={(e) => {
                          const val = e.target.value;
                          setEditingProject((prev) => {
                            if (!prev) return null;
                            const newImgs = [...(prev.images || [])];
                            newImgs[idx].caption = val;
                            return { ...prev, images: newImgs };
                          });
                        }}
                        placeholder="Caption..."
                        className="bg-neutral-900 border border-neutral-800 p-1.5 text-white text-xs"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setEditingProject((prev) => {
                          if (!prev) return null;
                          const newImgs = prev.images.filter((_, i) => i !== idx);
                          return { ...prev, images: newImgs };
                        });
                      }}
                      className="text-red-500 hover:text-red-400 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Form Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t border-neutral-900">
                <button
                  type="button"
                  onClick={() => setEditingProject(null)}
                  className="px-4 py-2 bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800 text-xs cyber-cut-sm cursor-pointer"
                >
                  ABORT
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="inline-flex items-center gap-2 px-5 py-2 bg-[var(--cyber-primary)] text-black font-bold text-xs uppercase tracking-wider cyber-cut-sm cursor-pointer disabled:opacity-50"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{isSaving ? "TRANSMITTING..." : "COMMIT_DOSSIER"}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  );
}
