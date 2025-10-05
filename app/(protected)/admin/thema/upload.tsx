'use client';

import { useState } from 'react';

export default function ThemeUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [slug, setSlug] = useState('');
  const [name, setName] = useState('');
  const [busy, setBusy] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !slug || !name) return;
    setBusy(true);
    const fd = new FormData();
    fd.append('file', file);
    fd.append('slug', slug);
    fd.append('name', name);
    const res = await fetch('/api/admin/themes', { method: 'POST', body: fd });
    setBusy(false);
    if (res.ok) {
      setFile(null);
      setSlug('');
      setName('');
      alert('Tema diunggah');
      location.reload();
    } else alert('Gagal upload tema');
  };

  return (
    <form onSubmit={onSubmit} className="flex gap-3 items-end">
      <div><label className="block text-sm">Slug</label>
        <input value={slug} onChange={(e) => setSlug(e.target.value)} className="border rounded px-2 py-1" /></div>
      <div><label className="block text-sm">Nama</label>
        <input value={name} onChange={(e) => setName(e.target.value)} className="border rounded px-2 py-1" /></div>
      <div><label className="block text-sm">File (.zip)</label>
        <input type="file" accept=".zip" onChange={(e) => setFile(e.target.files?.[0] ?? null)} /></div>
      <button disabled={busy} className="px-3 py-2 bg-slate-900 text-white rounded">{busy ? 'Mengunggah…' : 'Upload Tema'}</button>
    </form>
  );
}
