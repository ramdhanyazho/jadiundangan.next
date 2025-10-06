import { createClient, type SupabaseClient } from '@supabase/supabase-js';

import type { Database } from '@/types/db';

const fallbackUrl = 'https://placeholder.supabase.co';
const fallbackServiceRole = 'service-role-key';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || fallbackUrl;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || fallbackServiceRole;

export const supabaseAdmin: SupabaseClient<Database, 'public'> = createClient<Database, 'public'>(
  supabaseUrl,
  serviceRoleKey,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

export function getAdminClient(): SupabaseClient<Database, 'public'> {
  return supabaseAdmin;
}
