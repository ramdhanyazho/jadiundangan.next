import { gcalEventUrl } from '@/lib/gcal';
import { getSiteUrl } from '@/lib/getSiteUrl';
import type { InvitationContent } from '@/lib/types';

const BASE_SLUG = 'contoh-rahmat-nisa';

export function getInvitation(slug: string): InvitationContent | null {
  if (slug !== BASE_SLUG) {
    return null;
  }

  const detailsUrl = `${getSiteUrl()}/undangan/${slug}`;

  const schedules = [
    {
      title: 'Akad',
      start: '2023-03-15T09:00:00+07:00',
      end: '2023-03-15T11:00:00+07:00',
      timeLabel: 'Pukul 09.00 - 11.00 WIB',
    },
    {
      title: 'Resepsi',
      start: '2023-03-15T12:30:00+07:00',
      end: '2023-03-15T15:30:00+07:00',
      timeLabel: 'Pukul 12.30 - 15.30 WIB',
    },
  ];

  return {
    slug,
    hero: {
      title: 'Rahmat & Nisa',
      subtitle: 'Rabu, 15 Maret 2023',
      backgroundImage: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
      backgroundAlt: 'Background romantis',
      avatarImage: 'https://images.unsplash.com/photo-1520854221050-0f4caff449fb?auto=format&fit=crop&w=600&q=80',
      avatarAlt: 'Rahmat dan Nisa',
      googleCalendarUrl: gcalEventUrl(
        'Rahmat & Nisa Wedding',
        schedules[0].start,
        schedules[1].end,
        'Aula Serbaguna Bahagia, Banyumas',
        detailsUrl
      ),
    },
    couple: {
      groom: {
        name: 'Rahmat Prasetyo Putra',
        role: 'Putra pertama',
        parents: ['Bapak Ahmad Prasetyo', 'dan', 'Ibu Nur Aisyah'],
        image: 'https://images.unsplash.com/photo-1520854221050-0f4caff449fb?auto=format&fit=crop&w=600&q=80',
      },
      bride: {
        name: 'Hanisa Dewi Lestari',
        role: 'Putri kedua',
        parents: ['Bapak Sutrisno', 'dan', 'Ibu Rahayu Wulandari'],
        image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80',
      },
    },
    schedules,
    headline: 'Moment Bahagia',
    description:
      'Dengan memohon rahmat dan ridho Allah Subhanahu Wa Ta\'ala, insyaAllah kami akan menyelenggarakan acara:',
    dressCode: 'Busana batik dan bersepatu.',
    mapUrl: 'https://goo.gl/maps/ALZR6FJZU3kxVwN86',
    venue: 'Aula Serbaguna Bahagia, Desa Pajerukan, Banyumas, Jawa Tengah 53191',
    gallery: [
      {
        src: 'https://images.unsplash.com/photo-1520854221050-0f4caff449fb?auto=format&fit=crop&w=700&q=80&sat=-20',
        alt: 'Rahmat dan Nisa tersenyum',
      },
      {
        src: 'https://images.unsplash.com/photo-1520854221050-0f4caff449fb?auto=format&fit=crop&w=800&q=80&hue=20',
        alt: 'Momen cincin pernikahan',
      },
      {
        src: 'https://images.unsplash.com/photo-1520854221050-0f4caff449fb?auto=format&fit=crop&w=750&q=80&sat=-50',
        alt: 'Suasana resepsi',
      },
      {
        src: 'https://images.unsplash.com/photo-1519223400710-6da9e1b777ea?auto=format&fit=crop&w=650&q=80',
        alt: 'Foto keluarga bahagia',
      },
    ],
    messages: [
      {
        id: '1',
        name: 'Dewi Lestari',
        message: 'Selamat menempuh hidup baru, semoga menjadi keluarga sakinah mawaddah warahmah.',
        status: 'Hadir',
        createdAt: '1 jam yang lalu',
      },
      {
        id: '2',
        name: 'Rudi Hartono',
        message: 'Selamat Rahmat dan Nisa! Mohon maaf belum bisa hadir, semoga acaranya lancar.',
        status: 'Berhalangan',
        createdAt: '3 jam yang lalu',
      },
      {
        id: '3',
        name: 'Siti Fauziah',
        message: 'Ikut bahagia mendengar kabar baik ini. Sampai jumpa di hari H!',
        status: 'Hadir',
        createdAt: 'Kemarin',
      },
    ],
    stats: {
      comments: 128,
      present: 64,
      absent: 12,
      likes: 356,
    },
  };
}
