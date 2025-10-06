'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import type { Session } from '@supabase/supabase-js';

import { sb } from '@/lib/supabaseBrowser';

export default function ClientLoginForm() {
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [resendMessage, setResendMessage] = useState<string | null>(null);
  const [resendStatus, setResendStatus] = useState<'success' | 'error' | null>(null);
  const [resending, setResending] = useState(false);
  const sp = useSearchParams();
  const router = useRouter();
  const nextUrl = sp.get('next') || '/client';
  const verified = sp.get('verified') === '1';

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (loading) return;
    setErr(null);
    setResendMessage(null);
    setLoading(true);

    const { data, error } = await sb.auth.signInWithPassword({ email, password });
    if (error || !data.session) {
      setErr(error?.message ?? 'Gagal masuk.');
      setLoading(false);
      return;
    }

    const session: Session = data.session;

    const callbackResponse = await fetch('/auth/callback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ event: 'SIGNED_IN', session }),
    });

    if (!callbackResponse.ok) {
      setErr('Gagal menyinkronkan sesi login.');
      setLoading(false);
      return;
    }

    router.refresh();
    window.location.assign(nextUrl);
  }

  async function handleResend() {
    if (resending) return;
    if (!email) {
      setResendStatus('error');
      setResendMessage('Masukkan email terlebih dahulu.');
      return;
    }

    setResending(true);
    setResendStatus(null);
    setResendMessage(null);

    try {
      const response = await fetch('/api/public/resend-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const text = await response.text();
        setResendStatus('error');
        setResendMessage(text || 'Gagal mengirim ulang verifikasi.');
        return;
      }

      setResendStatus('success');
      setResendMessage('Email verifikasi dikirim ulang. Silakan cek kotak masuk.');
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Gagal mengirim ulang verifikasi.';
      setResendStatus('error');
      setResendMessage(msg);
    } finally {
      setResending(false);
    }
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

        <input
          name="email"
          type="email"
          required
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="w-full border rounded px-3 py-2"
        />
        <input
          name="password"
          type="password"
          required
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="w-full border rounded px-3 py-2"
        />

        {verified && <p className="text-sm text-emerald-600">Email berhasil dikonfirmasi. Silakan login.</p>}
        {err && <p className="text-sm text-rose-600">{err}</p>}
        {resendMessage && (
          <p className={`text-sm ${resendStatus === 'success' ? 'text-emerald-600' : 'text-rose-600'}`}>
            {resendMessage}
          </p>
        )}

        <button
          disabled={loading}
          className="w-full py-2 rounded bg-slate-900 text-white disabled:opacity-60"
          type="submit"
        >
          {loading ? 'Masuk…' : 'Masuk'}
        </button>
        <button
          type="button"
          onClick={handleResend}
          disabled={resending || !email}
          className="w-full rounded border border-slate-300 px-3 py-2 text-sm text-slate-700 disabled:opacity-60"
        >
          {resending ? 'Mengirim ulang…' : 'Kirim ulang verifikasi'}
        </button>
      </form>
    </div>
  );
}
