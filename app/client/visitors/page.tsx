'use client';

import { useEffect, useState } from 'react';

import { sb } from '@/lib/supabaseBrowser';
import { useActiveInvitation } from '@/lib/useActiveInvitation';

type VisitRow = {
  id: string;
  created_at: string;
  ip: string | null;
  ua: string | null;
};

export default function VisitorsPage() {
  const { inv, loading: invitationLoading } = useActiveInvitation();
  const [rows, setRows] = useState<VisitRow[]>([]);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);

  async function load() {
    if (!inv) return;
    setLoading(true);
    try {
      let query = sb
        .from('visit_logs')
        .select('id,created_at,ip,ua', { count: 'exact' })
        .eq('invitation_id', inv.id)
        .order('created_at', { ascending: false })
        .limit(200);
      if (from) query = query.gte('created_at', from);
      if (to) query = query.lte('created_at', to);
      const { data, count } = await query;
      setRows((data as VisitRow[]) || []);
      setCount(count || 0);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!inv) {
      setRows([]);
      setCount(0);
      return;
    }
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inv?.id]);

  if (invitationLoading) return <p>Memuat…</p>;
  if (!inv) return <p>Belum ada undangan. Silakan buat undangan terlebih dahulu.</p>;

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Riwayat Pengunjung</h1>

      <div className="flex flex-wrap gap-3 rounded bg-white p-4 shadow">
        <label className="text-sm">
          Dari:
          <input
            type="datetime-local"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="ml-2 rounded border px-2 py-1"
          />
        </label>
        <label className="text-sm">
          Sampai:
          <input
            type="datetime-local"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="ml-2 rounded border px-2 py-1"
          />
        </label>
        <button onClick={load} className="rounded bg-slate-900 px-4 py-2 text-white" disabled={loading}>
          {loading ? 'Memuat…' : 'Terapkan'}
        </button>
        <div className="ml-auto text-sm">
          Total: <b>{count}</b>
        </div>
      </div>

      <div className="overflow-x-auto rounded bg-white shadow">
        <table className="w-full text-sm">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-2 text-left">Waktu</th>
              <th>IP</th>
              <th>User Agent</th>
            </tr>
          </thead>
          <tbody>
            {rows.length ? (
              rows.map((r) => (
                <tr key={r.id} className="border-t">
                  <td className="p-2">{new Date(r.created_at).toLocaleString()}</td>
                  <td className="p-2">{r.ip || '-'}</td>
                  <td className="p-2">{r.ua?.slice(0, 120) || '-'}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="p-3" colSpan={3}>
                  {loading ? 'Memuat…' : 'Belum ada kunjungan.'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
