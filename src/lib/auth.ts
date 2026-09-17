import crypto from "crypto";
import { cookies } from "next/headers";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "cyber2077";
const SESSION_SECRET = process.env.SESSION_SECRET || "fallback-cyber-secret-change-in-env-local";
const COOKIE_NAME = "cyber_admin_session";

// In-memory rate limiting map: identifier -> { count: number, lockedUntil: number }
interface RateLimitRecord {
  count: number;
  lockedUntil: number;
}
const rateLimits = new Map<string, RateLimitRecord>();

const MAX_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 15 * 60 * 1000; // 15 minutes

export function checkRateLimit(ip = "client"): { allowed: boolean; remaining: number; lockedUntil?: number } {
  const now = Date.now();
  const record = rateLimits.get(ip);

  if (!record) {
    return { allowed: true, remaining: MAX_ATTEMPTS };
  }

  if (record.lockedUntil > now) {
    return { allowed: false, remaining: 0, lockedUntil: record.lockedUntil };
  }

  // Lockout expired, reset
  if (record.lockedUntil > 0 && record.lockedUntil <= now) {
    rateLimits.delete(ip);
    return { allowed: true, remaining: MAX_ATTEMPTS };
  }

  return { allowed: record.count < MAX_ATTEMPTS, remaining: Math.max(0, MAX_ATTEMPTS - record.count) };
}

export function recordFailedAttempt(ip = "client"): { remaining: number; lockedUntil?: number } {
  const now = Date.now();
  const record = rateLimits.get(ip) || { count: 0, lockedUntil: 0 };
  record.count += 1;

  if (record.count >= MAX_ATTEMPTS) {
    record.lockedUntil = now + LOCKOUT_DURATION_MS;
    rateLimits.set(ip, record);
    return { remaining: 0, lockedUntil: record.lockedUntil };
  }

  rateLimits.set(ip, record);
  return { remaining: MAX_ATTEMPTS - record.count };
}

export function clearRateLimit(ip = "client") {
  rateLimits.delete(ip);
}

// Timing-safe constant-time string comparison
export function verifyAdminPasscode(input: string): boolean {
  if (!input || typeof input !== "string") return false;

  const expectedBuffer = Buffer.from(ADMIN_PASSWORD);
  const inputBuffer = Buffer.from(input);

  if (expectedBuffer.length !== inputBuffer.length) {
    // Constant time dummy comparison to mitigate timing attacks
    crypto.timingSafeEqual(expectedBuffer, expectedBuffer);
    return false;
  }

  return crypto.timingSafeEqual(expectedBuffer, inputBuffer);
}

// Generate signed HMAC token
export function createSessionToken(): string {
  const timestamp = Date.now().toString();
  const randomSalt = crypto.randomBytes(16).toString("hex");
  const payload = `${timestamp}.${randomSalt}`;
  const hmac = crypto.createHmac("sha256", SESSION_SECRET).update(payload).digest("hex");
  return `${payload}.${hmac}`;
}

// Verify HMAC session token
export function verifySessionToken(token: string): boolean {
  if (!token) return false;
  const parts = token.split(".");
  if (parts.length !== 3) return false;

  const [timestamp, randomSalt, receivedHmac] = parts;
  const payload = `${timestamp}.${randomSalt}`;
  const expectedHmac = crypto.createHmac("sha256", SESSION_SECRET).update(payload).digest("hex");

  const receivedBuffer = Buffer.from(receivedHmac);
  const expectedBuffer = Buffer.from(expectedHmac);

  if (receivedBuffer.length !== expectedBuffer.length) return false;
  if (!crypto.timingSafeEqual(receivedBuffer, expectedBuffer)) return false;

  // Session expiry: 7 days
  const sessionAgeMs = Date.now() - parseInt(timestamp, 10);
  const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;
  if (sessionAgeMs > SEVEN_DAYS_MS || sessionAgeMs < 0) return false;

  return true;
}

// Server-side check if current request has authenticated session
export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(COOKIE_NAME);
  if (!sessionCookie || !sessionCookie.value) return false;
  return verifySessionToken(sessionCookie.value);
}

// Helper to set admin session cookie
export async function setAdminSessionCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60, // 7 days
    path: "/",
  });
}

// Helper to clear admin session cookie
export async function clearAdminSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}
