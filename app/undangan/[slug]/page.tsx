import { notFound } from 'next/navigation';
import { Hero } from '@/components/legacy/Hero';
import { SectionGaleri } from '@/components/legacy/SectionGaleri';
import { SectionMempelai } from '@/components/legacy/SectionMempelai';
import { SectionTanggal } from '@/components/legacy/SectionTanggal';
import { SectionUcapan } from '@/components/legacy/SectionUcapan';
import { Tabbar } from '@/components/legacy/Tabbar';
import { getInvitation } from './data';

interface PageProps {
  params: {
    slug: string;
  };
}

export default function InvitationPage({ params }: PageProps) {
  const invitation = getInvitation(params.slug);

  if (!invitation) {
    notFound();
  }

  return (
    <div id="undangan4x" className="u4x bg-white-black position-relative" data-section-id="root">
      <main className="position-relative pb-5 mb-5" data-bs-spy="scroll" data-bs-target="#navbar-menu" data-bs-smooth-scroll="true">
        <Hero hero={invitation.hero} />
        <SectionMempelai couple={invitation.couple} />
        <SectionTanggal
          schedules={invitation.schedules}
          headline={invitation.headline}
          description={invitation.description}
          dressCode={invitation.dressCode}
          mapUrl={invitation.mapUrl}
          venue={invitation.venue}
        />
        <SectionGaleri gallery={invitation.gallery} />
        <SectionUcapan stats={invitation.stats} messages={invitation.messages} />
      </main>
      <Tabbar />
      <div
        data-modal="gallery"
        className="modal fade show"
        aria-hidden="true"
        hidden
        tabIndex={-1}
        role="dialog"
      >
        <div className="d-flex justify-content-center align-items-center position-fixed top-0 start-0 w-100 h-100 bg-overlay-auto">
          <div className="position-relative p-3 bg-white-black rounded-4 shadow-lg">
            <button
              type="button"
              className="btn btn-outline-auto btn-sm rounded-pill position-absolute top-0 end-0 m-3"
              data-modal-close
            >
              Tutup
            </button>
            <img src="" alt="" className="rounded-4 shadow" width={320} height={320} />
          </div>
        </div>
      </div>
    </div>
  );
}
