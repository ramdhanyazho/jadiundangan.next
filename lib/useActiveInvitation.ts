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
      try {
        setLoading(true);
        const {
          data: { user },
        } = await sb.auth.getUser();
        if (!user) {
          if (alive) {
            setError('not-auth');
            setInv(null);
            setLoading(false);
          }
          return;
        }

        const { data, error } = await (sb
          .from('invitations') as any)
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(1)
          .maybeSingle();

        if (!alive) return;
        if (error) {
          setError(error.message);
          setInv(null);
        } else {
          setError(null);
          setInv((data as Invitation | null) ?? null);
        }
      } catch (e: any) {
        if (alive) {
          setError(e?.message || 'unknown');
          setInv(null);
        }
      } finally {
        if (alive) {
          setLoading(false);
        }
      }
    })();

    return () => {
      alive = false;
    };
  }, []);

  return { loading, inv, error, setInv } as const;
}
