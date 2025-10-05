'use client';

import { useState } from 'react';

import { sb } from '@/lib/supabaseBrowser';
import { useActiveInvitation } from '@/lib/useActiveInvitation';

export default function ContactPage() {
  const { inv } = useActiveInvitation();
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [msg, setMsg] = useState<string | null>(null);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMsg(null);
    const {
      data: { user },
    } = await sb.auth.getUser();
    if (!user) {
      setMsg('Harus login.');
      return;
    }
    const { error } = await (sb.from('contact_messages') as any).insert({
      user_id: user.id,
      invitation_id: inv?.id || null,
      subject,
      body,
    });
    if (error) setMsg(error.message);
    else {
      setMsg('Pesan terkirim.');
      setSubject('');
      setBody('');
    }
  }

  return (
    <form onSubmit={submit} className="max-w-2xl space-y-3 rounded bg-white p-5 shadow">
      <h1 className="text-xl font-semibold">Hubungi Kami</h1>
      <input
        className="w-full rounded border px-3 py-2"
        placeholder="Subjek"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />
      <textarea
        className="min-h-[140px] w-full rounded border px-3 py-2"
        placeholder="Tulis pesan anda…"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      {msg && <p className="text-sm text-emerald-600">{msg}</p>}
      <button className="rounded bg-slate-900 px-4 py-2 text-white">Kirim</button>
    </form>
  );
}
