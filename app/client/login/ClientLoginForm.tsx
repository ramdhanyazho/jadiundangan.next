'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';

const sb = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

export default function ClientLoginForm() {
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const sp = useSearchParams();
  const router = useRouter();
  const nextUrl = sp.get('next') || '/client';
  const verified = sp.get('verified') === '1';

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
    router.refresh();
    window.location.assign(nextUrl);
  }

  return (
    <div className="min-h-screen grid place-items-center p-6">
      <form onSubmit={onSubmit} className="w-full max-w-md bg-white shadow rounded-xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">Login Akun</h1>
          <Link href="/" className="text-sm text-slate-600 hover:underline">
            ← Kembali ke Beranda
          </Link>
        </div>

        <input name="email" type="email" required placeholder="Email" className="w-full border rounded px-3 py-2" />
        <input
          name="password"
          type="password"
          required
          placeholder="Password"
          className="w-full border rounded px-3 py-2"
        />

        {verified && <p className="text-sm text-emerald-600">Email berhasil dikonfirmasi. Silakan login.</p>}
        {err && <p className="text-sm text-rose-600">{err}</p>}

        <button
          disabled={loading}
          className="w-full py-2 rounded bg-slate-900 text-white disabled:opacity-60"
          type="submit"
        >
          {loading ? 'Masuk…' : 'Masuk'}
        </button>
      </form>
    </div>
  );
}
