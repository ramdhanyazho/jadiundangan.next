'use client';

import { useState } from 'react';

import { type Comment } from '@/lib/types';
import { CommentForm } from '@/components/comments/comment-form';
import { CommentList } from '@/components/comments/comment-list';

interface UcapanSectionProps {
  slug: string;
  initialComments: Comment[];
}

export function UcapanSection({ slug, initialComments }: UcapanSectionProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments);

  const handleSubmitted = (comment: Comment) => {
    setComments((prev) => [comment, ...prev]);
  };

  return (
    <section id="ucapan" aria-labelledby="ucapan-title" className="space-y-8">
      <div className="space-y-2">
        <h2 id="ucapan-title" className="text-2xl font-semibold text-white">
          Ucapan &amp; Doa
        </h2>
        <p className="text-sm text-slate-300">
          Tinggalkan pesan hangat untuk pasangan kami. Ucapan Anda sangat berarti.
        </p>
      </div>
      <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div className="rounded-3xl border border-white/5 bg-white/5 p-6">
          <CommentForm slug={slug} onSubmitted={handleSubmitted} />
        </div>
        <div className="rounded-3xl border border-white/5 bg-white/5 p-6">
          <h3 className="text-lg font-semibold text-white">Ucapan Terbaru</h3>
          <div className="mt-4 max-h-[320px] space-y-4 overflow-y-auto pr-1">
            <CommentList comments={comments} />
          </div>
        </div>
      </div>
    </section>
  );
}
