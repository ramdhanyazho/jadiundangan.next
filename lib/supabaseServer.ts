import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import type { cookies } from 'next/headers';

import type { Database } from '@/types/db';

type CookieStore = ReturnType<typeof cookies>;

const getSupabaseEnv = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error(
      'Konfigurasi Supabase tidak lengkap. Pastikan NEXT_PUBLIC_SUPABASE_URL dan NEXT_PUBLIC_SUPABASE_ANON_KEY telah diatur.'
    );
  }

  return { supabaseUrl, supabaseKey };
};

export const getServerClient = (cookieStore: CookieStore) => {
  const { supabaseKey, supabaseUrl } = getSupabaseEnv();

  return createServerComponentClient<Database>(
    {
      cookies: () => cookieStore,
    },
    {
      supabaseUrl,
      supabaseKey,
    }
  );
};

export type { CookieStore };