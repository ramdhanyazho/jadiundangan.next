import { cookies } from 'next/headers';
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import type { SupabaseClient } from '@supabase/supabase-js';

import type { Database } from '@/types/db';

export function getServerClient(): SupabaseClient<Database> {
  const cookieStore = cookies();
  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (name) => cookieStore.get(name)?.value,
        set: (_name, _value, _options: CookieOptions) => {
          // Supabase SSR client expects the function to exist, but middleware handles syncing cookies.
        },
        remove: (_name, _options: CookieOptions) => {
          // No-op: middleware is responsible for cookie mutations.
        },
      },
    }
  );
}
