import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import type { cookies } from 'next/headers';

type CookieStore = ReturnType<typeof cookies>;

export const getServerClient = (cookieStore: CookieStore) => {
  return createServerComponentClient({
    cookies: () => cookieStore,
  });
};

export type { CookieStore };