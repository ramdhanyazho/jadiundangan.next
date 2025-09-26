import { getSessionAndProfile } from '@/lib/auth/getSessionAndProfile';

export default async function AdminHomePage() {
  const { profile } = await getSessionAndProfile();

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-gray-900">Admin Home</h1>
        <p className="mt-2 text-sm text-gray-600">
          Kelola undangan digital, pengguna, dan konten platform dari satu tempat.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl bg-white p-6 shadow-xl">
          <p className="text-sm font-medium text-gray-500">Nama Lengkap</p>
          <p className="mt-3 text-2xl font-semibold text-gray-900">{profile?.full_name ?? '—'}</p>
        </div>
        <div className="rounded-2xl bg-white p-6 shadow-xl">
          <p className="text-sm font-medium text-gray-500">Email</p>
          <p className="mt-3 text-2xl font-semibold text-gray-900">{profile?.email ?? '—'}</p>
        </div>
        <div className="rounded-2xl bg-white p-6 shadow-xl">
          <p className="text-sm font-medium text-gray-500">Hak Akses</p>
          <p className="mt-3 text-2xl font-semibold text-gray-900">Administrator</p>
        </div>
      </div>
    </section>
  );
}