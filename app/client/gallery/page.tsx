'use client';

import { useEffect, useState } from 'react';

import { sb } from '@/lib/supabaseBrowser';
import { useActiveInvitation } from '@/lib/useActiveInvitation';

type Row = {
  id: string;
  type: 'photo' | 'video';
  url: string;
  caption: string | null;
  created_at: string;
};

export default function GalleryPage() {
  const { inv } = useActiveInvitation();
  const [rows, setRows] = useState<Row[]>([]);
  const [busy, setBusy] = useState(false);
  const [progressText, setProgressText] = useState<string | null>(null);

  async function load() {
    if (!inv) return;
    const { data } = await sb
      .from('media')
      .select('id,type,url,caption,created_at')
      .eq('invitation_id', inv.id)
      .order('created_at', { ascending: false });
    setRows((data as Row[]) || []);
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inv?.id]);

  async function onPickFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || !inv) return;
    setBusy(true);
    setProgressText('Menyiapkan unggahan…');

    for (const file of Array.from(files)) {
      const type: 'photo' | 'video' = file.type.startsWith('video/') ? 'video' : 'photo';
      const params = new URLSearchParams({
        invitation_id: inv.id,
        type,
        filename: file.name,
        contentType: file.type,
      });

      const res = await fetch(`/api/blob/upload-url?${params.toString()}`);
      if (!res.ok) {
        console.warn('Gagal membuat upload URL', await res.text());
        continue;
      }
      const { url } = (await res.json()) as { url: string };
      setProgressText(`Mengunggah ${file.name}…`);

      const up = await fetch(url, { method: 'POST', body: file });
      if (!up.ok) {
        console.warn('Upload gagal:', file.name, up.statusText);
      }
    }

    setProgressText(null);
    setBusy(false);
    await load();
    e.currentTarget.value = '';
  }

  async function remove(id: string) {
    const ok = window.confirm('Hapus media ini?');
    if (!ok) return;
    await fetch('/api/blob/delete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ media_id: id }),
    });
    load();
  }

  if (!inv) {
    return <p>Memuat…</p>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Gallery / Album</h1>
        <label className="inline-flex items-center gap-2 rounded bg-slate-900 px-4 py-2 text-white">
          <input
            type="file"
            accept="image/*,video/*"
            multiple
            className="hidden"
            onChange={onPickFiles}
            disabled={busy}
          />
          {busy ? 'Mengunggah…' : 'Upload Foto/Video'}
        </label>
      </div>
      {progressText && <p className="text-sm text-slate-600">{progressText}</p>}

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {rows.map((r) => (
          <div key={r.id} className="overflow-hidden rounded bg-white shadow">
            {r.type === 'photo' ? (
              <img src={r.url} alt={r.caption || ''} className="h-40 w-full object-cover" />
            ) : (
              <video src={r.url} controls className="h-40 w-full object-cover" />
            )}
            <div className="flex items-center justify-between p-3 text-sm">
              <span className="truncate">{r.caption || r.type}</span>
              <button
                type="button"
                onClick={() => remove(r.id)}
                className="rounded bg-rose-600 px-2 py-1 text-white"
              >
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
