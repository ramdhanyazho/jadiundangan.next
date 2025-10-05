'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { sb } from '@/lib/supabaseBrowser';

export default function ClientRegister() {
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    const full_name = String(fd.get('full_name') || '');
    const email = String(fd.get('email') || '');
    const password = String(fd.get('password') || '');
    const groom = String(fd.get('groom_name') || '');
    const bride = String(fd.get('bride_name') || '');

    const { error: e1 } = await sb.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: `${location.origin}/auth/callback` },
    });
    if (e1) {
      setLoading(false);
      return setErr(e1.message);
    }

    try {
      await fetch('/api/onboarding/create-invitation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ full_name, groom_name: groom, bride_name: bride }),
      });
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
    router.replace('/client/login');
  }

  return (
    <div className="min-h-screen grid place-items-center p-6">
      <form onSubmit={onSubmit} className="w-full max-w-lg space-y-4 rounded-xl bg-white p-6 shadow">
        <h1 className="text-xl font-semibold">Daftar Akun</h1>
        <input name="full_name" required placeholder="Nama Lengkap" className="w-full rounded border px-3 py-2" />
        <input name="email" type="email" required placeholder="Email" className="w-full rounded border px-3 py-2" />
        <input name="password" type="password" required placeholder="Password" className="w-full rounded border px-3 py-2" />
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <input name="groom_name" placeholder="Nama Mempelai Pria" className="rounded border px-3 py-2" />
          <input name="bride_name" placeholder="Nama Mempelai Wanita" className="rounded border px-3 py-2" />
        </div>
        {err && <p className="text-sm text-rose-600">{err}</p>}
        <button disabled={loading} className="w-full rounded bg-emerald-600 py-2 text-white">
          {loading ? 'Mendaftar…' : 'Buat Akun'}
        </button>
      </form>
    </div>
  );
}
