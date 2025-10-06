'use client';

import { useCallback, useMemo, useState } from 'react';
import useSWR from 'swr';
import { Loader2, Send, Sparkles } from 'lucide-react';

import Card from '../components/Card';
import Heading from '../components/Heading';
import Section from '../components/Section';

import type { GuestRow, InvitationRow } from '@/types/db';

const fetcher = (url: string) => fetch(url).then((res) => {
  if (!res.ok) throw new Error('Failed to load wishes');
  return res.json();
});

type WishEntry = Pick<GuestRow, 'id' | 'name' | 'message' | 'created_at'>;

type WishesProps = {
  invitation: InvitationRow;
  initialEntries?: WishEntry[];
  allowSubmission?: boolean;
};

type WishesResponse = {
  entries: WishEntry[];
};

export default function Wishes({ invitation, initialEntries = [], allowSubmission = true }: WishesProps) {
  const invitationId = invitation.id;
  const canFetch = allowSubmission && Boolean(invitationId);
  const fallbackData = useMemo<WishesResponse | undefined>(
    () => (initialEntries.length ? { entries: initialEntries } : undefined),
    [initialEntries]
  );
  const {
    data,
    isLoading: swrLoading,
    mutate,
    error,
  } = useSWR<WishesResponse>(
    canFetch ? `/api/public/wishes?invitationId=${invitationId}` : null,
    fetcher,
    {
      refreshInterval: canFetch ? 30000 : 0,
      revalidateOnFocus: canFetch,
      revalidateOnReconnect: canFetch,
      fallbackData,
    }
  );

  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const isLoading = canFetch ? swrLoading : false;
  const entries = canFetch ? data?.entries ?? [] : initialEntries;

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (!canFetch) {
        setFeedback('Form ini hanya contoh untuk keperluan pratinjau.');
        return;
      }
      if (!message.trim()) {
        setFeedback('Mohon tulis ucapan terlebih dahulu.');
        return;
      }
      setSubmitting(true);
      setFeedback(null);
      try {
        const res = await fetch('/api/public/wishes', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            invitation_id: invitationId,
            name: name.trim() || 'Tamu Terkasih',
            message: message.trim(),
          }),
        });
        if (!res.ok) {
          const text = await res.text();
          throw new Error(text || 'Gagal mengirim ucapan');
        }
        setName('');
        setMessage('');
        setFeedback('Terima kasih atas ucapan Anda!');
        await mutate();
      } catch (err) {
        setFeedback(err instanceof Error ? err.message : 'Gagal mengirim ucapan');
      } finally {
        setSubmitting(false);
      }
    },
    [canFetch, invitationId, message, name, mutate]
  );

  const stateMessage = useMemo(() => {
    if (feedback) return feedback;
    if (error) return 'Gagal memuat ucapan.';
    return null;
  }, [feedback, error]);

  return (
    <Section id="wishes" className="bg-slate-50">
      <div className="mx-auto max-w-4xl">
        <Heading
          title="Ucapan & Doa"
          description="Kata-kata dan doa Anda sangat berarti bagi kami"
        />
        <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
          <Card>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="wish-name" className="text-sm font-medium text-slate-700">
                  Nama
                </label>
                <input
                  id="wish-name"
                  name="name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Isi nama Anda"
                  className="mt-1 w-full rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm text-slate-700 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-100"
                />
              </div>
              <div>
                <label htmlFor="wish-message" className="text-sm font-medium text-slate-700">
                  Ucapan
                </label>
                <textarea
                  id="wish-message"
                  name="message"
                  rows={4}
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  required
                  placeholder="Tulis ucapan terbaik Anda"
                  className="mt-1 w-full rounded-3xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-700 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-100"
                />
              </div>
              {stateMessage ? <p className="text-sm text-slate-500">{stateMessage}</p> : null}
              <button
                type="submit"
                disabled={submitting || !canFetch}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-6 py-2 text-sm font-semibold uppercase tracking-widest text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />} Kirim Ucapan
              </button>
            </form>
          </Card>
          <div className="space-y-4">
            {isLoading && !entries.length ? (
              <div className="flex min-h-[160px] items-center justify-center rounded-3xl border border-dashed border-slate-200 bg-white/70 text-slate-500">
                <Loader2 className="h-5 w-5 animate-spin" />
              </div>
            ) : null}
            {!isLoading && !entries.length ? (
              <div className="flex min-h-[160px] flex-col items-center justify-center gap-2 rounded-3xl border border-dashed border-slate-200 bg-white/70 text-slate-500">
                <Sparkles className="h-5 w-5 text-amber-400" />
                <p className="text-sm">Belum ada ucapan, jadilah yang pertama!</p>
              </div>
            ) : null}
            {entries.map((entry) => (
              <Card key={entry.id} className="bg-white/90 shadow">
                <div className="flex items-baseline justify-between gap-4">
                  <h4 className="text-base font-semibold text-slate-800">{entry.name}</h4>
                  <span className="text-xs uppercase tracking-[0.2em] text-slate-400">
                    {entry.created_at ? new Date(entry.created_at).toLocaleString('id-ID') : ''}
                  </span>
                </div>
                {entry.message ? <p className="mt-3 text-sm leading-relaxed text-slate-600">{entry.message}</p> : null}
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
