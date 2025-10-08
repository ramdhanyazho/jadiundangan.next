import Image from 'next/image';
import type { InvitationGalleryItem } from '@/lib/types';

export function SectionGaleri({ gallery }: { gallery: InvitationGalleryItem[] }) {
  return (
    <section className="bg-white-black pb-5 pt-3" id="galeri" data-section-id="galeri">
      <div className="container">
        <div className="border rounded-5 shadow p-3">
          <h2 className="font-esthetic text-center py-2 m-0" style={{ fontSize: '2.25rem' }}>
            Galeri Momen
          </h2>
          <div className="row g-3 mt-3">
            {gallery.map((item) => (
              <div key={item.src} className="col-6">
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={item.width ?? 400}
                  height={item.height ?? 400}
                  className="w-100 h-100 rounded-4 shadow-sm cursor-pointer"
                  style={{ objectFit: 'cover' }}
                  data-gallery-image
                  data-full={item.src}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
