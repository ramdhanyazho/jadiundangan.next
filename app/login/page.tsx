'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, type ChangeEvent, type FormEvent } from 'react';
import { getBrowserClient } from '@/lib/supabaseClient';

const loginFields = [
  { id: 'email', label: 'Email', type: 'email', autoComplete: 'email' },
  { id: 'password', label: 'Password', type: 'password', autoComplete: 'current-password' },
] as const;

export default function LoginPage() {
  const router = useRouter();
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setFormState((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    const supabase = getBrowserClient();

    const email = formState.email.trim();
    const password = formState.password.trim();

    if (!email || !password) {
      setError('Email dan password wajib diisi.');
      setIsLoading(false);
      return;
    }


    try {
      const {
        data: { user },
        error: signInError,
      } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError || !user) {
        const normalizedMessage = signInError?.message.toLowerCase();
        const friendlyMessage =
          normalizedMessage && normalizedMessage.includes('invalid login credentials')
            ? 'Email atau password salah.'
            : normalizedMessage && normalizedMessage.includes('no api key found')
              ? 'Konfigurasi Supabase tidak ditemukan. Silakan hubungi administrator.'
            : signInError?.status === 400
              ? 'Permintaan login tidak valid. Periksa kembali email dan password Anda.'
              : signInError?.message;

        throw friendlyMessage ? new Error(friendlyMessage) : signInError ?? new Error('Gagal masuk.');
      }

      const { data: rawProfile, error: profileError } = await supabase
        .from('profiles')
        .select('is_admin, role')
        .eq('user_id', user.id)
        .maybeSingle();

      if (profileError && profileError.code !== 'PGRST116') {
        throw profileError;
      }

      const profile = rawProfile as { is_admin?: boolean | null; role?: string | null } | null;
      const isAdmin = profile?.is_admin === true || profile?.role === 'admin';
      const destination = isAdmin ? '/admin' : '/client';

      router.replace(destination);
      router.refresh();
    } catch (submitError) {
      const message =
        submitError instanceof Error ? submitError.message : 'Terjadi kesalahan saat masuk.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0E356B] to-[#1e4ea1] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl px-8 py-10">
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-12 h-12 rounded-full bg-[#0E356B] flex items-center justify-center text-white font-semibold text-lg">
              JU
            </div>
            <h1 className="mt-4 text-3xl font-semibold text-gray-900">Login</h1>
            <p className="mt-2 text-sm text-gray-500">
              Masuk ke akun Anda untuk mengelola undangan digital.
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {loginFields.map((field) => (
              <div key={field.id} className="space-y-2">
                <label htmlFor={field.id} className="block text-sm font-medium text-gray-700">
                  {field.label}
                </label>
                <input
                  id={field.id}
                  type={field.id === 'password' && showPassword ? 'text' : field.type}
                  autoComplete={field.autoComplete}
                  required
                  value={formState[field.id]}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-[#1e4ea1] focus:ring-[#1e4ea1]"
                  placeholder={field.label}
                />
              </div>
            ))}

            <div className="flex items-center space-x-2">
              <input
                id="show-password"
                type="checkbox"
                checked={showPassword}
                onChange={(event) => setShowPassword(event.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-[#0E356B] focus:ring-[#1e4ea1]"
              />
              <label htmlFor="show-password" className="text-sm text-gray-600">
                Tampilkan Password
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-xl bg-[#0E356B] py-3 text-sm font-semibold text-white transition hover:bg-[#1e4ea1] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isLoading ? 'Memproses...' : 'Login'}
            </button>

            {error ? <p className="text-sm text-red-500 text-center">{error}</p> : null}

            <div className="text-center text-sm text-gray-500">
              <Link href="/forgot-password" className="font-medium text-[#0E356B] hover:text-[#1e4ea1]">
                Lupa Password?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}