'use client';

import { useEffect, useRef, useState } from 'react';
import { Music2, PauseCircle } from 'lucide-react';

interface MusicToggleProps {
  src: string;
  autoPlayToken: number;
}

export default function MusicToggle({ src, autoPlayToken }: MusicToggleProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [enabled, setEnabled] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const stored = window.localStorage.getItem('ulems-music-preference');
    if (stored === 'on') {
      setEnabled(true);
    }
    setReady(true);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !ready) return;

    audio.muted = false;
    audio.loop = true;

    if (enabled) {
      audio
        .play()
        .then(() => {
          window.localStorage.setItem('ulems-music-preference', 'on');
        })
        .catch((error) => {
          console.warn('Failed to autoplay music', error);
        });
    } else {
      audio.pause();
      window.localStorage.setItem('ulems-music-preference', 'off');
    }
  }, [enabled, ready]);

  useEffect(() => {
    if (autoPlayToken > 0 && ready) {
      setEnabled(true);
    }
  }, [autoPlayToken, ready]);

  return (
    <>
      <audio ref={audioRef} src={src} preload="auto" />
      <div className="pointer-events-none fixed bottom-6 right-6 z-50 flex items-center justify-end">
        <button
          type="button"
          onClick={() => setEnabled((value) => !value)}
          className="pointer-events-auto inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white shadow-lg transition hover:bg-slate-700"
        >
          {enabled ? <PauseCircle className="h-5 w-5" /> : <Music2 className="h-5 w-5" />}
          {enabled ? 'Matikan Musik' : 'Putar Musik'}
        </button>
      </div>
    </>
  );
}
