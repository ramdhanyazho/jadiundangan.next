'use client';

import Image from 'next/image';

import Heading from '../components/Heading';
import Section from '../components/Section';

import type { MediaRow } from '@/types/db';

type GalleryProps = {
  media: MediaRow[];
};

export default function Gallery({ media }: GalleryProps) {
  const photos = media.filter((item) => item.type === 'photo');

  if (!photos.length) return null;

  return (
    <Section id="gallery" className="bg-slate-100">
      <div className="mx-auto max-w-6xl">
        <Heading title="Galeri" description="Setiap momen adalah cerita yang ingin kami bagi" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {photos.map((photo) => (
            <figure key={photo.id} className="group relative overflow-hidden rounded-3xl bg-white shadow-sm">
              <div className="relative aspect-[4/5] w-full overflow-hidden">
                <Image
                  src={photo.url}
                  alt={photo.caption || 'Gallery photo'}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              {photo.caption ? (
                <figcaption className="px-4 py-3 text-sm text-slate-600">{photo.caption}</figcaption>
              ) : null}
            </figure>
          ))}
        </div>
      </div>
    </Section>
  );
}
