import type { NextRequest } from 'next/server';
import type { SupabaseClient, User } from '@supabase/supabase-js';

import { getAdminClient } from '@/lib/supabaseAdmin';
import { upsertProfileWithRetry } from '@/lib/upsertProfileWithRetry';
import type { Database } from '@/types/db';

// Helper: cari userId dari email
async function findUserIdByEmail(email: string) {
  const admin: SupabaseClient<Database, 'public'> = getAdminClient();
  const { data, error } = await admin.auth.admin.listUsers({ page: 1, perPage: 1000 });
  if (error) throw error;
  const users = (data?.users ?? []) as User[];
  return (
    users.find(user => (user.email ?? '').toLowerCase() === email.toLowerCase())?.id ?? null
  );
}

export async function GET() {
  return Response.json({
    ok: true,
    hasBootstrapToken: Boolean(process.env.BOOTSTRAP_TOKEN),
    hasServiceRole: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY),
  });
}

export async function POST(req: NextRequest) {
  // Token guard
  const serverToken = process.env.BOOTSTRAP_TOKEN;
  if (!serverToken) return new Response('BOOTSTRAP_TOKEN not set', { status: 500 });
  const headerToken = req.headers.get('x-bootstrap-token');
  if (!headerToken || headerToken !== serverToken) {
    return new Response('Invalid or missing x-bootstrap-token', { status: 401 });
  }

  // Payload
  let body: any;
  try { body = await req.json(); } catch { return new Response('Invalid JSON body', { status: 400 }); }
  const email = String(body?.email || '').trim();
  const password = String(body?.password || '');
  const is_admin = Boolean(body?.is_admin);
  if (!email || !password) return new Response('Missing "email" or "password"', { status: 400 });

  const admin: SupabaseClient<Database, 'public'> = getAdminClient();

  // 1) Coba create user
  let userId: string | null = null;
  const created = await admin.auth.admin.createUser({ email, password, email_confirm: true });

  if (created.error) {
    const msg = created.error.message || '';
    const already = /already|registered/i.test(msg);
    if (!already) return new Response(`createUser error: ${msg}`, { status: 400 });

    // Sudah ada → cari id, lalu sinkron password (opsional)
    userId = await findUserIdByEmail(email);
    if (!userId) return new Response('User exists but not found via listUsers', { status: 500 });
    const upd = await admin.auth.admin.updateUserById(userId, { password });
    if (upd.error) return new Response(`updateUserById error: ${upd.error.message}`, { status: 400 });
  } else {
    userId = created.data.user?.id ?? null;
  }

  if (!userId) return new Response('No user id obtained', { status: 500 });

  // 2) Upsert profile (kunci perbaikan!)
  const profilePayload = {
    user_id: userId,
    email,
    is_admin,
  } satisfies Database['public']['Tables']['profiles']['Insert'];

  const { error: upErr } = await upsertProfileWithRetry(admin, profilePayload, { retries: 0 });

  if (upErr) {
    return new Response(`profiles upsert error: ${upErr.message}`, { status: 400 });
  }

  const { data: profile, error: profileErr } = await admin
    .from('profiles')
    .select('user_id, email, is_admin')
    .eq('user_id', userId)
    .maybeSingle();

  if (profileErr) {
    return new Response(`profiles fetch error: ${profileErr.message}`, { status: 400 });
  }

  return Response.json({ ok: true, user_id: userId, profile }, { status: 200 });
}
