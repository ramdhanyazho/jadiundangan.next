/* eslint-disable */
import { createClient } from '@supabase/supabase-js';
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email = body?.email || '';
    const password = body?.password || '';

    if (!email || !password) {
      return new Response('Missing email or password', { status: 400 });
    }

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

    if (!url || !anon) {
      return Response.json({ ok: false, error: 'Supabase env missing (URL or ANON KEY)' }, { status: 500 });
    }

    const supabase = createClient(url, anon, { auth: { autoRefreshToken: false, persistSession: false } });
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) return Response.json({ ok: false, error: error.message }, { status: 400 });
    return Response.json({ ok: true, user: { id: data.user.id, email: data.user.email } });
  } catch (e: any) {
    return new Response(e?.message || 'Invalid payload', { status: 400 });
  }
}
