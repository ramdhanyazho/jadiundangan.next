"use client";

import Link from "next/link";
import { useState } from "react";
import { THEMES } from "@/lib/themes/registry";

export default function DemoCatalogModal() {
  const [open, setOpen] = useState(true); // ganti dengan state/modal milikmu

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4">
      <div className="w-full max-w-4xl rounded-3xl bg-white shadow-xl">
        <div className="flex items-center justify-between p-6">
          <div>
            <h2 className="text-xl font-semibold">Pilih Demo Tema</h2>
            <p className="text-sm text-slate-600">
              Jelajahi katalog tema unggulan dan buka pratinjau.
            </p>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="rounded-full px-3 py-1 text-sm text-slate-500 hover:bg-slate-100"
          >
            Tutup ✕
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2">
          {THEMES.map((t) => (
            <article
              key={t.slug}
              className="overflow-hidden rounded-2xl border border-slate-200"
            >
              <div className="h-28 bg-gradient-to-br from-slate-100 to-slate-200" />
              <div className="flex items-start justify-between p-5">
                <div>
                  <h3 className="text-lg font-semibold">{t.title}</h3>
                  <p className="mt-1 max-w-sm text-sm text-slate-600">
                    {t.description}
                  </p>
                  <Link
                    href={`/demo/${t.slug}`}
                    className="mt-3 inline-flex items-center text-sm font-semibold text-blue-700 hover:underline"
                    prefetch
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Buka Demo →
                  </Link>
                </div>
                <span className="rounded-full border border-slate-200 px-2 py-1 text-xs uppercase tracking-wide text-slate-600">
                  {t.tag}
                </span>
              </div>
            </article>
          ))}
        </div>

        <div className="border-t p-4 text-center text-xs text-slate-500">
          Semua demo dibuka di tab baru sehingga kamu tetap berada di halaman utama JadiUndangan.
        </div>
      </div>
    </div>
  );
}
