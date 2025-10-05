'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';

const sb = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function AdminLoginPage() {
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (loading) return;
    setErr(null);
    setLoading(true);

    const fd = new FormData(e.currentTarget);
    const email = String(fd.get('email') || '');
    const password = String(fd.get('password') || '');

    const { error } = await sb.auth.signInWithPassword({ email, password });
    if (error) {
      setErr(error.message);
      setLoading(false);
      return;
    }

    await sb.auth.getSession();

    try {
      const r = await fetch('/api/whoami', { cache: 'no-store' });
      const { profile } = await r.json();
      if (!profile?.is_admin) {
        setErr('Akun ini bukan admin.');
        setLoading(false);
        return;
      }
    } catch (fetchError) {
      console.error(fetchError);
      setErr('Gagal memverifikasi akun admin.');
      setLoading(false);
      return;
    }

    router.refresh();
    window.location.assign('/admin/dashboard');
  }

  return (
    <div className="min-h-screen grid place-items-center p-6">
      <form onSubmit={onSubmit} className="w-full max-w-md bg-white shadow rounded-xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">Login Admin</h1>
          <Link href="/" className="text-sm text-slate-600 hover:underline">
            ← Kembali ke Beranda
          </Link>
        </div>

        <input name="email" type="email" required placeholder="Email" className="w-full border rounded px-3 py-2" />
        <input name="password" type="password" required placeholder="Password" className="w-full border rounded px-3 py-2" />
        {err && <p className="text-sm text-rose-600">{err}</p>}
        <button
          disabled={loading}
          className="w-full py-2 rounded bg-blue-600 text-white disabled:opacity-60"
          type="submit"
        >
          {loading ? 'Masuk…' : 'Masuk'}
        </button>
      </form>
    </div>
  );
}
