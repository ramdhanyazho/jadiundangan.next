import { Heart, MessageCircle, ThumbsDown, Users } from 'lucide-react';

import { type Stats } from '@/lib/types';
import { Card } from '@/components/ui/card';

interface StatsCardsProps {
  stats: Stats;
}

const items = [
  {
    key: 'comments' as const,
    label: 'Comments',
    icon: MessageCircle,
  },
  {
    key: 'present' as const,
    label: 'Hadir',
    icon: Users,
  },
  {
    key: 'absent' as const,
    label: 'Berhalangan',
    icon: ThumbsDown,
  },
  {
    key: 'likes' as const,
    label: 'Likes',
    icon: Heart,
  },
];

export function StatsCards({ stats }: StatsCardsProps) {
  return (
    <section className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4" aria-label="Statistik undangan">
      {items.map(({ key, label, icon: Icon }) => (
        <Card
          key={key}
          className="flex h-[150px] flex-col justify-between bg-gradient-to-br from-purple-600/90 to-purple-700/80 p-6 text-white"
        >
          <div className="text-sm font-medium uppercase tracking-[0.2em] text-purple-100/90">{label}</div>
          <div className="flex items-end justify-between gap-4">
            <span className="text-3xl font-semibold leading-none sm:text-4xl">{stats[key]}</span>
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15">
              <Icon className="h-5 w-5" aria-hidden />
            </span>
          </div>
        </Card>
      ))}
    </section>
  );
}
