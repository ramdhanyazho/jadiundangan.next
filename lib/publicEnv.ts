/**
 * Returns public Supabase URL and Anon Key for the BROWSER.
 * Falls back to SUPABASE_ANON_KEY if NEXT_PUBLIC_* is missing (common in Vercel auto-connect).
 * This file runs on the server (imported by a Server Component) and forwards only public values.
 */
export function getPublicSupabaseEnv() {
  const url =
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    process.env.SUPABASE_URL || // optional
    '';

  const anon =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.SUPABASE_ANON_KEY || // fallback from Vercel's auto-connect
    '';

  return {
    url,
    anon,
    hasUrl: Boolean(url),
    hasAnon: Boolean(anon),
  };
}
