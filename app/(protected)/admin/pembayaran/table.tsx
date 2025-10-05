'use client';

import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function PaymentsTable() {
  const { data, mutate } = useSWR('/api/admin/payments', fetcher);

  const setStatus = async (id: string, status: 'paid' | 'unpaid') => {
    await fetch(`/api/admin/payments/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    mutate();
  };

  return (
    <table className="w-full text-sm">
      <thead>
        <tr><th className="text-left">Invoice</th><th>Amount</th><th>Status</th><th>Aksi</th></tr>
      </thead>
      <tbody>
        {data?.items?.map((p: any) => (
          <tr key={p.id} className="border-t">
            <td className="py-2">{p.invoice_no || '—'}</td>
            <td>{Number(p.amount).toLocaleString()}</td>
            <td>{p.status}</td>
            <td>
              {p.status === 'unpaid' ? (
                <button
                  className="px-2 py-1 rounded bg-emerald-600 text-white"
                  onClick={() => setStatus(p.id, 'paid')}
                >
                  Tandai Lunas
                </button>
              ) : (
                <button
                  className="px-2 py-1 rounded bg-slate-200"
                  onClick={() => setStatus(p.id, 'unpaid')}
                >
                  Set Unpaid
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
