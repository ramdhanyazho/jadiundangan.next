import { cookies } from 'next/headers';
import type { Session } from '@supabase/supabase-js';

import { getServerClient } from '@/lib/supabaseServer';
import type { Profile } from '@/types/db';

interface SessionAndProfile {
  session: Session | null;
  profile: Profile | null;
}

export async function getSessionAndProfile(): Promise<SessionAndProfile> {
  const cookieStore = cookies();
  const supabase = getServerClient(cookieStore);

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return { session: null, profile: null };
  }

  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', session.user.id)
    .maybeSingle();

  if (error && error.code !== 'PGRST116') {
    console.error('Failed to fetch profile for session user', error);
  }

  return { session, profile: profile ?? null };
}