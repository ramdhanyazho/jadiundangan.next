import { supabase } from '@/lib/supabaseClient';
export const revalidate = 0;
export default async function AdminPayments(){
  const { data: payments } = await supabase.from('payments').select('*').order('created_at', { ascending: false });
  return (
    <div className="card">
      <h2 className="text-xl font-semibold mb-4">Pembayaran</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead><tr className="text-left border-b"><th className="py-2">User</th><th>Status</th><th>Amount</th><th>Metode</th><th>Created</th></tr></thead>
          <tbody>
            {payments?.map(p => (
              <tr key={p.id} className="border-b">
                <td className="py-2">{p.user_email || p.user_id}</td>
                <td>{p.status}</td>
                <td>{p.amount}</td>
                <td>{p.method}</td>
                <td>{new Date(p.created_at).toLocaleString('id-ID')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
