import { Josefin_Sans } from 'next/font/google';

import Cover from './sections/Cover';
import Couple from './sections/Couple';
import Event from './sections/Event';
import Gallery from './sections/Gallery';
import Story from './sections/Story';
import Wishes from './sections/Wishes';
import Gift from './sections/Gift';
import Location from './sections/Location';
import QRCodeSec from './sections/QRCode';
import Footer from './sections/Footer';
import MusicToggle from './sections/MusicToggle';

const josefin = Josefin_Sans({ subsets: ['latin'], weight: ['400', '600'], variable: '--font-josefin' });

export default function ThemeRoot({ data, config }: { data: any; config: any }) {
  const { invitation, events, media, stories, gift } = data;
  return (
    <div className={`${josefin.variable} font-sans bg-slate-50 text-gray-800`}>
      <Cover invitation={invitation} media={media} />
      <Couple invitation={invitation} media={media} />
      <Event events={events} />
      <Gallery media={media} />
      <Story stories={stories} />
      <Wishes invitation={invitation} />
      <Gift gift={gift} />
      <Location events={events} />
      <QRCodeSec slug={invitation.slug} />
      <Footer />
      <MusicToggle src={invitation.music_url} />
    </div>
  );
}
