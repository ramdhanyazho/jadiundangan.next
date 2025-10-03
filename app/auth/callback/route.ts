import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';

function cookieAdapter() {
  const store = cookies();
  return {
    get(name: string) {
      return store.get(name)?.value;
    },
    set(name: string, value: string, options: any) {
      store.set(name, value, options);
    },
    remove(name: string, options: any) {
      store.set(name, '', { ...options, maxAge: 0 });
    },
  };
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const { event, session } = body ?? {};

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const anon =
    (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY)!;

  const supabase = createServerClient(url, anon, { cookies: cookieAdapter() });

  if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
    await supabase.auth.setSession(session);
  } else if (event === 'SIGNED_OUT') {
    await supabase.auth.signOut();
  }

  return new Response(null, { status: 200 });
}
