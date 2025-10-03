'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

import { getBrowserClient } from '@/lib/supabaseClient';

type LogoutButtonProps = {
  supabaseUrl: string;
  supabaseAnon: string;
  hasUrl: boolean;
  hasAnon: boolean;
};

export default function LogoutButton({ supabaseUrl, supabaseAnon, hasUrl, hasAnon }: LogoutButtonProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const supabase = useMemo(() => {
    if (!hasUrl || !hasAnon) {
      return null;
    }

    try {
      return getBrowserClient(supabaseUrl, supabaseAnon);
    } catch (error) {
      console.error('Failed to init Supabase client', error);
      return null;
    }
  }, [supabaseUrl, supabaseAnon, hasUrl, hasAnon]);

  const isDisabled = isLoading || !supabase;

  const handleLogout = async () => {
    if (isDisabled) return;

    setIsLoading(true);

    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error('Failed to sign out', error);
    } finally {
      router.replace('/login');
      router.refresh();
      setIsLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={isDisabled}
      className="rounded-xl border border-[#0E356B] px-4 py-2 text-sm font-semibold text-[#0E356B] transition hover:bg-[#0E356B] hover:text-white disabled:cursor-not-allowed disabled:opacity-70"
    >
      {isLoading ? 'Keluar...' : 'Logout'}
    </button>
  );
}