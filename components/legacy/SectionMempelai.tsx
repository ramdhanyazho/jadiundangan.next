import Image from 'next/image';
import type { InvitationCouple } from '@/lib/types';

export function SectionMempelai({ couple }: { couple: InvitationCouple }) {
  return (
    <section className="bg-white-black text-center" id="mempelai" data-section-id="mempelai">
      <div className="container py-5">
        <h2 className="font-arabic py-2 m-0" style={{ fontSize: '2rem' }}>
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
            <div className="pb-1">
              <Image
                src={couple.groom.image}
                alt={couple.groom.name}
                width={208}
                height={208}
                className="img-center-crop rounded-circle border border-3 border-light shadow my-4 mx-auto cursor-pointer"
                data-gallery-image
                data-full={couple.groom.image}
              />
              <h3 className="font-esthetic m-0" style={{ fontSize: '2.125rem' }}>
                {couple.groom.name}
              </h3>
              <p className="mt-3 mb-1" style={{ fontSize: '1.25rem' }}>
                {couple.groom.role}
              </p>
              {couple.groom.parents.map((parent) => (
                <p key={parent} className="mb-0" style={{ fontSize: '0.95rem' }}>
                  {parent}
                </p>
              ))}
            </div>
          </div>
          <h2 className="font-esthetic mt-4" style={{ fontSize: '4.5rem' }}>
            &
          </h2>
          <div className="position-relative">
            <div className="pb-1">
              <Image
                src={couple.bride.image}
                alt={couple.bride.name}
                width={208}
                height={208}
                className="img-center-crop rounded-circle border border-3 border-light shadow my-4 mx-auto cursor-pointer"
                data-gallery-image
                data-full={couple.bride.image}
              />
              <h3 className="font-esthetic m-0" style={{ fontSize: '2.125rem' }}>
                {couple.bride.name}
              </h3>
              <p className="mt-3 mb-1" style={{ fontSize: '1.25rem' }}>
                {couple.bride.role}
              </p>
              {couple.bride.parents.map((parent) => (
                <p key={parent} className="mb-0" style={{ fontSize: '0.95rem' }}>
                  {parent}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
