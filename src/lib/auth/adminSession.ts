import crypto from 'crypto';

export const ADMIN_SESSION_COOKIE = 'ecreation_admin_token';

function getSigningSecret(): string {
  return (
    process.env.ADMIN_SESSION_SECRET ||
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    'ecreation-erp-default-signing-secret-2026'
  );
}

export function createAdminSessionToken(email: string, maxAgeSeconds = 86400 * 30): string {
  const exp = Math.floor(Date.now() / 1000) + maxAgeSeconds;
  const payload = Buffer.from(JSON.stringify({ email, exp })).toString('base64url');
  const sig = crypto
    .createHmac('sha256', getSigningSecret())
    .update(payload)
    .digest('base64url');
  return `${payload}.${sig}`;
}

export function verifyAdminSessionToken(token?: string | null): { valid: boolean; email?: string } {
  if (!token || !token.includes('.')) return { valid: false };
  try {
    const [payload, sig] = token.split('.');
    if (!payload || !sig) return { valid: false };

    const expectedSig = crypto
      .createHmac('sha256', getSigningSecret())
      .update(payload)
      .digest('base64url');

    const a = Buffer.from(sig);
    const b = Buffer.from(expectedSig);
    if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) {
      return { valid: false };
    }

    const decoded = JSON.parse(Buffer.from(payload, 'base64url').toString('utf-8')) as {
      email?: string;
      exp?: number;
    };
    if (!decoded.exp || decoded.exp < Math.floor(Date.now() / 1000)) {
      return { valid: false };
    }
    return { valid: true, email: decoded.email };
  } catch {
    return { valid: false };
  }
}
