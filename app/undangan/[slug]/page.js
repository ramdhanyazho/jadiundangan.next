import { cookies } from 'next/headers';
import { getServerClient } from '@/lib/supabaseServer';
import InviteOverlay from '@/components/InviteOverlay';
import Hero from '@/components/Hero';
import EventSection from '@/components/EventSection';
import Gallery from '@/components/Gallery';
import OurStory from '@/components/OurStory';
import Gifts from '@/components/Gifts';
import RSVP from '@/components/RSVP';
import RSVPList from '@/components/RSVPList';
import Footer from '@/components/Footer';
import TrackVisit from '@/components/TrackVisit';
import { notFound } from 'next/navigation';

export const revalidate = 0;

export default async function Undangan({ params }){
  const { slug } = params;
  const supabase = getServerClient(cookies());
  const { data: invitation, error } = await supabase.from('invitations').select('*').eq('slug', slug).eq('is_published', true).single();
  if (error || !invitation) return notFound();
  const [{ data: events }, { data: photos }, { data: gifts }, { data: stories }, { data: rsvps }] = await Promise.all([
    supabase.from('events').select('*').eq('invitation_id', invitation.id).order('date', { ascending: true }),
    supabase.from('media').select('*').eq('invitation_id', invitation.id).eq('type','photo').order('sort_index', { ascending:true }),
    supabase.from('gifts').select('*').eq('invitation_id', invitation.id),
    supabase.from('stories').select('*').eq('invitation_id', invitation.id).order('sort_index', { ascending:true }),
    supabase.from('guests').select('*').eq('invitation_id', invitation.id).order('created_at', { ascending:false }).limit(20)
  ]);
  return (
    <main>
      <TrackVisit invitationId={invitation.id} />
      <InviteOverlay groom={invitation.groom_name} bride={invitation.bride_name} theme={invitation.theme_slug || 'jawabiru'} />
      <Hero groom={invitation.groom_name} bride={invitation.bride_name} date_display={invitation.date_display} theme={invitation.theme_slug || 'jawabiru'} cover_photo_url={invitation.cover_photo_url} music_url={invitation.music_url} />
      <section className="section container-narrow"><div className="card"><h2 className="text-2xl font-bold">Assalamu’alaikum Warahmatullahi Wabarakatuh</h2><p className="mt-3 opacity-80">Dengan memohon rahmat Allah SWT, kami bermaksud mengundang Bapak/Ibu/Saudara/i untuk menghadiri pernikahan kami.</p></div></section>
      <OurStory stories={stories || []} />
      <EventSection events={events || []} />
      <Gallery photos={photos || []} />
      <Gifts gifts={gifts || []} />
      <RSVP invitationId={invitation.id} />
      <RSVPList entries={rsvps || []} />
      <Footer />
    </main>
  )
}
