import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email = typeof body?.email === 'string' ? body.email : '';
    const password = typeof body?.password === 'string' ? body.password : '';

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

    if (!url || !anon) {
      return new Response('Supabase env belum lengkap.', { status: 500 });
    }

    const supabase = createClient(url, anon, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      return Response.json({ ok: false, error: error.message }, { status: 400 });
    }

    return Response.json({ ok: true, user: { id: data.user?.id, email: data.user?.email } });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'invalid payload';
    return new Response(message, { status: 400 });
  }
}