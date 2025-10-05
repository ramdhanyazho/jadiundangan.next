'use client';

import { useEffect, useState } from 'react';

import { sb } from '@/lib/supabaseBrowser';
import { useActiveInvitation } from '@/lib/useActiveInvitation';

type GuestForm = {
  name: string;
  status: string;
  message: string;
  seats: number;
};

type GuestRow = {
  id: string;
  name: string;
  status: string;
  message: string | null;
  seats: number | null;
  created_at: string;
};

const defaultForm: GuestForm = { name: '', status: 'pending', message: '', seats: 1 };

export default function GuestsPage() {
  const { inv } = useActiveInvitation();
  const [rows, setRows] = useState<GuestRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<GuestForm>({ ...defaultForm });

  async function load() {
    if (!inv) return;
    setLoading(true);
    const { data } = await (sb
      .from('guests') as any)
      .select('id,name,status,message,seats,created_at')
      .eq('invitation_id', inv.id)
      .order('created_at', { ascending: false });
    setRows((data as GuestRow[]) || []);
    setLoading(false);
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inv?.id]);

  async function addGuest(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!inv) return;
    const { error } = await (sb.from('guests') as any).insert({ ...form, invitation_id: inv.id });
    if (!error) {
      setForm({ ...defaultForm });
      load();
    }
  }

  async function updateRow(id: string, patch: Partial<GuestRow>) {
    await (sb.from('guests') as any).update(patch).eq('id', id);
    load();
  }

  async function removeRow(id: string) {
    await (sb.from('guests') as any).delete().eq('id', id);
    load();
  }

  if (!inv) return <p>Memuat…</p>;

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Buku Tamu</h1>

      <form onSubmit={addGuest} className="grid gap-3 rounded bg-white p-4 shadow md:grid-cols-4">
        <input
          required
          placeholder="Nama Tamu"
          className="rounded border px-3 py-2"
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
        />
        <select
          className="rounded border px-3 py-2"
          value={form.status}
          onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))}
        >
          <option value="pending">Pending</option>
          <option value="yes">Hadir</option>
          <option value="no">Tidak Hadir</option>
        </select>
        <input
          placeholder="Ucapan"
          className="col-span-1 rounded border px-3 py-2 md:col-span-2"
          value={form.message}
          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
        />
        <input
          type="number"
          min={1}
          className="rounded border px-3 py-2"
          value={form.seats}
          onChange={(e) =>
            setForm((f) => ({ ...f, seats: Number(e.target.value || 1) }))
          }
        />
        <button className="rounded bg-slate-900 px-4 py-2 text-white">Simpan</button>
      </form>

      <div className="overflow-x-auto rounded bg-white shadow">
        <table className="w-full text-sm">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-2 text-left">Nama</th>
              <th>Status</th>
              <th>Ucapan</th>
              <th>Kursi</th>
              <th className="w-40">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td className="p-3" colSpan={5}>
                  Memuat…
                </td>
              </tr>
            ) : rows.length ? (
              rows.map((r) => (
                <tr key={r.id} className="border-t">
                  <td className="p-2">{r.name}</td>
                  <td className="p-2">
                    <select
                      value={r.status}
                      onChange={(e) => updateRow(r.id, { status: e.target.value })}
                      className="rounded border px-2 py-1"
                    >
                      <option value="pending">Pending</option>
                      <option value="yes">Hadir</option>
                      <option value="no">Tidak Hadir</option>
                    </select>
                  </td>
                  <td className="p-2">
                    <input
                      className="w-full rounded border px-2 py-1"
                      defaultValue={r.message || ''}
                      onBlur={(e) => updateRow(r.id, { message: e.target.value })}
                    />
                  </td>
                  <td className="p-2">
                    <input
                      type="number"
                      min={1}
                      className="w-20 rounded border px-2 py-1"
                      defaultValue={r.seats || 1}
                      onBlur={(e) =>
                        updateRow(r.id, { seats: Number(e.target.value || 1) })
                      }
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
              ))
            ) : (
              <tr>
                <td className="p-3" colSpan={5}>
                  Belum ada tamu.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
