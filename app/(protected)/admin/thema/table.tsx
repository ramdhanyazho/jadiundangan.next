'use client';

import useSWR from 'swr';

const fetcher = (u: string) => fetch(u).then((r) => r.json());

export default function ThemeTable() {
  const { data, mutate } = useSWR('/api/admin/themes', fetcher);

  const setStatus = async (id: string, status: 'active' | 'inactive') => {
    await fetch(`/api/admin/themes/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    mutate();
  };

  return (
    <table className="w-full text-sm">
      <thead><tr><th className="text-left">Nama</th><th>Slug</th><th>Status</th><th>Preview</th><th>Aksi</th></tr></thead>
      <tbody>
        {data?.items?.map((t: any) => (
          <tr key={t.id} className="border-t">
            <td className="py-2">{t.name}</td>
            <td>{t.slug}</td>
            <td>{t.status}</td>
            <td>{t.preview_url ? <a className="text-blue-600" href={t.preview_url} target="_blank">lihat</a> : '—'}</td>
            <td>
              {t.status === 'inactive' ? (
                <button
                  className="px-2 py-1 rounded bg-emerald-600 text-white"
                  onClick={() => setStatus(t.id, 'active')}
                >
                  Aktifkan
                </button>
              ) : (
                <button
                  className="px-2 py-1 rounded bg-slate-200"
                  onClick={() => setStatus(t.id, 'inactive')}
                >
                  Nonaktifkan
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
