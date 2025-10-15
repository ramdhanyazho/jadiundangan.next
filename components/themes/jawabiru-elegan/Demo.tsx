"use client";

import Image from "next/image";

const data = {
  hero: {
    title: "Undangan Pernikahan",
    names: "Wahyu & Riski",
    date: "Rabu, 15 Maret 2023",
    location: "Balai Kartini, Jakarta",
    image: "https://images.unsplash.com/photo-1520854221050-0f4caff449fb?auto=format&fit=crop&w=600&q=80",
  },
  greeting:
    "Tanpa mengurangi rasa hormat, kami mengundang Anda untuk hadir dalam hari istimewa kami dan berbagi kebahagiaan bersama.",
  couple: {
    groom: {
      name: "Muhammad Wahyu",
      parents: "Putra pertama dari Bapak Ahmad & Ibu Siti",
      image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80",
    },
    bride: {
      name: "Riski Ayu",
      parents: "Putri kedua dari Bapak Budi & Ibu Rina",
      image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=400&q=80",
    },
  },
  events: [
    {
      type: "Akad Nikah",
      date: "Rabu, 15 Maret 2023",
      time: "09.00 WIB",
      venue: "Masjid Agung Al Azhar",
      address: "Jl. Sisingamangaraja No.1, Kebayoran Baru, Jakarta",
    },
    {
      type: "Resepsi",
      date: "Rabu, 15 Maret 2023",
      time: "19.00 WIB",
      venue: "Balai Kartini",
      address: "Jl. Jend. Gatot Subroto Kav. 37, Jakarta",
    },
  ],
  story: [
    {
      title: "Pertama Berjumpa",
      subtitle: "2018",
      description:
        "Kami dipertemukan dalam sebuah acara kampus dan sejak saat itu persahabatan kami perlahan bertumbuh menjadi cerita cinta yang hangat.",
    },
    {
      title: "Tunangan",
      subtitle: "2022",
      description:
        "Dengan ridho kedua orang tua, kami mengikat janji untuk melangkah bersama menuju sebuah rumah tangga yang kami impikan.",
    },
    {
      title: "Menikah",
      subtitle: "2023",
      description:
        "Inilah hari di mana kami mengikrarkan janji suci dan memohon doa restu agar perjalanan ini penuh berkah dan kebahagiaan.",
    },
  ],
  galleries: [
    "https://images.unsplash.com/photo-1520854221050-0f4caff449fb?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1487412912498-0447578fcca8?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1520854221050-0f4caff449fb?auto=format&fit=crop&w=800&q=80",
  ],
  wishes: [
    {
      name: "Sahabat",
      message:
        "Selamat menempuh hidup baru! Semoga senantiasa dilimpahi kebahagiaan dan cinta yang tidak pernah padam.",
    },
    {
      name: "Rekan Kerja",
      message:
        "Turut berbahagia atas hari istimewa kalian. Semoga rumah tangga yang dibangun penuh keberkahan dan kedamaian.",
    },
  ],
  gift: {
    bank: "Bank Mandiri",
    accountNumber: "123-00-4567890-1",
    accountName: "Wahyu & Riski",
    note: "Kami sangat menghargai bentuk kasih sayang dalam bentuk apa pun. Terima kasih atas perhatian dan doa Anda.",
  },
};

const SectionTitle = ({ label }: { label: string }) => (
  <h2
    className="text-center text-2xl font-semibold uppercase tracking-[0.35em] text-sky-200"
    style={{ letterSpacing: "0.35em" }}
  >
    {label}
  </h2>
);

export default function Demo() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col lg:h-screen lg:flex-row">
        <aside className="relative hidden flex-1 overflow-hidden bg-slate-900 lg:flex">
          <div className="absolute inset-0 bg-gradient-to-br from-sky-900/70 via-slate-950/80 to-slate-900/90" />
          <Image
            src={data.hero.image}
            alt="Wahyu & Riski"
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover object-center opacity-30"
          />
          <div className="relative z-10 m-auto flex max-w-md flex-col items-center gap-4 rounded-3xl border border-sky-500/30 bg-slate-900/60 px-8 py-10 text-center shadow-2xl backdrop-blur">
            <p className="text-xs uppercase tracking-[0.4em] text-sky-200">Jawabiru</p>
            <h1 className="text-4xl font-semibold text-white" style={{ fontFamily: '"Great Vibes", cursive' }}>
              {data.hero.names}
            </h1>
            <p className="text-sm text-slate-200/80">{data.hero.date}</p>
            <p className="text-sm text-slate-200/60">{data.hero.location}</p>
          </div>
        </aside>

        <div className="w-full flex-1 bg-slate-950/70">
          <header className="relative overflow-hidden border-b border-slate-800 bg-slate-900/60">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.15),rgba(15,23,42,0.8))]" />
            <div className="relative px-6 pb-12 pt-16 text-center">
              <p className="text-xs uppercase tracking-[0.4em] text-sky-200">{data.hero.title}</p>
              <h1 className="mt-4 text-4xl font-semibold text-white" style={{ fontFamily: '"Great Vibes", cursive' }}>
                {data.hero.names}
              </h1>
              <p className="mt-4 text-base text-slate-200">{data.greeting}</p>
              <p className="mt-6 text-sm text-slate-300">
                {data.hero.date} · {data.hero.location}
              </p>
              <div className="mt-8 flex items-center justify-center gap-2 text-xs uppercase tracking-[0.35em] text-slate-400">
                <span className="h-px w-12 bg-slate-600" />Scroll Down<span className="h-px w-12 bg-slate-600" />
              </div>
            </div>
          </header>

          <section className="space-y-16 px-6 py-12">
            <div className="space-y-12">
              <SectionTitle label="Pasangan" />
              <div className="grid gap-8 sm:grid-cols-2">
                {[data.couple.groom, data.couple.bride].map((person) => (
                  <article
                    key={person.name}
                    className="group relative overflow-hidden rounded-3xl border border-slate-800/80 bg-slate-900/60 p-6 text-center shadow-lg"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-sky-500/5 via-transparent to-sky-700/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    <Image
                      src={person.image}
                      alt={person.name}
                      width={128}
                      height={128}
                      className="relative mx-auto h-32 w-32 rounded-full border border-sky-400/40 object-cover object-top shadow"
                    />
                    <h3
                      className="relative mt-6 text-3xl text-white"
                      style={{ fontFamily: '"Great Vibes", cursive' }}
                    >
                      {person.name}
                    </h3>
                    <p className="relative mt-3 text-sm leading-relaxed text-slate-300">{person.parents}</p>
                  </article>
                ))}
              </div>
            </div>

            <div className="space-y-8">
              <SectionTitle label="Acara" />
              <div className="grid gap-6">
                {data.events.map((event) => (
                  <div
                    key={event.type}
                    className="rounded-3xl border border-sky-500/10 bg-slate-900/70 p-6 shadow"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-y-4">
                      <div>
                        <p className="text-xs uppercase tracking-[0.3em] text-sky-300/80">{event.type}</p>
                        <h3 className="mt-2 text-2xl font-semibold text-white">{event.venue}</h3>
                      </div>
                      <div className="text-right text-sm text-slate-300">
                        <p>{event.date}</p>
                        <p>{event.time}</p>
                      </div>
                    </div>
                    <p className="mt-4 text-sm text-slate-400">{event.address}</p>
                    <button className="mt-6 rounded-full border border-sky-500/40 px-5 py-2 text-xs uppercase tracking-[0.2em] text-sky-200 transition hover:bg-sky-500/10">
                      Buka Maps
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-10">
              <SectionTitle label="Kisah Kami" />
              <div className="space-y-6">
                {data.story.map((item) => (
                  <div key={item.title} className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 shadow-inner">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                      <span className="rounded-full border border-slate-700 px-4 py-1 text-xs uppercase tracking-[0.3em] text-sky-200">
                        {item.subtitle}
                      </span>
                    </div>
                    <p className="mt-4 text-sm leading-relaxed text-slate-300">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-8">
              <SectionTitle label="Galeri" />
              <div className="grid gap-4 sm:grid-cols-2">
                {data.galleries.map((url, index) => (
                  <div key={index} className="relative overflow-hidden rounded-3xl border border-slate-800/60">
                    <Image
                      src={url}
                      alt={`Galeri ${index + 1}`}
                      width={600}
                      height={400}
                      className="h-48 w-full object-cover object-center"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <SectionTitle label="Ucapan" />
              <div className="space-y-4">
                {data.wishes.map((wish) => (
                  <blockquote key={wish.name} className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
                    <p className="text-sm leading-relaxed text-slate-200">“{wish.message}”</p>
                    <footer className="mt-4 text-sm text-sky-200">— {wish.name}</footer>
                  </blockquote>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <SectionTitle label="Hadiah" />
              <div className="rounded-3xl border border-sky-500/10 bg-slate-900/60 p-6 text-center">
                <p className="text-sm uppercase tracking-[0.3em] text-sky-200">{data.gift.bank}</p>
                <p className="mt-4 text-2xl font-semibold text-white">{data.gift.accountNumber}</p>
                <p className="mt-2 text-sm text-slate-300">a.n. {data.gift.accountName}</p>
                <p className="mt-4 text-sm leading-relaxed text-slate-400">{data.gift.note}</p>
                <button className="mt-6 rounded-full border border-sky-500/40 px-5 py-2 text-xs uppercase tracking-[0.2em] text-sky-200 transition hover:bg-sky-500/10">
                  Salin Rekening
                </button>
              </div>
            </div>
          </section>

          <footer className="border-t border-slate-800 bg-slate-900/60 px-6 py-8 text-center text-xs text-slate-500">
            <p>
              Terima kasih atas doa dan restu Anda. Sampai jumpa di hari bahagia kami.
            </p>
          </footer>
        </div>
      </div>
    </main>
  );
}
