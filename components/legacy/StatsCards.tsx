import type { InvitationStats } from '@/lib/types';

export function StatsCards({ stats }: { stats: InvitationStats }) {
  const items = [
    { label: 'Comments', value: stats.comments },
    { label: 'Present', value: stats.present },
    { label: 'Absent', value: stats.absent },
    { label: 'Likes', value: stats.likes },
  ];

  return (
    <div className="row g-3">
      {items.map((item) => (
        <div key={item.label} className="col-6">
          <div className="bg-theme-auto text-center rounded-4 shadow-sm p-3 h-100">
            <p className="m-0" style={{ fontSize: '2rem' }}>
              {item.value.toLocaleString('id-ID')}
            </p>
            <p className="m-0 text-uppercase" style={{ fontSize: '0.75rem', letterSpacing: '0.08em' }}>
              {item.label}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
