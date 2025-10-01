import type { Session } from '@supabase/supabase-js';

import { supabaseServer } from '@/lib/supabase/client-server';
import type { Database, Profile } from '@/types/db';

interface SessionAndProfile {
  session: Session | null;
  profile: Profile | null;
}

export async function getSessionAndProfile(): Promise<SessionAndProfile> {
  const supabase = supabaseServer();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return { session: null, profile: null };
  }

  type UserId = Database['public']['Tables']['profiles']['Row']['user_id'];

  const userId = session.user?.id as UserId | undefined;

  if (!userId) {
    console.error('Session is missing user id');
    return { session, profile: null };
  }

  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    // Cast is required due to Supabase type inference limitations with the Session user id
    .eq('user_id', userId as any)
    .maybeSingle<Profile>();

  if (error && error.code !== 'PGRST116') {
    console.error('Failed to fetch profile for session user', error);
  }

  return { session, profile: profile ?? null };
}