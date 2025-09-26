'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
export default function UploadImage({ bucket='media', onUploaded }){
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const upload = async (e) => {
    e.preventDefault(); if (!file) return;
    setLoading(true); setError('');
    try {
      const filename = `${Date.now()}-${file.name}`.replace(/\s+/g,'-');
      const { data, error } = await supabase.storage.from(bucket).upload(filename, file, { cacheControl: '3600', upsert: false });
      if (error) throw error;
      const { data: pub } = supabase.storage.from(bucket).getPublicUrl(data.path);
      onUploaded && onUploaded(pub.publicUrl, data.path);
    } catch (err) { setError(err.message || 'Upload gagal'); } finally { setLoading(false); }
  };
  return (
    <form onSubmit={upload} className="card">
      <label className="block text-sm mb-2">Upload Gambar</label>
      <input type="file" accept="image/*" onChange={e=>setFile(e.target.files?.[0])} />
      <button disabled={loading || !file} className="mt-3 px-4 py-2 rounded-lg bg-brand text-white disabled:opacity-60">{loading ? 'Uploading...' : 'Upload'}</button>
      {error && <div className="mt-2 text-red-600 text-sm">{error}</div>}
    </form>
  )
}
