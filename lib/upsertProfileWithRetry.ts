import type { SupabaseClient } from '@supabase/supabase-js';

import type { Database } from '@/types/db';

const RETRYABLE_PG_ERROR_CODES = new Set(['23503']);

type ProfileInsert = Database['public']['Tables']['profiles']['Insert'];

/**
 * Attempts to upsert a profile row, retrying when the auth.users FK has not yet replicated.
 */
export async function upsertProfileWithRetry(
  client: SupabaseClient<Database, 'public'>,
  payload: ProfileInsert,
  {
    retries = 5,
    initialDelayMs = 200,
  }: { retries?: number; initialDelayMs?: number } = {}
) {
  let attempt = 0;
  let delay = initialDelayMs;
  let lastError: { message: string; code?: string } | null = null;

  while (attempt <= retries) {
    const profilesQuery = client.from('profiles') as any;
    const { error } = await profilesQuery.upsert(payload, { onConflict: 'user_id' });

    if (!error) {
      return { error: null } as const;
    }

    lastError = error;

    if (!error.code || !RETRYABLE_PG_ERROR_CODES.has(error.code)) {
      break;
    }

    attempt += 1;
    if (attempt > retries) {
      break;
    }

    await new Promise((resolve) => setTimeout(resolve, delay));
    delay *= 2;
  }

  return { error: lastError } as const;
}
