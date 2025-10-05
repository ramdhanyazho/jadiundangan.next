import { createClient } from '@supabase/supabase-js';

import type { Database } from '@/types/db';

export const sb = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export const supabaseBrowser = sb;
