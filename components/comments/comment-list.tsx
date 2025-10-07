import { type Comment } from '@/lib/types';
import { formatRelativeTime } from '@/lib/utils';

interface CommentListProps {
  comments: Comment[];
}

export function CommentList({ comments }: CommentListProps) {
  if (!comments.length) {
    return <p className="text-sm text-slate-300">Belum ada ucapan. Jadilah yang pertama!</p>;
  }

  const sorted = [...comments].sort(
    (a, b) => new Date(b.waktuISO).getTime() - new Date(a.waktuISO).getTime()
  );

  return (
    <ul className="space-y-4">
      {sorted.map((comment) => (
        <li key={`${comment.nama}-${comment.waktuISO}`} className="rounded-3xl border border-white/5 bg-white/5 p-4">
          <div className="flex items-center justify-between gap-2">
            <p className="text-sm font-semibold text-white">{comment.nama}</p>
            <span className="text-xs uppercase tracking-[0.2em] text-purple-200/80">
              {formatRelativeTime(comment.waktuISO)}
            </span>
          </div>
          <p className="mt-2 text-sm text-slate-200">{comment.pesan}</p>
        </li>
      ))}
    </ul>
  );
}
