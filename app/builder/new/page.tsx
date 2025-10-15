"use client";

import { Suspense, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

function LoadingFallback() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <div className="rounded-lg border border-slate-200 bg-white p-6 text-center text-slate-600">
        Memuat formulir…
      </div>
    </main>
  );
}

function NewInvitationPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initial = useMemo(
    () => ({
      template: searchParams.get("template") ?? "",
      title: searchParams.get("title") ?? "Undangan Baru",
      names: searchParams.get("names") ?? "Wahyu & Riski",
      date: searchParams.get("date") ?? "2026-06-21 09:00",
      venue: searchParams.get("venue") ?? "Jakarta",
    }),
    [searchParams],
  );

  const [form, setForm] = useState(initial);
  const [slug, setSlug] = useState(slugify(form.names));

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const params = new URLSearchParams({
      template: form.template,
      title: form.title,
      names: form.names,
      date: form.date,
      venue: form.venue,
    });

    router.push(`/undangan/${slug}?${params.toString()}`);
  };

  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-semibold">Buat Undangan</h1>
      <p className="mt-1 text-sm text-slate-600">
        Form otomatis terisi dari pilihan template. Kamu bisa ubah sebelum menyimpan.
      </p>

      <form onSubmit={onSubmit} className="mt-6 space-y-5">
        <div>
          <label className="block text-sm font-medium">Template</label>
          <input
            className="mt-1 w-full rounded-lg border px-3 py-2"
            value={form.template}
            onChange={(event) => setForm({ ...form, template: event.target.value })}
            placeholder="ulems / jawabiru / indigo / cinematic / ..."
          />
          <p className="mt-1 text-xs text-slate-500">
            Diisi otomatis dari tombol <strong>Gunakan Template</strong>.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium">Judul</label>
            <input
              className="mt-1 w-full rounded-lg border px-3 py-2"
              value={form.title}
              onChange={(event) => setForm({ ...form, title: event.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Slug</label>
            <input
              className="mt-1 w-full rounded-lg border px-3 py-2"
              value={slug}
              onChange={(event) => setSlug(event.target.value)}
            />
            <p className="mt-1 text-xs text-slate-500">URL: /undangan/{slug}</p>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium">Nama Mempelai</label>
            <input
              className="mt-1 w-full rounded-lg border px-3 py-2"
              value={form.names}
              onChange={(event) => {
                const names = event.target.value;
                setForm({ ...form, names });
                setSlug(slugify(names));
              }}
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Tanggal &amp; Waktu</label>
            <input
              className="mt-1 w-full rounded-lg border px-3 py-2"
              value={form.date}
              onChange={(event) => setForm({ ...form, date: event.target.value })}
              placeholder="YYYY-MM-DD HH:mm"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium">Lokasi/Tempat</label>
          <input
            className="mt-1 w-full rounded-lg border px-3 py-2"
            value={form.venue}
            onChange={(event) => setForm({ ...form, venue: event.target.value })}
          />
        </div>

        <div className="pt-2">
          <button
            type="submit"
            className="rounded-lg bg-slate-900 px-4 py-2 text-white hover:bg-slate-800"
          >
            Buat &amp; Lanjutkan
          </button>
        </div>
      </form>
    </main>
  );
}

export default function NewInvitationPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <NewInvitationPageContent />
    </Suspense>
  );
}
