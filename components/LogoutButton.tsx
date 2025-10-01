'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { supabaseBrowser } from '@/lib/supabase/client-browser';

export default function LogoutButton() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    if (isLoading) return;
    setIsLoading(true);

    const supabase = supabaseBrowser();
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
      disabled={isLoading}
      className="rounded-xl border border-[#0E356B] px-4 py-2 text-sm font-semibold text-[#0E356B] transition hover:bg-[#0E356B] hover:text-white disabled:cursor-not-allowed disabled:opacity-70"
    >
      {isLoading ? 'Keluar...' : 'Logout'}
    </button>
  );
}