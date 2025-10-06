'use client';

import { useEffect, useState } from 'react';

import { sb } from '@/lib/supabaseBrowser';
import { useActiveInvitation } from '@/lib/useActiveInvitation';

type FormState = {
  slug: string;
  title: string;
  groom_name: string;
  bride_name: string;
  theme_slug: string;
  cover_photo_url: string;
  music_url: string;
  custom_domain_suffix: string;
  is_published: boolean;
};

export default function SettingsPage() {
  const { inv, setInv, loading } = useActiveInvitation();
  const [form, setForm] = useState<FormState | null>(null);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    if (!inv) {
      setForm(null);
      return;
    }
    setForm({
      slug: inv.slug || '',
      title: inv.title || '',
      groom_name: inv.groom_name || '',
      bride_name: inv.bride_name || '',
      theme_slug: inv.theme_slug || 'jawabiru',
      cover_photo_url: inv.cover_photo_url || '',
      music_url: inv.music_url || '',
      custom_domain_suffix: inv.custom_domain_suffix || '',
      is_published: !!inv.is_published,
    });
  }, [inv]);

  async function onSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!inv || !form) return;
    setSaving(true);
    setMsg(null);

    const { error, data } = await (sb
      .from('invitations') as any)
      .update({
        ...form,
        updated_at: new Date().toISOString(),
      })
      .eq('id', inv.id)
      .select('*')
      .maybeSingle();

    setSaving(false);

    if (error) {
      setMsg(error.message);
      return;
    }

    setMsg('Tersimpan.');
    if (data) {
      setInv(data);
    }
  }

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => (prev ? { ...prev, [key]: value } : prev));
  }

  if (loading) return <p>Memuat…</p>;
  if (!inv) return <p>Belum ada undangan. Silakan buat undangan terlebih dahulu.</p>;
  if (!form) return <p>Memuat…</p>;

  return (
    <form onSubmit={onSave} className="grid max-w-3xl gap-4">
      <h1 className="text-xl font-semibold">Pengaturan Website</h1>

      <Field label="Slug" value={form.slug} onChange={(v) => set('slug', v)} />
      <Field label="Judul" value={form.title} onChange={(v) => set('title', v)} />
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Nama Mempelai Pria" value={form.groom_name} onChange={(v) => set('groom_name', v)} />
        <Field label="Nama Mempelai Wanita" value={form.bride_name} onChange={(v) => set('bride_name', v)} />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Tema" value={form.theme_slug} onChange={(v) => set('theme_slug', v)} />
        <Field label="Musik (URL)" value={form.music_url} onChange={(v) => set('music_url', v)} />
      </div>
      <Field label="Cover Photo URL" value={form.cover_photo_url} onChange={(v) => set('cover_photo_url', v)} />
      <Field
        label="Domain Kustom (suffix)"
        value={form.custom_domain_suffix}
        onChange={(v) => set('custom_domain_suffix', v)}
      />

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={!!form.is_published}
          onChange={(e) => set('is_published', e.target.checked)}
        />
        <span>Publikasikan undangan</span>
      </label>

      {msg && <p className="text-sm text-emerald-600">{msg}</p>}
      <div className="flex gap-3">
        <button disabled={saving} className="rounded bg-slate-900 px-4 py-2 text-white">
          {saving ? 'Menyimpan…' : 'Simpan'}
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <div className="mb-1 text-sm">{label}</div>
      <input
        className="w-full rounded border bg-white px-3 py-2"
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}
