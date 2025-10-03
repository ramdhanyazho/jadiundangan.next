import { createBrowserClient } from '@supabase/ssr';
import type { SupabaseClient } from '@supabase/supabase-js';

import type { Database } from '@/types/db';

const browserClientCache = new Map<string, SupabaseClient<Database>>();

export function getBrowserClient(url?: string, anonKey?: string): SupabaseClient<Database> {
  const supabaseUrl = url || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey =
    anonKey || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Konfigurasi Supabase tidak ditemukan di lingkungan browser.');
  }

  const cacheKey = `${supabaseUrl}:${supabaseAnonKey}`;

  if (!browserClientCache.has(cacheKey)) {
    browserClientCache.set(cacheKey, createBrowserClient<Database>(supabaseUrl, supabaseAnonKey));
  }

  return browserClientCache.get(cacheKey)!;
}