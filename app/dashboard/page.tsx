import Link from 'next/link';
import { redirect } from 'next/navigation';
import LogoutButton from '@/components/LogoutButton';
import RoleCookieSync from '@/components/RoleCookieSync';
import { getSessionAndProfile } from '@/lib/auth/getSessionAndProfile';

export default async function DashboardPage() {
  const { session, profile } = await getSessionAndProfile();

  if (!session) {
    redirect('/login');
  }

  const isAdmin = profile?.is_admin === true;

  return (
    <div className="min-h-screen bg-slate-50">
      <RoleCookieSync isAdmin={isAdmin} />
      <header className="border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-lg font-semibold text-gray-900">Dashboard Pengguna</h1>
            <p className="text-sm text-gray-500">Kelola undangan dan pantau aktivitas tamu Anda.</p>
          </div>
          <LogoutButton />
        </div>
      </header>
      <main className="mx-auto max-w-4xl px-6 py-10">
        <section className="space-y-6">
          <div className="rounded-2xl bg-white p-6 shadow-xl">
            <h2 className="text-xl font-semibold text-gray-900">Selamat datang kembali</h2>
            <p className="mt-2 text-sm text-gray-600">
              {profile?.full_name ? `${profile.full_name}, ` : ''}akun Anda siap digunakan untuk membuat dan membagikan undangan
              digital.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl bg-white p-6 shadow-xl">
              <p className="text-sm font-medium text-gray-500">Email</p>
              <p className="mt-3 text-2xl font-semibold text-gray-900">{profile?.email ?? session.user.email ?? '—'}</p>
            </div>
            <div className="rounded-2xl bg-white p-6 shadow-xl">
              <p className="text-sm font-medium text-gray-500">Peran</p>
              <p className="mt-3 text-2xl font-semibold text-gray-900">{isAdmin ? 'Administrator' : 'Pengguna'}</p>
            </div>
          </div>

          {isAdmin ? (
            <div className="rounded-2xl border border-dashed border-[#0E356B]/40 bg-[#0E356B]/5 p-6 text-center">
              <h3 className="text-lg font-semibold text-[#0E356B]">Akses Admin Tersedia</h3>
              <p className="mt-2 text-sm text-[#0E356B]/80">
                Anda ditandai sebagai admin. Gunakan panel berikut untuk mengelola platform secara menyeluruh.
              </p>
              <Link
                href="/admin"
                className="mt-4 inline-flex rounded-xl bg-[#0E356B] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#1e4ea1]"
              >
                Buka Halaman Admin
              </Link>
            </div>
          ) : null}
        </section>
      </main>
    </div>
  );
}