import fs from "fs";
import path from "path";
import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import { firestore } from "./firebase";
import { Project, PROJECTS as INITIAL_PROJECTS } from "@/data/projects";

export interface BlogPost {
  slug: string;
  id: string;
  title: string;
  date: string;
  category: string;
  author: string;
  excerpt: string;
  content: string;
}

export interface ContentDatabase {
  projects: Project[];
  posts: BlogPost[];
}

const INITIAL_POSTS: BlogPost[] = [
  {
    slug: "how-to-exit-vim",
    id: "LOG_0x01",
    title: "How to actually exit Vim",
    date: "2026.09.10",
    category: "TERMINAL_TIPS",
    author: "NETRUNNER_ROOT",
    excerpt: "A tactical guide to navigating the infinite editor loop without powering down your motherboard.",
    content: `[INIT_READOUT]
The easiest way is to restart your machine or cut main breaker power.

Alternatively, execute the following sequence:
1. Tap ESC repeatedly until neural link confirms normal mode.
2. Type :wq! followed by RETURN.
3. If terminal remains locked, run: kill -9 $(pgrep vim)

[END_OF_TRANSMISSION]`,
  },
  {
    slug: "matrix-effect-canvas",
    id: "LOG_0x02",
    title: "Building a Matrix digital rain effect",
    date: "2026.09.16",
    category: "CREATIVE_CODE",
    author: "NETRUNNER_ROOT",
    excerpt: "Constructing high-frame-rate falling glyph streams using HTML5 Canvas and mathematical random seed offsets.",
    content: `[INIT_READOUT]
HTML5 Canvas enables performant procedural graphics right in the DOM.

Key Implementation Principles:
- Use alpha fade (e.g. rgba(0,0,0,0.05)) on each animation tick instead of clearRect to produce the iconic optical trail effect.
- Maintain an array of Y-coordinates representing raindrops.
- Increment column index by font-size and reset drop to 0 randomly when it exceeds canvas height.

[END_OF_TRANSMISSION]`,
  },
];

const DB_PATH = path.join(process.cwd(), "src", "data", "db.json");

// Local fallback helper
function getLocalFallback(): ContentDatabase {
  try {
    if (fs.existsSync(DB_PATH)) {
      const data = fs.readFileSync(DB_PATH, "utf-8");
      return JSON.parse(data) as ContentDatabase;
    }
  } catch {
    // Ignore fallback read error
  }
  return {
    projects: INITIAL_PROJECTS,
    posts: INITIAL_POSTS,
  };
}

function writeLocalFallback(db: ContentDatabase) {
  try {
    const dir = path.dirname(DB_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), "utf-8");
  } catch {
    // Read-only filesystem on serverless, safe to ignore
  }
}

// ---------------- PROJECTS API ----------------

export async function getProjects(): Promise<Project[]> {
  try {
    const colRef = collection(firestore, "projects");
    const snapshot = await getDocs(colRef);

    if (snapshot.empty) {
      // Seed Firestore with initial projects on first run
      for (const proj of INITIAL_PROJECTS) {
        await setDoc(doc(firestore, "projects", proj.slug), proj);
      }
      return INITIAL_PROJECTS;
    }

    const projects: Project[] = [];
    snapshot.forEach((d) => projects.push(d.data() as Project));
    return projects;
  } catch (error) {
    console.warn("Firestore getProjects failed, using local fallback:", error);
    return getLocalFallback().projects;
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const docRef = doc(firestore, "projects", slug);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data() as Project;
    }
  } catch (error) {
    console.warn("Firestore getProjectBySlug failed, using local fallback:", error);
  }

  const projects = await getProjects();
  return projects.find((p) => p.slug === slug) || null;
}

export async function saveProject(project: Project): Promise<void> {
  // Save to Google Cloud Firestore
  try {
    const docRef = doc(firestore, "projects", project.slug);
    await setDoc(docRef, project, { merge: true });
  } catch (error) {
    console.error("Firestore saveProject error:", error);
  }

  // Backup to local db.json
  const fallback = getLocalFallback();
  const index = fallback.projects.findIndex((p) => p.slug === project.slug);
  if (index >= 0) {
    fallback.projects[index] = project;
  } else {
    fallback.projects.unshift(project);
  }
  writeLocalFallback(fallback);
}

export async function deleteProject(slug: string): Promise<void> {
  // Delete from Google Cloud Firestore
  try {
    const docRef = doc(firestore, "projects", slug);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Firestore deleteProject error:", error);
  }

  // Backup delete from local db.json
  const fallback = getLocalFallback();
  fallback.projects = fallback.projects.filter((p) => p.slug !== slug);
  writeLocalFallback(fallback);
}

// ---------------- BLOG POSTS API ----------------

export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const colRef = collection(firestore, "posts");
    const snapshot = await getDocs(colRef);

    if (snapshot.empty) {
      // Seed Firestore with initial posts on first run
      for (const post of INITIAL_POSTS) {
        await setDoc(doc(firestore, "posts", post.slug), post);
      }
      return INITIAL_POSTS;
    }

    const posts: BlogPost[] = [];
    snapshot.forEach((d) => posts.push(d.data() as BlogPost));
    return posts;
  } catch (error) {
    console.warn("Firestore getBlogPosts failed, using local fallback:", error);
    return getLocalFallback().posts;
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const docRef = doc(firestore, "posts", slug);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data() as BlogPost;
    }
  } catch (error) {
    console.warn("Firestore getBlogPostBySlug failed, using local fallback:", error);
  }

  const posts = await getBlogPosts();
  return posts.find((p) => p.slug === slug) || null;
}

export async function saveBlogPost(post: BlogPost): Promise<void> {
  // Save to Google Cloud Firestore
  try {
    const docRef = doc(firestore, "posts", post.slug);
    await setDoc(docRef, post, { merge: true });
  } catch (error) {
    console.error("Firestore saveBlogPost error:", error);
  }

  // Backup to local db.json
  const fallback = getLocalFallback();
  const index = fallback.posts.findIndex((p) => p.slug === post.slug);
  if (index >= 0) {
    fallback.posts[index] = post;
  } else {
    fallback.posts.unshift(post);
  }
  writeLocalFallback(fallback);
}

export async function deleteBlogPost(slug: string): Promise<void> {
  // Delete from Google Cloud Firestore
  try {
    const docRef = doc(firestore, "posts", slug);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Firestore deleteBlogPost error:", error);
  }

  // Backup delete from local db.json
  const fallback = getLocalFallback();
  fallback.posts = fallback.posts.filter((p) => p.slug !== slug);
  writeLocalFallback(fallback);
}
