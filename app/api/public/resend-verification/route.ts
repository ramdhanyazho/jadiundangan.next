import { NextResponse } from 'next/server';

import { supabaseAnon } from '@/lib/supabaseAnon';

export async function POST(req: Request) {
  const { email } = (await req.json().catch(() => ({}))) as { email?: string };
  if (!email) {
    return new NextResponse('email required', { status: 400 });
  }

  const { error } = await supabaseAnon.auth.resend({
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
