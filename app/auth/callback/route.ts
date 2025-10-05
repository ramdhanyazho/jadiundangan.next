import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import type { Session } from '@supabase/supabase-js';

type AuthEvent = 'SIGNED_IN' | 'SIGNED_OUT' | 'TOKEN_REFRESHED';

function createRouteClient() {
  const cookieStore = cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (name: string) => cookieStore.get(name)?.value,
        set: (name: string, value: string, options: CookieOptions) => {
          cookieStore.set(name, value, options);
        },
        remove: (name: string, options: CookieOptions) => {
          cookieStore.set(name, '', { ...options, maxAge: 0 });
        },
      },
    }
  );
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');

  if (code) {
    const supabase = createRouteClient();
    await supabase.auth.exchangeCodeForSession(code);
  }

  const redirectTo = new URL('/client/login?verified=1', url.origin);
  return NextResponse.redirect(redirectTo);
}

type CallbackPayload = {
  event?: AuthEvent;
  session?: Session | null;
};

export async function POST(request: Request) {
  let payload: CallbackPayload;

  try {
    payload = await request.json();
  } catch (error) {
    return NextResponse.json({ error: 'Payload tidak valid.' }, { status: 400 });
  }

  const { event, session } = payload;
  const supabase = createRouteClient();

  if (event === 'SIGNED_OUT') {
    await supabase.auth.signOut();
    return NextResponse.json({ success: true });
  }

  if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
    if (!session) {
      return NextResponse.json({ error: 'Session tidak ditemukan.' }, { status: 400 });
    }

    await supabase.auth.setSession(session);
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ success: true });
}
