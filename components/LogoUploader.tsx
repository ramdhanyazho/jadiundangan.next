'use client';

import { useState, type ChangeEvent } from 'react';

export function LogoUploader() {
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function onPick(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setBusy(true);
    setMessage(null);
    setError(null);

    try {
      const params = new URLSearchParams({
        type: 'photo',
        filename: file.name,
        contentType: file.type || 'image/png',
        invitation_id: 'brand',
      });
      const uploadUrlRes = await fetch(`/api/blob/upload-url?${params.toString()}`);
      if (!uploadUrlRes.ok) {
        throw new Error('Tidak dapat membuat upload URL');
      }
      const { url } = (await uploadUrlRes.json()) as { url?: string };
      if (!url) throw new Error('Upload URL kosong');

      const blobRes = await fetch(url, {
        method: 'POST',
        headers: file.type ? { 'content-type': file.type } : undefined,
        body: file,
      });
      if (!blobRes.ok) {
        throw new Error('Upload gagal');
      }
      let blobUrl = '';
      try {
        const json = await blobRes.json();
        blobUrl = json?.url ?? '';
      } catch {
        blobUrl = blobRes.headers.get('location') ?? '';
      }
      if (!blobUrl) {
        throw new Error('URL logo tidak tersedia');
      }

      const brandingRes = await fetch('/api/admin/branding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ logo_url: blobUrl }),
      });

      if (!brandingRes.ok) {
        const text = await brandingRes.text();
        throw new Error(text || 'Gagal menyimpan logo');
      }

      setMessage('Logo diperbarui.');
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Terjadi kesalahan';
      setError(msg);
    } finally {
      setBusy(false);
      e.target.value = '';
    }
  }

  return (
    <div className="space-y-2 rounded border bg-white p-4 shadow">
      <div>
        <h2 className="text-sm font-semibold text-slate-900">Logo Brand</h2>
        <p className="text-xs text-slate-500">Unggah logo baru untuk mengganti branding publik.</p>
      </div>
      <input type="file" accept="image/*" onChange={onPick} disabled={busy} />
      {busy && <p className="text-xs text-slate-500">Mengunggah…</p>}
      {message && <p className="text-xs text-emerald-600">{message}</p>}
      {error && <p className="text-xs text-rose-600">{error}</p>}
    </div>
  );
}
