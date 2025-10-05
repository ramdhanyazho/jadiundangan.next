import { createClient } from '@supabase/supabase-js';

import type { Database } from '@/types/db';

const fallbackUrl = 'https://placeholder.supabase.co';
const fallbackAnonKey = 'public-anon-key';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || fallbackUrl;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || fallbackAnonKey;

export const sb = createClient<Database, 'public'>(supabaseUrl, supabaseAnonKey);

export const supabaseBrowser = sb;
