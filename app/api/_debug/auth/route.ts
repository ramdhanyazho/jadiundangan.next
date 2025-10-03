export const dynamic = 'force-dynamic';
export async function GET() {
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const anonNP = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const anonFallback = process.env.SUPABASE_ANON_KEY;
    const srv = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const hasUrl = Boolean(url);
    const hasAnonNEXT_PUBLIC = Boolean(anonNP);
    const hasAnonFallback = Boolean(anonFallback);
    const hasService = Boolean(srv);

    let emailProviderEnabled = null;
    let settingsSnippet = null;
    if (url && srv) {
      try {
        const res = await fetch(`${url}/auth/v1/settings`, {
          headers: { apikey: srv, Authorization: `Bearer ${srv}` },
          cache: 'no-store',
        });
        const json = await res.json();
        settingsSnippet = {
          email_password: json?.email_password ?? null,
          external: Object.keys(json?.external || {}),
        };
        emailProviderEnabled = Boolean(json?.email_password?.enabled);
      } catch (e) {
        settingsSnippet = { error: String(e) };
      }
    }

    return Response.json({
      hasUrl, hasAnonNEXT_PUBLIC, hasAnonFallback, hasService,
      emailProviderEnabled, settingsSnippet,
    });
  } catch (e) {
    return new Response('debug failed', { status: 500 });
  }
}
