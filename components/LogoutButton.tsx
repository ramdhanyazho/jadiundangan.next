'use client';

import { useRouter } from 'next/navigation';
import { createBrowserClient } from '@supabase/ssr';
import { useState } from 'react';

export default function LogoutButton() {
  const r = useRouter();
  const [loading, setLoading] = useState(false);

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseAnon = (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY)!;

  const onClick = async () => {
    setLoading(true);
    const supabase = createBrowserClient(supabaseUrl, supabaseAnon);
    await supabase.auth.signOut();

    await fetch('/auth/callback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ event: 'SIGNED_OUT' }),
    });

    r.replace('/login');
  };

  return (
    <button
      onClick={onClick}
      disabled={loading}
      className="px-3 py-2 rounded-md text-sm font-medium bg-slate-100 hover:bg-slate-200"
    >
      {loading ? 'Keluar…' : 'Logout'}
    </button>
  );
}
