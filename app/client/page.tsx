'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

import { sb } from '@/lib/supabaseBrowser';
import { useActiveInvitation } from '@/lib/useActiveInvitation';

export default function ClientHome() {
  const { loading, inv } = useActiveInvitation();
  const [stats, setStats] = useState({ visits: 0, guests: 0, testimonials: 0 });

  useEffect(() => {
    (async () => {
      if (!inv) return;
      const [{ count: v }, { count: g }, { count: t }] = await Promise.all([
        sb.from('visit_logs').select('id', { count: 'exact', head: true }).eq('invitation_id', inv.id),
        sb.from('guests').select('id', { count: 'exact', head: true }).eq('invitation_id', inv.id),
        sb.from('testimonials').select('id', { count: 'exact', head: true }).eq('invitation_id', inv.id),
      ]);
      setStats({ visits: v || 0, guests: g || 0, testimonials: t || 0 });
    })();
  }, [inv]);

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Beranda</h1>
      {loading ? (
        <p>Memuat…</p>
      ) : inv ? (
        <>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <Card title="Undangan Aktif" value={inv.slug} href="/client/settings" />
            <Card title="Total Kunjungan" value={stats.visits} href="/client/visitors" />
            <Card title="Ucapan" value={stats.testimonials} href="/client/testimonials" />
          </div>
        </>
      ) : (
        <p>Belum ada undangan. Buat dari menu Registrasi.</p>
      )}
    </div>
  );
}

function Card({ title, value, href }: { title: string; value: any; href: string }) {
  return (
    <Link
      href={href}
      className="block rounded-xl bg-white p-5 shadow transition hover:shadow-md"
    >
      <div className="text-sm opacity-70">{title}</div>
      <div className="mt-1 text-2xl font-semibold">{String(value)}</div>
    </Link>
  );
}
