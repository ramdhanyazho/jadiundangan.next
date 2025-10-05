'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { supabaseBrowser } from '@/lib/supabaseBrowser';

export default function AdminLoginPage() {
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get('email') || '');
    const password = String(fd.get('password') || '');

    const { data, error } = await supabaseBrowser.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) return setErr(error.message);

    try {
      await fetch('/auth/callback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ event: 'SIGNED_IN', session: data.session }),
      });
    } catch (callbackError) {
      console.error(callbackError);
    }

    const r = await fetch('/api/whoami', { cache: 'no-store' });
    const { profile } = await r.json();

    if (!profile?.is_admin) {
      setErr('Akun ini bukan admin.');
      return;
    }
    router.replace('/admin/dashboard');
  }

  return (
    <div className="min-h-screen grid place-items-center p-6">
      <form onSubmit={onSubmit} className="w-full max-w-md bg-white shadow rounded-xl p-6 space-y-4">
        <h1 className="text-xl font-semibold">Login Admin</h1>
        <input name="email" type="email" required placeholder="Email" className="w-full border rounded px-3 py-2" />
        <input name="password" type="password" required placeholder="Password" className="w-full border rounded px-3 py-2" />
        {err && <p className="text-sm text-rose-600">{err}</p>}
        <button disabled={loading} className="w-full py-2 rounded bg-blue-600 text-white">
          {loading ? 'Masuk…' : 'Masuk'}
        </button>
      </form>
    </div>
  );
}
