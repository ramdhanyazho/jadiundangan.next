import Image from "next/image";
import Link from "next/link";

import { COUPLE_PLACEHOLDER } from "@/lib/assets/placeholders";

export default function Page() {
  return (
    <main className="grid min-h-screen place-items-center bg-white text-slate-800">
      <section className="text-center">
        <p className="text-xl font-serif text-slate-500">The Wedding Of</p>

        <div className="relative mx-auto mt-6 h-44 w-44 overflow-hidden rounded-full shadow-[0_8px_24px_rgba(0,0,0,.15)] ring-1 ring-slate-100">
          <Image
            src={COUPLE_PLACEHOLDER}
            alt="Couple"
            fill
            sizes="176px"
            className="object-cover"
            priority
            unoptimized
          />
        </div>

        <h1 className="mt-8 text-4xl font-serif">Wahyu &amp; Riski</h1>

        <Link
          href="/demo/ulems-classic-emerald"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 text-slate-900 shadow-[0_6px_18px_rgba(0,0,0,.08)] ring-1 ring-slate-200 hover:bg-slate-50"
        >
          <span>Open Invitation</span>
        </Link>
      </section>
    </main>
  );
}
