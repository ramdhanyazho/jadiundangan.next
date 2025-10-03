import crypto from 'crypto';

import { getAdminClient } from '@/lib/supabaseAdmin';

function safeEq(a?: string | null, b?: string | null) {
  const aBuffer = Buffer.from(a ?? '');
  const bBuffer = Buffer.from(b ?? '');

  if (aBuffer.length !== bBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(aBuffer, bBuffer);
}

export async function POST(req: Request) {
  const providedToken = req.headers.get('x-bootstrap-token');
  const secret = process.env.BOOTSTRAP_TOKEN;

  if (!secret || !safeEq(providedToken, secret)) {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    const body = await req.json();
    const email = typeof body?.email === 'string' ? body.email.trim() : '';
    const password = typeof body?.password === 'string' ? body.password : '';
    const isAdmin = body?.is_admin === true;

    if (!email || !password) {
      return new Response('Email dan password wajib diisi.', { status: 400 });
    }

    const admin = getAdminClient();

    const { data, error } = await admin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });

    if (error || !data?.user) {
      return new Response(error?.message || 'Gagal membuat pengguna.', {
        status: error?.status ?? 400,
      });
    }

    const user = data.user;

    const { error: upsertError } = await admin
      .from('profiles')
      .upsert(
        {
          user_id: user.id,
          email,
          is_admin: isAdmin,
          role: isAdmin ? 'admin' : 'client',
        },
        { onConflict: 'user_id' }
      );

    if (upsertError) {
      return new Response(upsertError.message, { status: 400 });
    }

    return Response.json(
      {
        ok: true,
        user_id: user.id,
        email,
        is_admin: isAdmin,
      },
      { status: 201 }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Invalid payload';
    return new Response(message, { status: 400 });
  }
}