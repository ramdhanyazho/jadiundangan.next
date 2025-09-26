import { supabase } from '@/lib/supabaseClient';
export const revalidate = 0;
export default async function SupportPage(){
  const { data: settings } = await supabase.from('global_settings').select('*').single();
  const wa = settings?.whatsapp_number ? `https://wa.me/${settings.whatsapp_number}?text=${encodeURIComponent(settings.whatsapp_message || 'Halo, saya mau bertanya')}` : null;
  return (
    <div className="space-y-6">
      <div className="card">
        <h2 className="text-xl font-semibold">Hubungi Kami</h2>
        {wa ? (<a className="inline-block mt-3 px-5 py-2 rounded-xl bg-green-600 text-white" href={wa} target="_blank">WhatsApp Admin</a>) : (<p className="mt-3 opacity-80">Nomor WhatsApp admin belum diatur.</p>)}
      </div>
    </div>
  )
}
