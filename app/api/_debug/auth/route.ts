import { getAdminClient } from '@/lib/supabaseAdmin';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const hasUrl = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL);
    const hasAnonNextPublic = Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
    const hasAnonFallback = Boolean(process.env.SUPABASE_ANON_KEY);

    const admin = getAdminClient();
    // `getAuthSettings` exists in the GoTrue Admin API but is currently missing from the
    // TypeScript definition shipped with `@supabase/supabase-js`, so we narrow the shape
    // manually and fall back gracefully if the method is unavailable at runtime.
    const adminAuth = admin.auth.admin as {
      getAuthSettings?: () => Promise<{
        data: { email_password?: { enabled?: boolean | null } } | null;
        error: { message: string } | null;
      }>;
    };

    const settingsResponse = adminAuth.getAuthSettings
      ? await adminAuth.getAuthSettings()
      : { data: null, error: null };

    const emailProviderEnabled =
      !settingsResponse.error && Boolean(settingsResponse.data?.email_password?.enabled);

    return Response.json({
      hasUrl,
      hasAnonNEXT_PUBLIC: hasAnonNextPublic,
      hasAnonFallback,
      emailProviderEnabled,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'debug fail';
    return new Response(message, { status: 500 });
  }
}