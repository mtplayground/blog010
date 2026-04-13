export const SESSION_COOKIE_NAME = "admin_session";
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

function safeStringCompare(a: string, b: string): boolean {
  if (a.length !== b.length) {
    return false;
  }

  let mismatch = 0;
  for (let index = 0; index < a.length; index += 1) {
    mismatch |= a.charCodeAt(index) ^ b.charCodeAt(index);
  }

  return mismatch === 0;
}

function signSessionValue(expiresAt: string, sessionSecret: string): string {
  const input = `${expiresAt}.${sessionSecret}`;

  let hash1 = 0xdeadbeef;
  let hash2 = 0x41c6ce57;
  for (let index = 0; index < input.length; index += 1) {
    const code = input.charCodeAt(index);
    hash1 = Math.imul(hash1 ^ code, 2654435761);
    hash2 = Math.imul(hash2 ^ code, 1597334677);
  }

  hash1 = Math.imul(hash1 ^ (hash1 >>> 16), 2246822507) ^ Math.imul(hash2 ^ (hash2 >>> 13), 3266489909);
  hash2 = Math.imul(hash2 ^ (hash2 >>> 16), 2246822507) ^ Math.imul(hash1 ^ (hash1 >>> 13), 3266489909);

  const part1 = (hash1 >>> 0).toString(16).padStart(8, "0");
  const part2 = (hash2 >>> 0).toString(16).padStart(8, "0");
  return `${part1}${part2}`;
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
  const signature = signSessionValue(expiresAt, sessionSecret);

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

  const expectedSignature = signSessionValue(expiresAt, sessionSecret);

  return safeStringCompare(signature, expectedSignature);
}

export function hasValidAdminSession(cookieValue: string | undefined): boolean {
  return verifyAdminSessionValue(cookieValue);
}
