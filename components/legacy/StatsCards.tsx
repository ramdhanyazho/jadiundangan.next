import type { Stats } from '@/lib/types';

const ITEMS: Array<{ key: keyof Stats; label: string; icon: string }> = [
  { key: 'comments', label: 'Comments', icon: 'fa-comments' },
  { key: 'present', label: 'Present', icon: 'fa-circle-check' },
  { key: 'absent', label: 'Absent', icon: 'fa-circle-xmark' },
  { key: 'likes', label: 'Likes', icon: 'fa-heart' },
];

type StatsCardsProps = {
  stats: Stats;
};

export function StatsCards({ stats }: StatsCardsProps) {
  return (
    <section className="bg-white-black py-4">
      <div className="container">
        <div className="row g-3">
          {ITEMS.map((item) => (
            <div key={item.key} className="col-6">
              <div className="bg-theme-auto rounded-4 shadow-sm p-3 text-center h-100">
                <i className={`fa-solid ${item.icon} mb-2`} style={{ fontSize: '1.25rem' }} />
                <p className="m-0" style={{ fontSize: '0.85rem' }}>
                  {item.label}
                </p>
                <p className="fw-bold m-0" style={{ fontSize: '1.5rem' }}>
                  {new Intl.NumberFormat('id-ID').format(stats[item.key])}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
