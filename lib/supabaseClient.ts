'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

import type { Database } from '@/types/db';

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

export const getBrowserClient = () => {
  const { supabaseKey, supabaseUrl } = getSupabaseEnv();

  return createClientComponentClient<Database>({
    supabaseUrl,
    supabaseKey,
  });
};