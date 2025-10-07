/* eslint-disable @next/next/no-img-element */
import type { Couple, Parents } from '@/lib/types';

const PLACEHOLDER = 'https://placehold.co/800x800/png?text=The+Groom+%26+Bride';

type SectionMempelaiProps = {
  couple: Couple;
  orangTua: Parents;
};

export function SectionMempelai({ couple, orangTua }: SectionMempelaiProps) {
  const groomImage = couple.fotoPriaUrl ?? couple.fotoCoverUrl ?? PLACEHOLDER;
  const brideImage = couple.fotoWanitaUrl ?? couple.fotoCoverUrl ?? PLACEHOLDER;

  return (
    <>
      <section className="bg-white-black text-center" id="bride">
        <h2 className="font-arabic py-4 m-0" style={{ fontSize: '2rem' }}>
          بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ
        </h2>
        <h2 className="font-esthetic py-4 m-0" style={{ fontSize: '2rem' }}>
          Assalamualaikum Warahmatullahi Wabarakatuh
        </h2>
        <p className="pb-4 px-2 m-0" style={{ fontSize: '0.95rem' }}>
          Tanpa mengurangi rasa hormat, kami mengundang Anda untuk berkenan menghadiri acara pernikahan kami:
        </p>

        <div className="overflow-x-hidden pb-4">
          <div className="position-relative">
            <div className="position-absolute" style={{ top: '0%', right: '5%' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="opacity-50 animate-love" viewBox="0 0 16 16">
                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01z" />
              </svg>
            </div>

            <div className="pb-1">
              <img
                src={groomImage}
                data-src={groomImage}
                alt={couple.namaPria}
                className="img-center-crop rounded-circle border border-3 border-light shadow my-4 mx-auto"
              />
              <h2 className="font-esthetic m-0" style={{ fontSize: '2.125rem' }}>
                {couple.namaPria}
              </h2>
              <p className="mt-3 mb-1" style={{ fontSize: '1.25rem' }}>
                Putra dari
              </p>
              <p className="mb-0" style={{ fontSize: '0.95rem' }}>
                {orangTua.pria}
              </p>
            </div>

            <div className="position-absolute" style={{ top: '90%', left: '5%' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="opacity-50 animate-love" viewBox="0 0 16 16">
                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01z" />
              </svg>
            </div>
          </div>

          <h2 className="font-esthetic mt-4" style={{ fontSize: '4.5rem' }}>
            &amp;
          </h2>

          <div className="position-relative">
            <div className="position-absolute" style={{ top: '0%', right: '5%' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="opacity-50 animate-love" viewBox="0 0 16 16">
                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01z" />
              </svg>
            </div>

            <div className="pb-1">
              <img
                src={brideImage}
                data-src={brideImage}
                alt={couple.namaWanita}
                className="img-center-crop rounded-circle border border-3 border-light shadow my-4 mx-auto"
              />
              <h2 className="font-esthetic m-0" style={{ fontSize: '2.125rem' }}>
                {couple.namaWanita}
              </h2>
              <p className="mt-3 mb-1" style={{ fontSize: '1.25rem' }}>
                Putri dari
              </p>
              <p className="mb-0" style={{ fontSize: '0.95rem' }}>
                {orangTua.wanita}
              </p>
            </div>

            <div className="position-absolute" style={{ top: '90%', left: '5%' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="opacity-50 animate-love" viewBox="0 0 16 16">
                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01z" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      <div className="svg-wrapper">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="color-theme-svg no-gap-bottom">
          <path
            fill="currentColor"
            fillOpacity="1"
            d="M0,192L40,181.3C80,171,160,149,240,149.3C320,149,400,171,480,165.3C560,160,640,128,720,128C800,128,880,160,960,186.7C1040,213,1120,235,1200,218.7C1280,203,1360,149,1400,122.7L1440,96L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z"
          />
        </svg>
      </div>
    </>
  );
}
