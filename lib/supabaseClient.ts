import { createBrowserClient } from '@supabase/ssr';
import type { SupabaseClient } from '@supabase/supabase-js';

import type { Database } from '@/types/db';

const browserClientCache = new Map<string, SupabaseClient<Database>>();

export function getBrowserClient(url: string, anonKey: string): SupabaseClient<Database> {
  if (!url || !anonKey) {
    throw new Error('Supabase env not provided to browser client');
  }

  if (!browserClientCache.has(cacheKey)) {
    browserClientCache.set(cacheKey, createBrowserClient<Database>(url, anonKey));

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Konfigurasi Supabase tidak ditemukan di lingkungan browser.');
  }

  return browserClientCache.get(cacheKey)!;
}