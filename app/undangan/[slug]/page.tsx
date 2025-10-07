/* eslint-disable @next/next/no-img-element */
/**
 * README: Jalankan `npm install` lalu `npm run dev` untuk memulai pengembangan tema undangan.
 */

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { Hero } from '@/components/legacy/Hero';
import { SectionGaleri } from '@/components/legacy/SectionGaleri';
import { SectionMempelai } from '@/components/legacy/SectionMempelai';
import { SectionTanggal } from '@/components/legacy/SectionTanggal';
import { SectionUcapan } from '@/components/legacy/SectionUcapan';
import { StatsCards } from '@/components/legacy/StatsCards';
import { Tabbar } from '@/components/legacy/Tabbar';
import { gcalEventUrl } from '@/lib/gcal';
import { getSiteUrl } from '@/lib/getSiteUrl';
import { type InvitationContent } from '@/lib/types';
import { formatIndonesianDate } from '@/lib/utils';

const DEMO_SLUG = 'contoh-rahmat-nisa';

const DEMO_INVITATION: InvitationContent = {
  couple: {
    panggilanPria: 'Rahmat',
    namaPria: 'Rahmat Prasetyo Putra',
    panggilanWanita: 'Nisa',
    namaWanita: 'Hanisa Dewi Lestari',
    fotoCoverUrl:
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=80',
    fotoPriaUrl:
      'https://images.unsplash.com/photo-1520854221050-0f4caff449fb?auto=format&fit=crop&w=800&q=80',
    fotoWanitaUrl:
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80',
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
      id: 'amira-danu',
      nama: 'Amira & Danu',
      pesan: 'Selamat menempuh hidup baru! Semoga rumah tangga Rahmat dan Nisa selalu penuh cinta dan kebahagiaan.',
      waktuISO: new Date('2023-03-01T08:30:00+07:00').toISOString(),
      presence: 'present',
      likes: 12,
    },
    {
      id: 'keluarga-wijaya',
      nama: 'Keluarga Wijaya',
      pesan: 'Doa terbaik untuk kalian berdua. Semoga menjadi keluarga sakinah, mawaddah, warahmah.',
      waktuISO: new Date('2023-02-24T09:45:00+07:00').toISOString(),
      presence: 'present',
      likes: 18,
    },
    {
      id: 'laras',
      nama: 'Laras',
      pesan: 'Tidak sabar bertemu kalian di hari bahagia! Congrats!',
      waktuISO: new Date('2023-02-20T19:12:00+07:00').toISOString(),
      presence: 'absent',
      likes: 7,
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
  const eventDate = formatIndonesianDate(new Date(`${firstEvent.tanggal}T${firstEvent.jamMulai}`));
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
  const eventDate = formatIndonesianDate(new Date(`${firstEvent.tanggal}T${firstEvent.jamMulai}`));
  const startISO = `${firstEvent.tanggal}T${firstEvent.jamMulai}:00+07:00`;
  const endTime = firstEvent.jamSelesai ?? firstEvent.jamMulai;
  const endISO = `${firstEvent.tanggal}T${endTime}:00+07:00`;
  const detailsUrl = `${getSiteUrl()}/undangan/${params.slug}`;
  const gcalUrl = gcalEventUrl(
    `Undangan Pernikahan ${data.couple.namaPria} & ${data.couple.namaWanita}`,
    startISO,
    endISO,
    firstEvent.alamat,
    detailsUrl
  );
  const slideshowImages = data.gallery.slice(0, 3);

  return (
    <div className="row m-0 p-0 opacity-100" id="root">
      <div className="sticky-top vh-100 d-none d-sm-block col-sm-5 col-md-6 col-lg-7 col-xl-8 col-xxl-9 overflow-y-hidden m-0 p-0">
        <div className="position-relative bg-white-black d-flex justify-content-center align-items-center vh-100">
          <div className="d-flex position-absolute w-100 h-100">
            <div className="position-relative overflow-hidden vw-100">
              {slideshowImages.map((image, index) => (
                <div
                  key={image}
                  className="position-absolute h-100 w-100 slide-desktop"
                  style={{ opacity: index === 0 ? 1 : 0 }}
                >
                  <img
                    src={image}
                    data-src={image}
                    alt="bg"
                    className="bg-cover-home"
                    style={{ maskImage: 'none', opacity: '30%' }}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="text-center p-4 bg-overlay-auto rounded-5">
            <h2 className="font-esthetic mb-4" style={{ fontSize: '2rem' }}>
              {data.couple.panggilanPria} &amp; {data.couple.panggilanWanita}
            </h2>
            <p className="m-0" style={{ fontSize: '1rem' }}>
              {eventDate}
            </p>
          </div>
        </div>
      </div>

      <div className="col-sm-7 col-md-6 col-lg-5 col-xl-4 col-xxl-3 m-0 p-0">
        <main
          data-bs-spy="scroll"
          data-bs-target="#navbar-menu"
          data-bs-root-margin="25% 0% 0% 0%"
          data-bs-smooth-scroll="true"
          tabIndex={0}
          className="with-scrollbar"
        >
          <Hero couple={data.couple} event={firstEvent} gcalUrl={gcalUrl} />
          <StatsCards stats={data.stats} />
          <SectionMempelai couple={data.couple} orangTua={data.orangTua} />
          <SectionTanggal events={data.events} />
          <SectionGaleri images={data.gallery} />
          <SectionUcapan slug={params.slug} initialComments={data.comments} />

          <div className="svg-wrapper">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="color-theme-svg no-gap-bottom">
              <path
                fill="currentColor"
                fillOpacity="1"
                d="M0,224L34.3,234.7C68.6,245,137,267,206,266.7C274.3,267,343,245,411,234.7C480,224,549,224,617,213.3C685.7,203,754,181,823,197.3C891.4,213,960,267,1029,266.7C1097.1,267,1166,213,1234,192C1302.9,171,1371,181,1406,186.7L1440,192L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"
              />
            </svg>
          </div>

          <section className="bg-white-black py-2 no-gap-bottom text-center">
            <div className="container">
              <p className="pb-2 pt-4" style={{ fontSize: '0.95rem' }}>
                Terima kasih atas perhatian dan doa restu Anda, yang menjadi kebahagiaan serta kehormatan besar bagi kami.
              </p>

              <h2 className="font-esthetic" style={{ fontSize: '2rem' }}>
                Wassalamualaikum Warahmatullahi Wabarakatuh
              </h2>
              <h2 className="font-arabic pt-4" style={{ fontSize: '2rem' }}>
                اَلْحَمْدُ لِلّٰهِ رَبِّ الْعٰلَمِيْنَۙ
              </h2>

              <hr className="my-3" />

              <div className="row align-items-center justify-content-between flex-column pb-3">
                <div className="col-auto">
                  <small>
                    Build with<i className="fa-solid fa-heart mx-1" />Dewanakl
                  </small>
                </div>
                <div className="col-auto">
                  <small>
                    <i className="fa-brands fa-github me-1" />
                    <a target="_blank" rel="noreferrer" href="https://github.com/dewanakl/undangan">
                      github
                    </a>
                  </small>
                  <small className="ms-3">
                    <i className="fa-solid fa-chart-simple me-1" />
                    <a target="_blank" rel="noreferrer" href="https://status.ulems.my.id">
                      status
                    </a>
                  </small>
                  <small className="ms-3">
                    <i className="fa-solid fa-music me-1" />
                    <a target="_blank" rel="noreferrer" href="https://pixabay.com/music/modern-classical-pure-love-304010/">
                      music
                    </a>
                  </small>
                </div>
              </div>
            </div>
          </section>
        </main>
        <Tabbar />
      </div>
    </div>
  );
}
