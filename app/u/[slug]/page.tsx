import { notFound } from 'next/navigation';

import dynamic from 'next/dynamic';

import InviteOverlay from '@/components/InviteOverlay';
import Hero from '@/components/Hero';
import EventSection from '@/components/EventSection';
import GallerySection from '@/components/Gallery';
import OurStory from '@/components/OurStory';
import GiftsSection from '@/components/Gifts';
import RSVP from '@/components/RSVP';
import RSVPList from '@/components/RSVPList';
import FooterBase from '@/components/Footer';
import TrackVisit from '@/components/TrackVisit';
import { getInvitationView } from '@/lib/invitations';
import ulemsConfig from '@/themes/ulems/theme.config';

const UlemsTheme = dynamic(() => import('@/themes/ulems/ThemeRoot'));

function DefaultTheme({
  data,
}: {
  data: NonNullable<Awaited<ReturnType<typeof getInvitationView>>>;
}) {
  const { invitation, events, media, stories, gift, guests } = data;
  const photos = media.filter((item) => item.type === 'photo');
  const gifts = gift ? [gift] : [];

  return (
    <main>
      <TrackVisit invitationId={invitation.id} />
      <InviteOverlay groom={invitation.groom_name} bride={invitation.bride_name} theme={invitation.theme_slug || 'jawabiru'} />
      <Hero
        groom={invitation.groom_name}
        bride={invitation.bride_name}
        date_display={invitation.date_display}
        theme={invitation.theme_slug || 'jawabiru'}
        cover_photo_url={invitation.cover_photo_url}
        music_url={invitation.music_url}
      />
      <section className="section container-narrow">
        <div className="card">
          <h2 className="text-2xl font-bold">Assalamu’alaikum Warahmatullahi Wabarakatuh</h2>
          <p className="mt-3 opacity-80">
            Dengan memohon rahmat Allah SWT, kami bermaksud mengundang Bapak/Ibu/Saudara/i untuk menghadiri pernikahan kami.
          </p>
        </div>
      </section>
      <OurStory stories={stories || []} />
      <EventSection events={events || []} />
      <GallerySection photos={photos || []} />
      <GiftsSection gifts={gifts} />
      <RSVP invitationId={invitation.id} />
      <RSVPList entries={guests || []} />
      <FooterBase />
    </main>
  );
}

export default async function Page({ params }: { params: { slug: string } }) {
  const data = await getInvitationView(params.slug);

  if (!data) {
    return notFound();
  }

  if (data.invitation.theme_slug === 'ulems') {
    return <UlemsTheme data={data} config={ulemsConfig} />;
  }

  return <DefaultTheme data={data} />;
}
