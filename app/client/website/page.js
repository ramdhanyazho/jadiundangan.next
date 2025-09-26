'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import UploadImage from '@/components/UploadImage';
export default function WebsiteSettings(){
  const [invitation, setInvitation] = useState(null);
  const [themes] = useState([{ slug:'jawabiru', name:'Jawa Biru' },{ slug:'minimal', name:'Minimal' },{ slug:'forest', name:'Forest' }]);
  const suffixPreview = invitation?.custom_domain_suffix?.trim() || 'suffix';
  useEffect(()=>{(async ()=>{const { data } = await supabase.from('invitations').select('*').eq('slug','contoh-rahmat-nisa').single(); setInvitation(data);})();},[]);
  const save = async () => {
    if (!invitation) return;
    await supabase.from('invitations').update({
      theme_slug: invitation.theme_slug,
      custom_domain_suffix: invitation.custom_domain_suffix || null,
      music_url: invitation.music_url || null,
      cover_photo_url: invitation.cover_photo_url || null,
      pages_enabled: invitation.pages_enabled || null
    }).eq('id', invitation.id);
    alert('Tersimpan');
  };
  const setPageEnabled = (key, val) => {
    const pages = invitation?.pages_enabled || {};
    const updated = { ...pages, [key]: val };
    setInvitation({ ...invitation, pages_enabled: updated });
  };
  return (
    <div className="space-y-6">
      <div className="card">
        <h2 className="text-xl font-semibold">Tampilan</h2>
        <div className="grid md:grid-cols-2 gap-4 mt-3">
          <div>
            <label className="block text-sm mb-1">Tema</label>
            <select className="w-full border rounded-lg px-3 py-2" value={invitation?.theme_slug || ''} onChange={e=>setInvitation({...invitation, theme_slug: e.target.value})}>
              {themes.map(t => <option key={t.slug} value={t.slug}>{t.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm mb-1">Domain Belakang (suffix)</label>
            <input className="w-full border rounded-lg px-3 py-2" placeholder="contoh: rahmat-nisa" value={invitation?.custom_domain_suffix || ''} onChange={e=>setInvitation({...invitation, custom_domain_suffix: e.target.value})} />
            <div className="text-xs opacity-70 mt-1">Hasil: https://domainmu.com/{suffixPreview}</div>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm mb-1">URL Musik</label>
            <input className="w-full border rounded-lg px-3 py-2" placeholder="https://.../lagu.mp3" value={invitation?.music_url || ''} onChange={e=>setInvitation({...invitation, music_url: e.target.value})} />
          </div>
        </div>
      </div>
      <UploadImage onUploaded={(url)=> setInvitation({...invitation, cover_photo_url: url})} />
      <div className="card">
        <h2 className="text-xl font-semibold">Fitur Halaman</h2>
        <div className="grid md:grid-cols-3 gap-2 mt-3">
          {['cover','mempelai','acara','ucapan','gallery','story','lokasi','qrcode','prokes','kirim_hadiah'].map(k => (
            <label key={k} className="flex items-center gap-2">
              <input type="checkbox" checked={!!(invitation?.pages_enabled || {})[k]} onChange={e=>setPageEnabled(k, e.target.checked)} />
              <span className="capitalize">{k.replace('_',' ')}</span>
            </label>
          ))}
        </div>
      </div>
      <button onClick={save} className="px-5 py-2 rounded-xl bg-brand text-white">Simpan Perubahan</button>
    </div>
  )
}
