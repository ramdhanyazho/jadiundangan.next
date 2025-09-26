import { supabase } from '@/lib/supabaseClient';
export const revalidate = 0;
export default async function TestimonialsPage(){
  const { data: testimonials } = await supabase.from('testimonials').select('*').order('created_at', { ascending: false });
  return (
    <div className="space-y-6">
      <div className="card">
        <h2 className="text-xl font-semibold">Testimoni Pelanggan</h2>
        <div className="mt-4 space-y-4">
          {testimonials?.map(t => (
            <div key={t.id} className="border-b pb-3">
              <div className="font-semibold">{t.author || 'Anonim'}</div>
              <div className="opacity-80">{t.body}</div>
              <div className="text-xs opacity-60 mt-1">{new Date(t.created_at).toLocaleString('id-ID')}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
