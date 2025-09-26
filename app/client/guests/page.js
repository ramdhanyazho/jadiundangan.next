import { supabase } from '@/lib/supabaseClient';
export const revalidate = 0;
export default async function GuestsPage(){
  const { data: guests } = await supabase.from('guests').select('*').order('created_at', { ascending: false }).limit(100);
  const wa = (name) => `https://wa.me/?text=${encodeURIComponent('Halo ' + name + ', kami mengundang Anda…')}`;
  return (
    <div className="space-y-6">
      <div className="card">
        <h2 className="text-xl font-semibold">Data Tamu & Kehadiran</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead><tr className="text-left border-b"><th className="py-2">Nama</th><th>Status</th><th>Ucapan</th><th>Waktu</th><th>Aksi</th></tr></thead>
            <tbody>
              {guests?.map(g => (
                <tr key={g.id} className="border-b">
                  <td className="py-2">{g.name}</td>
                  <td>{g.status}</td>
                  <td className="max-w-md">{g.message}</td>
                  <td>{new Date(g.created_at).toLocaleString('id-ID')}</td>
                  <td><a className="text-brand underline" href={wa(g.name)} target="_blank">Kirim WhatsApp</a></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
