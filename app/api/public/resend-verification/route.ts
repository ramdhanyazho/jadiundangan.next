import { NextResponse } from 'next/server';

import { getSupabaseAnonClient } from '@/lib/supabaseAnon';

export async function POST(req: Request) {
  const { email } = (await req.json().catch(() => ({}))) as { email?: string };
  if (!email) {
    return new NextResponse('email required', { status: 400 });
  }

  let supabase;
  try {
    supabase = getSupabaseAnonClient();
  } catch (error) {
    console.error('[resend-verification] Supabase client missing', error);
    return new NextResponse('Supabase client not configured', { status: 500 });
  }

  const { error } = await supabase.auth.resend({
    email,
    type: 'signup',
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/auth/callback`,
    },
  });

  if (error) {
    return new NextResponse(error.message, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}
