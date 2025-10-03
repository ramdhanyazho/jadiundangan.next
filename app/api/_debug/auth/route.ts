import { getAdminClient } from '@/lib/supabaseAdmin';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const hasUrl = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL);
    const hasAnonNextPublic = Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
    const hasAnonFallback = Boolean(process.env.SUPABASE_ANON_KEY);

    const admin = getAdminClient();
    const { data: settings, error } = await admin.auth.admin.getAuthSettings();

    const emailProviderEnabled = !error && Boolean(settings?.email_password?.enabled);

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