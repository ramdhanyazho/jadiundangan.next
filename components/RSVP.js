'use client';
import { useState } from 'react';
export default function RSVP({ invitationId }){
  const [name, setName] = useState('');
  const [status, setStatus] = useState('yes');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState(false);
  const [err, setErr] = useState('');
  const submit = async (e) => {
    e.preventDefault(); setLoading(true); setErr(''); setOk(false);
    try {
      const res = await fetch('/api/rsvp', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ invitation_id: invitationId, name, status, message })});
      if(!res.ok){ throw new Error(await res.text()); }
      setOk(true); setName(''); setMessage(''); setStatus('yes');
    } catch (e) { setErr(e.message || 'Gagal kirim RSVP'); } finally { setLoading(false); }
  };
  return (
    <section className="section container-narrow">
      <h2 className="text-2xl md:text-3xl font-bold mb-6">Konfirmasi Kehadiran</h2>
      <form onSubmit={submit} className="card">
        <div className="grid md:grid-cols-2 gap-4">
          <div><label className="block text-sm mb-1">Nama</label><input className="w-full border rounded-lg px-3 py-2" required value={name} onChange={e=>setName(e.target.value)} /></div>
          <div><label className="block text-sm mb-1">Status</label><select className="w-full border rounded-lg px-3 py-2" value={status} onChange={e=>setStatus(e.target.value)}><option value="yes">Hadir</option><option value="no">Tidak Hadir</option><option value="pending">Belum Pasti</option></select></div>
          <div className="md:col-span-2"><label className="block text-sm mb-1">Ucapan</label><textarea className="w-full border rounded-lg px-3 py-2" rows={3} value={message} onChange={e=>setMessage(e.target.value)} /></div>
        </div>
        <button disabled={loading} className="mt-4 px-5 py-2 rounded-xl bg-brand text-white shadow disabled:opacity-60">{loading ? 'Mengirim...' : 'Kirim RSVP'}</button>
        {ok && <div className="mt-3 text-green-700">Terima kasih! RSVP Anda tersimpan.</div>}
        {err && <div className="mt-3 text-red-700">{err}</div>}
      </form>
    </section>
  )
}
