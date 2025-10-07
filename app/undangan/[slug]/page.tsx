/**
 * README: Jalankan `npm install` lalu `npm run dev` untuk memulai pengembangan tema undangan.
 */

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { Hero } from '@/components/hero';
import { StatsCards } from '@/components/stats-cards';
import { MempelaiSection } from '@/components/sections/mempelai';
import { JadwalSection } from '@/components/sections/jadwal';
import { GaleriSection } from '@/components/sections/galeri';
import { UcapanSection } from '@/components/sections/ucapan';
import { type InvitationContent } from '@/lib/types';
import { combineDateAndTime, formatIndonesianDate } from '@/lib/utils';

const DEMO_SLUG = 'contoh-rahmat-nisa';

const DEMO_INVITATION: InvitationContent = {
  couple: {
    panggilanPria: 'Rahmat',
    namaPria: 'Rahmat Prasetyo Putra',
    panggilanWanita: 'Nisa',
    namaWanita: 'Hanisa Dewi Lestari',
    fotoCoverUrl:
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=80',
  },
  events: [
    {
      label: 'Akad Nikah',
      tanggal: '2023-03-15',
      jamMulai: '09:00',
      jamSelesai: '11:00',
      alamat: 'Masjid Raya Al-Falah, Jl. Merpati No. 12, Bandung',
      gmapsUrl: 'https://maps.app.goo.gl/3pgE3dSa1YV3eYND7',
    },
    {
      label: 'Resepsi',
      tanggal: '2023-03-15',
      jamMulai: '12:30',
      jamSelesai: '15:30',
      alamat: 'Grand Orchid Ballroom, Jl. Anggrek No. 8, Bandung',
      gmapsUrl: 'https://maps.app.goo.gl/r5BfJd4drAiXGe3R9',
    },
  ],
  stats: {
    comments: 128,
    present: 214,
    absent: 16,
    likes: 482,
  },
  comments: [
    {
      nama: 'Amira & Danu',
      pesan: 'Selamat menempuh hidup baru! Semoga rumah tangga Rahmat dan Nisa selalu penuh cinta dan kebahagiaan.',
      waktuISO: new Date('2023-03-01T08:30:00+07:00').toISOString(),
    },
    {
      nama: 'Keluarga Wijaya',
      pesan: 'Doa terbaik untuk kalian berdua. Semoga menjadi keluarga sakinah, mawaddah, warahmah.',
      waktuISO: new Date('2023-02-24T09:45:00+07:00').toISOString(),
    },
    {
      nama: 'Laras',
      pesan: 'Tidak sabar bertemu kalian di hari bahagia! Congrats!',
      waktuISO: new Date('2023-02-20T19:12:00+07:00').toISOString(),
    },
  ],
  gallery: [
    'https://images.unsplash.com/photo-1520854221050-0f4caff449fb?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1520854221050-0f4caff449fb?auto=format&fit=crop&w=800&q=80&sat=-100',
    'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80',
  ],
  orangTua: {
    pria: 'Bapak H. Sugeng Raharjo & Ibu Hj. Kartika Sari',
    wanita: 'Bapak H. Suryo Wibowo & Ibu Hj. Dewi Kartini',
  },
};

type PageProps = {
  params: {
    slug: string;
  };
};

async function getInvitationContent(slug: string): Promise<InvitationContent | null> {
  if (slug === DEMO_SLUG) {
    return DEMO_INVITATION;
  }
  return null;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const data = await getInvitationContent(params.slug);
  if (!data) {
    return {
      title: 'Undangan Pernikahan',
      description: 'Undangan digital elegan dengan nuansa gelap dan aksen ungu.',
    };
  }
  const firstEvent = data.events[0];
  const eventDate = formatIndonesianDate(combineDateAndTime(firstEvent.tanggal, firstEvent.jamMulai));
  return {
    title: `${data.couple.panggilanPria} & ${data.couple.panggilanWanita} — ${eventDate}`,
    description: `Undangan pernikahan ${data.couple.namaPria} & ${data.couple.namaWanita} pada ${eventDate}.`,
    robots: params.slug === DEMO_SLUG ? { index: false, follow: false } : undefined,
  };
}

export default async function InvitationPage({ params }: PageProps) {
  const data = await getInvitationContent(params.slug);
  if (!data) {
    notFound();
  }

  const firstEvent = data.events[0];

  return (
    <div className="space-y-14 pb-12">
      <Hero couple={data.couple} firstEvent={firstEvent} />
      <StatsCards stats={data.stats} />
      <MempelaiSection couple={data.couple} orangTua={data.orangTua} />
      <JadwalSection events={data.events} />
      <GaleriSection images={data.gallery} />
      <UcapanSection slug={params.slug} initialComments={data.comments} />
    </div>
  );
}
