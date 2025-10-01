import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';

import type { Database } from '@/types/db';

export const supabaseServer = () => {
  const cookieStore = cookies();
  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (name) => cookieStore.get(name)?.value,
        set: (name, value, options) =>
          cookieStore.set({ name, value, ...(options ?? {}) }),
        remove: (name, options) =>
          cookieStore.set({ name, value: '', ...(options ?? {}), maxAge: 0 }),
      },
    }
  );
};