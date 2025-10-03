import { NextResponse } from 'next/server';

import { getSupabaseAdminClient } from '@/lib/supabaseAdmin';
import type { Database } from '@/types/db';

interface BootstrapPayload {
  email?: string;
  password?: string;
  is_admin?: boolean;
}

export async function POST(request: Request) {
  const expectedToken = process.env.BOOTSTRAP_TOKEN;

  if (!expectedToken) {
    return NextResponse.json({ error: 'Bootstrap token belum dikonfigurasi.' }, { status: 500 });
  }

  const providedToken = request.headers.get('x-bootstrap-token');

  if (!providedToken || providedToken !== expectedToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let payload: BootstrapPayload;

  try {
    payload = (await request.json()) as BootstrapPayload;
  } catch (error) {
    return NextResponse.json({ error: 'Body JSON tidak valid.' }, { status: 400 });
  }

  const email = payload.email?.trim();
  const password = payload.password;
  const isAdmin = payload.is_admin === true;

  if (!email || !password) {
    return NextResponse.json({ error: 'Email dan password wajib diisi.' }, { status: 400 });
  }

  const supabase = getSupabaseAdminClient();

  const { data: createdUser, error: createError } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });

  if (createError || !createdUser?.user) {
    return NextResponse.json(
      { error: createError?.message ?? 'Gagal membuat pengguna.' },
      { status: createError?.status ?? 400 }
    );
  }

  const userId = createdUser.user.id;

  type ProfileInsert = Database['public']['Tables']['profiles']['Insert'] & { role?: string };
  const profilePayload: ProfileInsert = {
    user_id: userId,
    email,
    is_admin: isAdmin,
  };

  let includeRoleColumn = false;

  const { error: roleProbeError } = await supabase.from('profiles').select('role').limit(1);

  if (!roleProbeError || roleProbeError.code === 'PGRST116') {
    includeRoleColumn = true;
  } else if (roleProbeError.code !== '42703') {
    console.warn('Tidak dapat memeriksa kolom role pada tabel profiles:', roleProbeError.message);
  }

  if (includeRoleColumn) {
    profilePayload.role = 'admin';
  }

  const { error: profileError } = await supabase
    .from('profiles')
    .upsert(profilePayload, { onConflict: 'user_id' });

  if (profileError) {
    return NextResponse.json(
      { error: `Pengguna dibuat, namun gagal menyimpan profil: ${profileError.message}` },
      { status: 500 }
    );
  }

  return NextResponse.json(
    {
      user: {
        id: userId,
        email,
      },
      profile: {
        user_id: userId,
        email,
        is_admin: isAdmin,
        role: includeRoleColumn ? 'admin' : undefined,
      },
    },
    { status: 201 }
  );
}