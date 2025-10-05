'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

import { supabaseBrowser } from '@/lib/supabaseBrowser';

export default function LogoutButton() {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  const onClick = async () => {
    setLoading(true);
    await supabaseBrowser.auth.signOut();

    try {
      await fetch('/auth/callback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ event: 'SIGNED_OUT' }),
      });
    } catch (error) {
      console.error(error);
    }

    const target = pathname.startsWith('/admin') ? '/admin' : '/client/login';
    router.replace(target);
  };

  return (
    <button
      onClick={onClick}
      disabled={loading}
      className="rounded-md bg-slate-100 px-3 py-2 text-sm font-medium hover:bg-slate-200"
    >
      {loading ? 'Keluar…' : 'Logout'}
    </button>
  );
}
