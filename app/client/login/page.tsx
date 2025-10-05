'use client';

import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { supabaseBrowser } from '@/lib/supabaseBrowser';

function ClientLoginContent() {
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const sp = useSearchParams();
  const nextUrl = sp.get('next') || '/client';

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

    router.replace(nextUrl);
  }

  return (
    <div className="min-h-screen grid place-items-center p-6">
      <form onSubmit={onSubmit} className="w-full max-w-md space-y-4 rounded-xl bg-white p-6 shadow">
        <h1 className="text-xl font-semibold">Login Akun</h1>
        <input name="email" type="email" required placeholder="Email" className="w-full rounded border px-3 py-2" />
        <input name="password" type="password" required placeholder="Password" className="w-full rounded border px-3 py-2" />
        {err && <p className="text-sm text-rose-600">{err}</p>}
        <button disabled={loading} className="w-full rounded bg-slate-900 py-2 text-white">
          {loading ? 'Masuk…' : 'Masuk'}
        </button>
      </form>
    </div>
  );
}

export default function ClientLogin() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen grid place-items-center p-6">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow">
            <p className="text-center text-sm text-slate-500">Memuat formulir…</p>
          </div>
        </div>
      }
    >
      <ClientLoginContent />
    </Suspense>
  );
}
