import crypto from "node:crypto";

export const SESSION_COOKIE_NAME = "admin_session";
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

function safeStringCompare(a: string, b: string): boolean {
  const aBuffer = Buffer.from(a);
  const bBuffer = Buffer.from(b);

  if (aBuffer.length !== bBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(aBuffer, bBuffer);
}

export function verifyAdminPassword(inputPassword: string): boolean {
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword || !inputPassword) {
    return false;
  }

  return safeStringCompare(inputPassword, adminPassword);
}

export function createAdminSessionValue(now = Date.now()): string | null {
  const sessionSecret = process.env.SESSION_SECRET;

  if (!sessionSecret) {
    return null;
  }

  const expiresAt = String(now + SESSION_MAX_AGE_SECONDS * 1000);
  const signature = crypto.createHmac("sha256", sessionSecret).update(expiresAt).digest("hex");

  return `${expiresAt}.${signature}`;
}

export function verifyAdminSessionValue(cookieValue: string | undefined, now = Date.now()): boolean {
  if (!cookieValue) {
    return false;
  }

  const [expiresAt, signature] = cookieValue.split(".");

  if (!expiresAt || !signature) {
    return false;
  }

  const expiresAtNumber = Number(expiresAt);
  if (!Number.isFinite(expiresAtNumber) || expiresAtNumber <= now) {
    return false;
  }

  const sessionSecret = process.env.SESSION_SECRET;
  if (!sessionSecret) {
    return false;
  }

  const expectedSignature = crypto.createHmac("sha256", sessionSecret).update(expiresAt).digest("hex");

  return safeStringCompare(signature, expectedSignature);
}
