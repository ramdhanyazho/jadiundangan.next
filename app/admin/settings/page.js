import { supabase } from '@/lib/supabaseClient';
export const revalidate = 0;
export default async function AdminSettings(){
  const { data: settings } = await supabase.from('global_settings').select('*').single();
  return (
    <div className="space-y-6">
      <div className="card">
        <h2 className="text-xl font-semibold">Global Settings</h2>
        <div className="mt-3 grid md:grid-cols-3 gap-4">
          <div><div className="text-sm opacity-70">Trial (hari)</div><div className="text-2xl">{settings?.trial_days ?? '-'}</div></div>
          <div><div className="text-sm opacity-70">Masa Aktif (hari)</div><div className="text-2xl">{settings?.active_days ?? '-'}</div></div>
          <div><div className="text-sm opacity-70">Harga</div><div className="text-2xl">{settings?.price ?? '-'}</div></div>
        </div>
      </div>
      <div className="card">
        <h3 className="text-lg font-semibold">Pembayaran Manual</h3>
        <div className="mt-3 text-sm">
          Bank: {settings?.bank_name || '-'} • No: {settings?.bank_number || '-'} • Atas Nama: {settings?.bank_owner || '-'}
        </div>
      </div>
      <div className="card">
        <h3 className="text-lg font-semibold">WhatsApp Gateway</h3>
        <div className="mt-3 text-sm">Token: {settings?.wa_token ? '••••••' : '-'}</div>
        <p className="mt-2 text-sm opacity-80">Ikuti panduan Nusagateway pada dokumentasi untuk menghubungkan perangkat.</p>
      </div>
    </div>
  )
}
