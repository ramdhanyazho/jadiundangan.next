import { createClient, type SupabaseClient } from '@supabase/supabase-js';

import type { Database } from '@/types/db';

let adminClient: SupabaseClient<Database> | null = null;

export function getAdminClient(): SupabaseClient<Database> {
  if (adminClient) {
    return adminClient;
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error('Supabase admin client tidak dapat dibuat tanpa konfigurasi lengkap.');
  }

  adminClient = createClient<Database>(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  return adminClient;
}