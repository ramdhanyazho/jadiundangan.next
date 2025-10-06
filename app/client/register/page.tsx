'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';

type Theme = { slug: string; name: string };

type Step = 1 | 2;

export default function RegisterPage() {
  const [step, setStep] = useState<Step>(1);
  const [themes, setThemes] = useState<Theme[]>([]);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [name, setName] = useState('');

  const [groom, setGroom] = useState('');
  const [bride, setBride] = useState('');
  const [themeSlug, setThemeSlug] = useState('');
  const [slug, setSlug] = useState('');
  const [dateDisplay, setDateDisplay] = useState('');
  const [location, setLocation] = useState('');

  useEffect(() => {
    let active = true;

    (async () => {
      try {
        const response = await fetch('/api/themes-active');
        if (!active) return;

        if (response.ok) {
          const data: Theme[] = await response.json();
          setThemes(data);
          if (!themeSlug && data[0]) {
            setThemeSlug(data[0].slug);
          }
        } else {
          throw new Error('Failed to load themes');
        }
      } catch (error) {
        const fallback: Theme[] = [{ slug: 'jawabiru', name: 'Jawa Biru' }];
        setThemes(fallback);
        if (!themeSlug) {
          setThemeSlug(fallback[0].slug);
        }
      }
    })();

    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!themeSlug && themes[0]) {
      setThemeSlug(themes[0].slug);
    }
  }, [themes, themeSlug]);

  const canProceedAccount = useMemo(() => !!email && !!pass && !!name, [email, pass, name]);
  const canSubmitInvitation = useMemo(
    () => !!groom && !!bride && !!themeSlug,
    [groom, bride, themeSlug]
  );

  function handleAccountSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canProceedAccount) {
      setMessage('Lengkapi informasi akun terlebih dahulu.');
      return;
    }
    setMessage(null);
    setStep(2);
  }

  function autoSlug() {
    const generated = `${groom}-${bride}`
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    setSlug(generated);
  }

  async function submitInvitation(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmitInvitation) {
      setMessage('Lengkapi detail undangan terlebih dahulu.');
      return;
    }

    setBusy(true);
    setMessage(null);
    setSuccess(false);

    try {
      const payload = {
        account: { email, password: pass, full_name: name },
        invitation: {
          slug: slug || undefined,
          title: `The Wedding of ${groom} & ${bride}`,
          groom_name: groom,
          bride_name: bride,
          theme_slug: themeSlug,
          date_display: dateDisplay || undefined,
          location: location || undefined,
        },
        options: { confirmEmail: true },
      };

      const response = await fetch('/api/public/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const text = await response.text();
        setMessage(text || 'Gagal membuat akun.');
        return;
      }

      setSuccess(true);
      setMessage(null);
    } catch (error) {
      setMessage('Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-xl space-y-6 p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Daftar &amp; Buat Undangan</h1>
          <Link href="/" className="text-sm text-slate-600 hover:underline">
            ← Kembali ke Beranda
          </Link>
        </div>

        <div className="flex gap-2 text-sm">
          <span className={step === 1 ? 'font-semibold text-slate-900' : 'text-slate-500'}>
            1. Akun
          </span>
          <span>→</span>
          <span className={step === 2 ? 'font-semibold text-slate-900' : 'text-slate-500'}>
            2. Detail Undangan
          </span>
        </div>

        {step === 1 && (
          <form onSubmit={handleAccountSubmit} className="grid gap-3 rounded bg-white p-5 shadow">
            <Input label="Nama Lengkap" value={name} onChange={setName} required />
            <Input label="Email" type="email" value={email} onChange={setEmail} required />
            <Input label="Password" type="password" value={pass} onChange={setPass} required />
            {message && <p className="text-sm text-rose-600">{message}</p>}
            <div className="flex flex-wrap gap-3">
              <button className="rounded bg-slate-900 px-4 py-2 text-white" disabled={!canProceedAccount}>
                Lanjut
              </button>
              <Link href="/client/login" className="rounded border px-4 py-2 text-sm">
                Sudah punya akun?
              </Link>
            </div>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={submitInvitation} className="grid gap-3 rounded bg-white p-5 shadow">
            <div className="grid gap-3 md:grid-cols-2">
              <Input
                label="Nama Mempelai Pria"
                value={groom}
                onChange={setGroom}
                required
              />
              <Input
                label="Nama Mempelai Wanita"
                value={bride}
                onChange={setBride}
                required
              />
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              <Input
                label="Slug (opsional)"
                value={slug}
                onChange={setSlug}
                hint="Contoh: rahmat-nisa"
                action={{ label: 'Auto', onClick: autoSlug }}
              />
              <Input
                label="Tanggal (opsional)"
                value={dateDisplay}
                onChange={setDateDisplay}
                hint="Contoh: 17 Agustus 2024"
              />
              <Input
                label="Lokasi (opsional)"
                value={location}
                onChange={setLocation}
              />
            </div>

            <label className="block">
              <div className="mb-1 text-sm">Tema Undangan</div>
              <select
                className="w-full rounded border px-3 py-2"
                value={themeSlug}
                onChange={(e) => setThemeSlug(e.target.value)}
                required
              >
                {themes.map((t) => (
                  <option key={t.slug} value={t.slug}>
                    {t.name}
                  </option>
                ))}
              </select>
            </label>

            {message && <p className="text-sm text-rose-600">{message}</p>}
            {success && (
              <div className="rounded border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700">
                Akun dibuat, cek email verifikasi.
              </div>
            )}

            <div className="flex flex-wrap gap-3">
              <button
                disabled={busy || !canSubmitInvitation}
                className="rounded bg-slate-900 px-4 py-2 text-white disabled:opacity-70"
              >
                {busy ? 'Memproses…' : 'Buat Akun & Undangan'}
              </button>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="rounded border px-4 py-2 text-sm"
              >
                Kembali
              </button>
              <Link
                href="/client/login?created=1"
                className="rounded border border-slate-300 px-4 py-2 text-sm text-slate-700"
              >
                Ke Halaman Login
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

type InputProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
  hint?: string;
  action?: { label: string; onClick: () => void };
};

function Input({ label, value, onChange, type = 'text', required, hint, action }: InputProps) {
  return (
    <label className="block">
      <div className="mb-1 flex items-center justify-between text-sm">
        <span>{label}</span>
        {action && (
          <button
            type="button"
            onClick={action.onClick}
            className="rounded border px-2 py-1 text-xs"
          >
            {action.label}
          </button>
        )}
      </div>
      <input
        className="w-full rounded border px-3 py-2"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        type={type}
        required={required}
      />
      {hint && <div className="mt-1 text-xs text-slate-500">{hint}</div>}
    </label>
  );
}
