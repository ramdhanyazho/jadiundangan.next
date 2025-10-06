'use client';
import { useEffect, useRef, useState } from 'react';

export default function MusicToggle({ src }: { src?: string | null }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.play().catch(() => setPlaying(false));
    } else {
      audio.pause();
    }
  }, [playing]);

  if (!src) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        type="button"
        onClick={() => setPlaying((prev) => !prev)}
        className="rounded-full bg-sky-500 px-4 py-2 text-sm font-semibold text-white shadow"
      >
        {playing ? 'Hentikan Musik' : 'Putar Musik'}
      </button>
      <audio ref={audioRef} loop src={src} />
    </div>
  );
}
