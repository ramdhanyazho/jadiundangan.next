'use client';

import { useEffect, useState } from 'react';

import { sb } from '@/lib/supabaseBrowser';
import { useActiveInvitation } from '@/lib/useActiveInvitation';

type TestimonialForm = {
  author: string;
  body: string;
  rating: number;
};

type TestimonialRow = {
  id: string;
  author: string;
  body: string | null;
  rating: number | null;
  created_at: string;
};

const defaultForm: TestimonialForm = { author: '', body: '', rating: 5 };

export default function TestimonialsPage() {
  const { inv } = useActiveInvitation();
  const [rows, setRows] = useState<TestimonialRow[]>([]);
  const [form, setForm] = useState<TestimonialForm>({ ...defaultForm });

  async function load() {
    if (!inv) return;
    const { data } = await (sb
      .from('testimonials') as any)
      .select('id,author,body,rating,created_at')
      .eq('invitation_id', inv.id)
      .order('created_at', { ascending: false });
    setRows((data as TestimonialRow[]) || []);
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inv?.id]);

  async function add(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!inv) return;
    await (sb.from('testimonials') as any).insert({ ...form, invitation_id: inv.id });
    setForm({ ...defaultForm });
    load();
  }

  async function updateRow(id: string, patch: Partial<TestimonialRow>) {
    await (sb.from('testimonials') as any).update(patch).eq('id', id);
    load();
  }

  async function removeRow(id: string) {
    await (sb.from('testimonials') as any).delete().eq('id', id);
    load();
  }

  if (!inv) return <p>Memuat…</p>;

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Testimoni</h1>

      <form onSubmit={add} className="grid gap-3 rounded bg-white p-4 shadow md:grid-cols-4">
        <input
          required
          placeholder="Nama"
          className="rounded border px-3 py-2"
          value={form.author}
          onChange={(e) => setForm((f) => ({ ...f, author: e.target.value }))}
        />
        <select
          className="rounded border px-3 py-2"
          value={form.rating}
          onChange={(e) => setForm((f) => ({ ...f, rating: Number(e.target.value) }))}
        >
          {[1, 2, 3, 4, 5].map((n) => (
            <option key={n} value={n}>
              {n} ⭐
            </option>
          ))}
        </select>
        <input
          placeholder="Ucapan"
          className="col-span-2 rounded border px-3 py-2"
          value={form.body}
          onChange={(e) => setForm((f) => ({ ...f, body: e.target.value }))}
        />
        <button className="rounded bg-slate-900 px-4 py-2 text-white">Simpan</button>
      </form>

      <div className="overflow-x-auto rounded bg-white shadow">
        <table className="w-full text-sm">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-2 text-left">Nama</th>
              <th>Rating</th>
              <th>Ucapan</th>
              <th className="w-40">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-t">
                <td className="p-2">{r.author}</td>
                <td className="p-2">
                  <select
                    defaultValue={r.rating ?? 5}
                    onChange={(e) => updateRow(r.id, { rating: Number(e.target.value) })}
                    className="rounded border px-2 py-1"
                  >
                    {[1, 2, 3, 4, 5].map((n) => (
                      <option key={n} value={n}>
                        {n} ⭐
                      </option>
                    ))}
                  </select>
                </td>
                <td className="p-2">
                  <input
                    defaultValue={r.body || ''}
                    onBlur={(e) => updateRow(r.id, { body: e.target.value })}
                    className="w-full rounded border px-2 py-1"
                  />
                </td>
                <td className="p-2">
                  <button
                    onClick={() => removeRow(r.id)}
                    className="rounded bg-rose-600 px-3 py-1 text-white"
                    type="button"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
