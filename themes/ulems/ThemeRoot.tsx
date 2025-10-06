'use client';

import { useEffect, useMemo, useState } from 'react';
import { Josefin_Sans } from 'next/font/google';

import type { InvitationView } from '@/lib/invitations';
import type { ThemeConfig } from '@/types/theme';

import Cover from './sections/Cover';
import Couple from './sections/Couple';
import Event from './sections/Event';
import Gallery from './sections/Gallery';
import Story from './sections/Story';
import Wishes from './sections/Wishes';
import Gift from './sections/Gift';
import Location from './sections/Location';
import QRCode from './sections/QRCode';
import Footer from './sections/Footer';
import MusicToggle from './sections/MusicToggle';

const josefin = Josefin_Sans({ subsets: ['latin'], weight: ['400', '600'], variable: '--font-josefin-sans' });

type ThemeRootProps = {
  data: InvitationView;
  config: ThemeConfig;
  mode?: 'live' | 'preview';
};

export default function ThemeRoot({ data, config: themeConfig, mode = 'live' }: ThemeRootProps) {
  const { invitation, events, media, stories, gift, guests } = data;
  const [opened, setOpened] = useState(false);
  const [autoPlayToken, setAutoPlayToken] = useState(0);

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    if (!opened) {
      html.classList.add('overflow-hidden');
      body.classList.add('overflow-hidden');
    } else {
      html.classList.remove('overflow-hidden');
      body.classList.remove('overflow-hidden');
    }
    return () => {
      html.classList.remove('overflow-hidden');
      body.classList.remove('overflow-hidden');
    };
  }, [opened]);

  const handleOpen = () => {
    setOpened(true);
    setAutoPlayToken((prev) => prev + 1);
    const coupleSection = document.getElementById('couple');
    if (coupleSection) {
      coupleSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const backgroundStyle = useMemo(() => ({
    backgroundColor: themeConfig.palette.bg,
    color: themeConfig.palette.text,
  }), [themeConfig.palette.bg, themeConfig.palette.text]);

  const musicSrc =
    invitation.music_url ||
    'https://cdn.pixabay.com/download/audio/2022/10/24/audio_dcf8a1b0a9.mp3?filename=a-walk-in-the-park-124027.mp3';

  const initialWishes = useMemo(
    () => guests.map(({ id, name, message, created_at }) => ({ id, name, message, created_at })),
    [guests]
  );

  const allowSubmission = mode !== 'preview';

  return (
    <div className={`${josefin.className} min-h-screen`} style={backgroundStyle}>
      <Cover invitation={invitation} media={media} opened={opened} onOpen={handleOpen} />
      <Couple invitation={invitation} media={media} />
      <Event events={events} />
      <Gallery media={media} />
      <Story stories={stories} />
      <Wishes invitation={invitation} initialEntries={initialWishes} allowSubmission={allowSubmission} />
      <Gift gift={gift} />
      <Location events={events} />
      <QRCode slug={invitation.slug} />
      <Footer />
      <MusicToggle src={musicSrc} autoPlayToken={autoPlayToken} />
    </div>
  );
}
