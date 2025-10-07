'use client';

import { useState } from 'react';
import Image from 'next/image';

import { Skeleton } from '@/components/ui/skeleton';

interface GaleriSectionProps {
  images: string[];
}

export function GaleriSection({ images }: GaleriSectionProps) {
  return (
    <section id="galeri" aria-labelledby="galeri-title" className="space-y-8">
      <div className="space-y-2">
        <h2 id="galeri-title" className="text-2xl font-semibold text-white">
          Galeri Momen
        </h2>
        <p className="text-sm text-slate-300">Kenang kembali perjalanan cinta kami melalui potret berikut.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {images.map((src) => (
          <GalleryImage key={src} src={src} />
        ))}
      </div>
    </section>
  );
}

function GalleryImage({ src }: { src: string }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="relative aspect-[3/4] overflow-hidden rounded-3xl border border-white/10 bg-white/5">
      {!loaded ? <Skeleton className="absolute inset-0" /> : null}
      <Image
        src={src}
        alt="Foto prewedding pasangan"
        fill
        loading="lazy"
        onLoadingComplete={() => setLoaded(true)}
        className="h-full w-full object-cover transition duration-700 ease-out hover:scale-105"
      />
    </div>
  );
}
