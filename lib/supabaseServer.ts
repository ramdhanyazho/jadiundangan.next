import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import type { cookies } from 'next/headers';

import type { Database } from '@/types/db';

type CookieStore = ReturnType<typeof cookies>;

export const getServerClient = (cookieStore: CookieStore) => {
 return createServerComponentClient<Database>({
    cookies: () => cookieStore,
  });
};

export type { CookieStore };