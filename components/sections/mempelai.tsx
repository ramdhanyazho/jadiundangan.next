import Image from 'next/image';

import { type Couple, type Parents } from '@/lib/types';
import { Card, CardContent, CardTitle } from '@/components/ui/card';

interface MempelaiSectionProps {
  couple: Couple;
  orangTua: Parents;
}

export function MempelaiSection({ couple, orangTua }: MempelaiSectionProps) {
  const coverUrl =
    couple.fotoCoverUrl ||
    'https://images.unsplash.com/photo-1472417583565-62e7bdeda490?auto=format&fit=crop&w=800&q=80';
  return (
    <section id="mempelai" aria-labelledby="mempelai-title" className="space-y-8">
      <div className="space-y-2">
        <h2 id="mempelai-title" className="text-2xl font-semibold text-white">
          Mempelai
        </h2>
        <p className="text-sm text-slate-300">
          Dengan segala kerendahan hati dan rasa syukur, kami mengundang Bapak/Ibu/Saudara/i untuk hadir dalam momen sakral
          kami.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-white/5 bg-white/5">
          <CardContent className="flex items-center gap-4">
            <div className="relative h-20 w-20 overflow-hidden rounded-2xl border border-white/20">
              <Image src={coverUrl} alt={couple.namaPria} fill className="object-cover" />
            </div>
            <div className="space-y-2">
              <CardTitle className="text-xl">{couple.namaPria}</CardTitle>
              <p className="text-sm text-slate-300">Putra dari {orangTua.pria}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-white/5 bg-white/5">
          <CardContent className="flex items-center gap-4">
            <div className="relative h-20 w-20 overflow-hidden rounded-2xl border border-white/20">
              <Image src={coverUrl} alt={couple.namaWanita} fill className="object-cover" />
            </div>
            <div className="space-y-2">
              <CardTitle className="text-xl">{couple.namaWanita}</CardTitle>
              <p className="text-sm text-slate-300">Putri dari {orangTua.wanita}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
