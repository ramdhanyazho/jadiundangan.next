import { supabase } from '@/lib/supabaseClient';
export const revalidate = 0;
export default async function AdminThemes(){
  const { data: themes } = await supabase.from('themes').select('*').order('created_at', { ascending: false });
  return (
    <div className="space-y-6">
      <div className="card">
        <h2 className="text-xl font-semibold">Tema</h2>
        <div className="mt-3 grid md:grid-cols-3 gap-4">
          {themes?.map(t => (
            <div key={t.id} className="border rounded-xl p-4">
              <div className="font-semibold">{t.name}</div>
              <div className="text-sm opacity-70">Slug: {t.slug}</div>
              <div className="text-sm">Status: {t.is_active ? 'Aktif' : 'Nonaktif'}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
