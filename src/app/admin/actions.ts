"use server";

import { revalidatePath } from "next/cache";
import {
  verifyAdminPasscode,
  checkRateLimit,
  recordFailedAttempt,
  clearRateLimit,
  createSessionToken,
  setAdminSessionCookie,
  clearAdminSessionCookie,
  isAuthenticated,
} from "@/lib/auth";
import {
  saveProject,
  deleteProject,
  saveBlogPost,
  deleteBlogPost,
  BlogPost,
} from "@/lib/contentStore";
import { Project } from "@/data/projects";

// Login Action with Rate Limiting & Cryptographic Verification
export async function loginAction(
  prevState: { success: boolean; error?: string; remaining?: number } | null,
  formData: FormData
) {
  const passcode = formData.get("passcode") as string;

  // Check rate limiting
  const rateStatus = checkRateLimit();
  if (!rateStatus.allowed) {
    const minutesLeft = Math.ceil(((rateStatus.lockedUntil || 0) - Date.now()) / (60 * 1000));
    return {
      success: false,
      error: `ACCESS_DENIED: TOO MANY FAILED ATTEMPTS. TERMINAL LOCKED FOR ${minutesLeft} MINUTE(S).`,
      remaining: 0,
    };
  }

  // Verify passcode
  const isValid = verifyAdminPasscode(passcode);
  if (!isValid) {
    const attempt = recordFailedAttempt();
    if (attempt.remaining === 0) {
      return {
        success: false,
        error: "ACCESS_DENIED: SECURITY PROTOCOL ACTIVATED. MAX ATTEMPTS EXCEEDED. LOCKOUT ENGAGED.",
        remaining: 0,
      };
    }
    return {
      success: false,
      error: `INVALID_PASSCODE. ${attempt.remaining} ATTEMPT(S) REMAINING BEFORE LOCKOUT.`,
      remaining: attempt.remaining,
    };
  }

  // Success
  clearRateLimit();
  const token = createSessionToken();
  await setAdminSessionCookie(token);

  revalidatePath("/admin");
  return { success: true };
}

// Logout Action
export async function logoutAction(): Promise<void> {
  await clearAdminSessionCookie();
  revalidatePath("/admin");
}

// Save Project Action (Protected)
export async function saveProjectAction(project: Project) {
  const authed = await isAuthenticated();
  if (!authed) {
    throw new Error("UNAUTHORIZED: Session expired or invalid.");
  }

  await saveProject(project);

  revalidatePath("/projects");
  revalidatePath(`/projects/${project.slug}`);
  revalidatePath("/");
  revalidatePath("/admin");

  return { success: true };
}

// Delete Project Action (Protected)
export async function deleteProjectAction(slug: string) {
  const authed = await isAuthenticated();
  if (!authed) {
    throw new Error("UNAUTHORIZED: Session expired or invalid.");
  }

  await deleteProject(slug);

  revalidatePath("/projects");
  revalidatePath("/");
  revalidatePath("/admin");

  return { success: true };
}

// Save Blog Post Action (Protected)
export async function saveBlogPostAction(post: BlogPost) {
  const authed = await isAuthenticated();
  if (!authed) {
    throw new Error("UNAUTHORIZED: Session expired or invalid.");
  }

  await saveBlogPost(post);

  revalidatePath("/blog");
  revalidatePath(`/blog/${post.slug}`);
  revalidatePath("/");
  revalidatePath("/admin");

  return { success: true };
}

// Delete Blog Post Action (Protected)
export async function deleteBlogPostAction(slug: string) {
  const authed = await isAuthenticated();
  if (!authed) {
    throw new Error("UNAUTHORIZED: Session expired or invalid.");
  }

  await deleteBlogPost(slug);

  revalidatePath("/blog");
  revalidatePath("/");
  revalidatePath("/admin");

  return { success: true };
}
