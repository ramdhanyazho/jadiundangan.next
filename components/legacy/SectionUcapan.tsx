'use client';

import { useMemo, useState } from 'react';

import type { Comment } from '@/lib/types';

const PRESENCE_OPTIONS: Array<{ value: string; label: string }> = [
  { value: '0', label: 'Konfirmasi Presensi' },
  { value: '1', label: '✅ Datang' },
  { value: '2', label: '❌ Berhalangan' },
];

type SectionUcapanProps = {
  slug: string;
  initialComments: Comment[];
};

type SubmitState = 'idle' | 'loading' | 'success' | 'error';

type PresenceValue = 'present' | 'absent' | 'unknown';

function presenceFromSelect(value: string): PresenceValue {
  if (value === '1') return 'present';
  if (value === '2') return 'absent';
  return 'unknown';
}

function presenceToLabel(value: PresenceValue) {
  if (value === 'present') return 'Hadir';
  if (value === 'absent') return 'Berhalangan';
  return 'Belum konfirmasi';
}

function presenceIcon(value: PresenceValue) {
  if (value === 'present') return 'fa-circle-check text-success';
  if (value === 'absent') return 'fa-circle-xmark text-danger';
  return 'fa-circle-question text-secondary';
}

function formatDate(iso: string) {
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(iso));
}

export function SectionUcapan({ slug, initialComments }: SectionUcapanProps) {
  const [name, setName] = useState('');
  const [presence, setPresence] = useState('0');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<SubmitState>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const [comments, setComments] = useState(() => initialComments);
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});
  const [likeCounts, setLikeCounts] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    initialComments.forEach((comment) => {
      initial[comment.id] = comment.likes ?? 0;
    });
    return initial;
  });

  const commentCount = useMemo(() => comments.length, [comments]);

  const handleSubmit = async () => {
    if (status === 'loading') return;
    if (name.trim().length < 2) {
      setStatus('error');
      setStatusMessage('Nama minimal 2 karakter.');
      return;
    }
    if (message.trim().length < 1) {
      setStatus('error');
      setStatusMessage('Ucapan tidak boleh kosong.');
      return;
    }

    setStatus('loading');
    setStatusMessage('');
    try {
      const response = await fetch('/api/ucapan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nama: name.trim(), pesan: message.trim(), slug, presence }),
      });

      if (!response.ok) {
        throw new Error('Gagal mengirim ucapan.');
      }

      const now = new Date().toISOString();
      const presenceValue = presenceFromSelect(presence);
      const newComment: Comment = {
        id: `${now}-${name.trim()}`,
        nama: name.trim(),
        pesan: message.trim(),
        waktuISO: now,
        presence: presenceValue,
        likes: 0,
      };

      setComments((prev) => [newComment, ...prev]);
      setLikeCounts((prev) => ({ ...prev, [newComment.id]: 0 }));
      setStatus('success');
      setStatusMessage('Terima kasih! Ucapan Anda berhasil dikirim.');
      setName('');
      setPresence('0');
      setMessage('');
    } catch (error) {
      console.error(error);
      setStatus('error');
      setStatusMessage('Maaf, terjadi kesalahan. Mohon coba lagi.');
    }
  };

  const toggleLike = (comment: Comment) => {
    setLikedMap((prev) => {
      const key = comment.id;
      const nextLiked = !prev[key];
      setLikeCounts((countPrev) => {
        const current = countPrev[key] ?? comment.likes ?? 0;
        const nextCount = Math.max(0, current + (nextLiked ? 1 : -1));
        return { ...countPrev, [key]: nextCount };
      });
      return { ...prev, [key]: nextLiked };
    });
  };

  return (
    <section className="bg-light-dark my-0 pb-0 pt-3" id="comment">
      <div className="container">
        <div className="border rounded-5 shadow p-3 mb-2">
          <h2 className="font-esthetic text-center mt-2 mb-4" style={{ fontSize: '2.25rem' }}>
            Ucapan &amp; Doa
          </h2>

          <div className="mb-3">
            <label htmlFor="form-name" className="form-label my-1">
              <i className="fa-solid fa-person me-2" />Nama
            </label>
            <input
              id="form-name"
              type="text"
              className="form-control shadow-sm rounded-4"
              minLength={2}
              maxLength={50}
              placeholder="Isikan Nama Anda"
              autoComplete="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="form-presence" className="form-label my-1">
              <i className="fa-solid fa-person-circle-question me-2" />Presensi
            </label>
            <select
              id="form-presence"
              className="form-select shadow-sm rounded-4"
              value={presence}
              onChange={(event) => setPresence(event.target.value)}
            >
              {PRESENCE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {status !== 'idle' && statusMessage ? (
            <div
              className={`alert rounded-4 ${status === 'success' ? 'alert-success' : status === 'loading' ? 'alert-info' : 'alert-danger'}`}
              role="status"
            >
              {statusMessage}
            </div>
          ) : null}

          <div className="d-block mb-3">
            <label htmlFor="form-comment" className="form-label my-1">
              <i className="fa-solid fa-comment me-2" />Ucapan &amp; Doa
            </label>
            <div className="position-relative">
              <textarea
                id="form-comment"
                className="form-control shadow-sm rounded-4"
                rows={4}
                minLength={1}
                maxLength={1000}
                placeholder="Tulis Ucapan dan Doa"
                autoComplete="off"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
              />
            </div>
          </div>

          <div className="d-grid">
            <button
              type="button"
              className="btn btn-primary btn-sm rounded-4 shadow m-1"
              onClick={handleSubmit}
              disabled={status === 'loading'}
            >
              <i className="fa-solid fa-paper-plane me-2" />
              {status === 'loading' ? 'Sending...' : 'Send'}
            </button>
          </div>
        </div>

        <div className="py-3" id="comments" data-loading="false">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <p className="m-0" style={{ fontSize: '0.95rem' }}>
              <i className="fa-solid fa-comments me-2" />{commentCount} Ucapan
            </p>
          </div>

          {comments.length === 0 ? (
            <div className="bg-theme-auto shadow p-3 rounded-4 text-center">
              <p className="m-0" style={{ fontSize: '0.95rem' }}>
                Jadilah yang pertama mengirimkan ucapan terbaik untuk kami.
              </p>
            </div>
          ) : (
            comments.map((comment) => {
              const presenceValue: PresenceValue = comment.presence ?? 'unknown';
              const liked = likedMap[comment.id] ?? false;
              const count = likeCounts[comment.id] ?? comment.likes ?? 0;

              return (
                <div key={comment.id} className="bg-theme-auto shadow p-3 mx-0 mt-0 mb-3 rounded-4 comment-card">
                  <div className="d-flex justify-content-between align-items-center">
                    <p className="text-theme-auto text-truncate m-0 p-0" style={{ fontSize: '0.95rem' }}>
                      <strong className="me-1">{comment.nama}</strong>
                      <i className={`fa-solid ${presenceIcon(presenceValue)} ms-1`} />
                    </p>
                    <small className="text-theme-auto m-0 p-0" style={{ fontSize: '0.75rem' }}>
                      {formatDate(comment.waktuISO)}
                    </small>
                  </div>
                  <hr className="my-1" />
                  <p className="text-theme-auto my-1 mx-0 p-0 comment-content" style={{ fontSize: '0.95rem' }}>
                    {comment.pesan}
                  </p>
                  <p className="text-theme-auto mb-1" style={{ fontSize: '0.75rem' }}>
                    Status: {presenceToLabel(presenceValue)}
                  </p>
                  <div className="d-flex justify-content-end align-items-center comment-actions">
                    <button
                      type="button"
                      className={`btn btn-sm btn-outline-auto rounded-3 p-0 shadow-sm d-flex align-items-center like-button ${liked ? 'active' : ''}`}
                      onClick={() => toggleLike(comment)}
                    >
                      <span className="like-count my-0 mx-2">{count}</span>
                      <i className={`me-2 ${liked ? 'fa-solid fa-heart text-danger' : 'fa-regular fa-heart'}`} />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}
