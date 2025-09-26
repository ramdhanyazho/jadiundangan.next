import { supabase } from '@/lib/supabaseClient';
export const revalidate = 0;
export default async function MetricsPage(){
  const { data: visits } = await supabase.from('visit_logs').select('*').order('created_at', { ascending: false }).limit(100);
  const total = visits?.length || 0;
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-3 gap-4">
        <div className="card"><div className="text-sm opacity-70">Total Kunjungan (log)</div><div className="text-3xl font-bold">{total}</div></div>
      </div>
      <div className="card">
        <h2 className="text-xl font-semibold">Log Kunjungan Terbaru</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead><tr className="text-left border-b"><th className="py-2">IP</th><th>UA</th><th>Waktu</th></tr></thead>
            <tbody>
              {visits?.map(v => (
                <tr key={v.id} className="border-b">
                  <td className="py-2">{v.ip || '-'}</td>
                  <td className="max-w-md">{(v.ua || '').slice(0,120)}</td>
                  <td>{new Date(v.created_at).toLocaleString('id-ID')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
