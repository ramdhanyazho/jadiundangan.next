import Link from 'next/link';

export const dynamic = 'force-dynamic';

async function fetchJSON(path: string) {
  const res = await fetch(path, { cache: 'no-store' });

  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || `Request to ${path} failed with status ${res.status}`);
  }

  return res.json() as Promise<Record<string, unknown>>;
}

export default async function AuthDoctor() {
  let debugData: Record<string, unknown> | null = null;
  let debugError: string | null = null;

  try {
    debugData = await fetchJSON('/api/_debug/auth');
  } catch (error) {
    debugError = error instanceof Error ? error.message : 'Gagal memuat data debug';
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '';

  return (
    <main className="min-h-screen p-6 space-y-4">
      <div>
        <h1 className="text-3xl font-bold">Auth Doctor</h1>
        <p className="mt-2 text-sm text-gray-600">
          Gunakan halaman ini untuk memastikan konfigurasi Supabase Anda siap dipakai.
        </p>
      </div>

      <section className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
        <h2 className="mb-2 text-lg font-semibold">Status Konfigurasi</h2>
        <pre className="overflow-auto rounded-xl bg-gray-900 p-4 text-xs text-gray-100">
          {debugError ? debugError : JSON.stringify(debugData, null, 2)}
        </pre>
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
        <h2 className="mb-2 text-lg font-semibold">Probe Login</h2>
        <p className="text-sm text-gray-600">
          Kirim permintaan ke <code>/api/_debug/probe-login</code> untuk menguji kredensial dan memastikan API key terkirim.
        </p>
        <pre className="mt-3 overflow-auto rounded-xl bg-gray-900 p-4 text-xs text-gray-100">
{`curl -X POST ${baseUrl}/api/_debug/probe-login \\
  -H "Content-Type: application/json" \\
  -d '{"email":"admin@gmail.com","password":"SALAH"}'`}
        </pre>
      </section>

      <Link href="/login" className="inline-block text-sm font-medium text-blue-700 underline">
        Ke halaman login
      </Link>
    </main>
  );
}