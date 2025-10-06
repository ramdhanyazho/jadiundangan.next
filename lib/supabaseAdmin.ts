import { createClient } from '@supabase/supabase-js';

const fallbackUrl = 'https://placeholder.supabase.co';
const fallbackServiceRole = 'service-role-key';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || fallbackUrl;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || fallbackServiceRole;

export const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

export function getAdminClient() {
  return supabaseAdmin;
}
