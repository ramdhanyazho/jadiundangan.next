/* eslint-disable */
import crypto from 'crypto';
import { getAdminClient } from '@/lib/supabaseAdmin';
export const dynamic = 'force-dynamic';

function safeEq(a?: string | null, b?: string | null) {
  const A = Buffer.from(a || '');
  const B = Buffer.from(b || '');
  if (A.length !== B.length) return false;
  return crypto.timingSafeEqual(A, B);
}

export async function POST(req: Request) {
  const provided = req.headers.get('x-bootstrap-token');
  const secret = process.env.BOOTSTRAP_TOKEN;
  if (!secret || !safeEq(provided, secret)) {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    const body = await req.json();
    const email = body?.email;
    const password = body?.password;
    const is_admin = !!body?.is_admin;

    if (!email || !password) {
      return new Response('Missing email or password', { status: 400 });
    }

    const admin = getAdminClient();
    const { data, error } = await admin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });
    if (error) return new Response(error.message, { status: 400 });

    const user = data.user!;
    // Upsert profile
    const { error: upErr } = await admin
      .from('profiles')
      .upsert(
        { user_id: user.id, email, is_admin, role: is_admin ? 'admin' : 'client' },
        { onConflict: 'user_id' }
      );
    if (upErr) return new Response(upErr.message, { status: 400 });

    return Response.json({ ok: true, user_id: user.id, email, is_admin }, { status: 201 });
  } catch (e: any) {
    return new Response(e?.message || 'Invalid payload', { status: 400 });
  }
}
