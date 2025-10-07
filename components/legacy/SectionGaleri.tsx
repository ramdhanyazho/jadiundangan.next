/* eslint-disable @next/next/no-img-element */
'use client';

import { useEffect, useRef } from 'react';

type SectionGaleriProps = {
  images: string[];
};

const PLACEHOLDER = 'https://placehold.co/600x600/png?text=Gallery';

export function SectionGaleri({ images }: SectionGaleriProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const pictures = Array.from(container.querySelectorAll<HTMLImageElement>('img[data-src]'));
    if (pictures.length === 0) return;

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            const dataSrc = img.getAttribute('data-src');
            if (dataSrc && img.src !== dataSrc) {
              img.src = dataSrc;
            }
            obs.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px 200px 0px', threshold: 0.1 }
    );

    pictures.forEach((img) => observer.observe(img));
    return () => observer.disconnect();
  }, [images]);

  return (
    <>
      <section className="bg-light-dark pb-3" id="gallery">
        <div className="container text-center" ref={containerRef}>
          <h2 className="font-esthetic pt-3 mb-4" style={{ fontSize: '2.25rem' }}>
            Galeri Momen
          </h2>
          <p className="mb-4" style={{ fontSize: '0.95rem' }}>
            Beberapa dokumentasi kebahagiaan kami yang ingin kami bagikan kepada Anda.
          </p>
          <div className="gallery-grid">
            {images.map((image, index) => (
              <div key={image} className="position-relative">
                <img
                  src={PLACEHOLDER}
                  data-src={image}
                  alt={`Galeri ${index + 1}`}
                  className="img-fluid shadow cursor-pointer"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="svg-wrapper">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="color-theme-svg no-gap-bottom">
          <path
            fill="currentColor"
            fillOpacity="1"
            d="M0,96L30,106.7C60,117,120,139,180,154.7C240,171,300,181,360,186.7C420,192,480,192,540,181.3C600,171,660,149,720,154.7C780,160,840,192,900,208C960,224,1020,224,1080,208C1140,192,1200,160,1260,138.7C1320,117,1380,107,1410,101.3L1440,96L1440,0L1410,0C1380,0,1320,0,1260,0C1200,0,1140,0,1080,0C1020,0,960,0,900,0C840,0,780,0,720,0C660,0,600,0,540,0C480,0,420,0,360,0C300,0,240,0,180,0C120,0,60,0,30,0L0,0Z"
          />
        </svg>
      </div>
    </>
  );
}
