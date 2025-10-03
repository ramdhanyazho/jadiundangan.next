export const dynamic = 'force-dynamic';

async function getJSON(path: string) {
  const res = await fetch(path, { cache: 'no-store' });
  if (!res.ok) return { error: `HTTP ${res.status}` };
  try { return await res.json(); } catch { return { error: 'Invalid JSON' }; }
}

export default async function AuthDoctor() {
  const debug = await getJSON('/api/_debug/auth');
  return (
    <main className="min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-4">Auth Doctor</h1>
      <pre className="p-4 bg-gray-100 rounded-xl text-sm overflow-auto">{JSON.stringify(debug, null, 2)}</pre>
      <div className="mt-4 text-sm">
        <p className="mb-2 font-semibold">Probe Login (via curl):</p>
        <pre className="p-3 bg-gray-100 rounded">{`curl -iS -X POST https://<domain>/api/_debug/probe-login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@gmail.com","password":"SALAH"}'`}</pre>
      </div>
    </main>
  );
}
