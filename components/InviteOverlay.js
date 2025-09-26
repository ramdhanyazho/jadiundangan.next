'use client';
import { useEffect, useState } from 'react';
export default function InviteOverlay({ groom, bride, theme='jawabiru' }){
  const [open, setOpen] = useState(false);
  useEffect(()=>{
    if(!open){ document.documentElement.classList.add('overflow-hidden'); document.body.classList.add('overflow-hidden'); }
    else { document.documentElement.classList.remove('overflow-hidden'); document.body.classList.remove('overflow-hidden'); }
  }, [open]);
  const handleOpen = () => {
    setOpen(true);
    const audio = document.getElementById('bg-music');
    if (audio && audio.play) { audio.play().catch(()=>{}); }
  };
  if (open) return null;
  return (
    <div className="fixed inset-0 z-[60] grid place-items-center bg-white/90 backdrop-blur-sm">
      <div className="text-center px-8 py-10 rounded-2xl shadow-2xl bg-white/90 border">
        <div className="text-brand-gold uppercase tracking-wider">Undangan</div>
        <h1 className="mt-2 text-3xl md:text-5xl font-display">{groom} & {bride}</h1>
        <p className="mt-3 opacity-70">Kepada Yth. Bapak/Ibu/Saudara/i</p>
        <button onClick={handleOpen} className="mt-6 px-6 py-3 rounded-xl bg-brand text-white shadow-lg hover:opacity-90">Buka Undangan</button>
      </div>
    </div>
  )
}
