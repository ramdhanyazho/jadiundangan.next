'use client';

import { useEffect, useState } from 'react';

import type { Database } from '@/types/db';

import { sb } from './supabaseBrowser';

type Invitation = Database['public']['Tables']['invitations']['Row'];

export function useActiveInvitation() {
  const [loading, setLoading] = useState(true);
  const [inv, setInv] = useState<Invitation | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      setLoading(true);
      const {
        data: { user },
      } = await sb.auth.getUser();
      if (!user) {
        if (!alive) return;
        setError('not-auth');
        setInv(null);
        setLoading(false);
        return;
      }

      const { data, error } = await sb
        .from('invitations')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (!alive) return;
      if (error) {
        setError(error.message);
      } else {
        setError(null);
      }
      setInv(data ?? null);
      setLoading(false);
    })();

    return () => {
      alive = false;
    };
  }, []);

  return { loading, inv, error, setInv } as const;
}
