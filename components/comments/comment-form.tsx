'use client';

import { useState, type FormEvent } from 'react';

import { type Comment } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Alert } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface CommentFormProps {
  slug: string;
  onSubmitted?: (comment: Comment) => void;
}

export function CommentForm({ slug, onSubmitted }: CommentFormProps) {
  const [nama, setNama] = useState('');
  const [pesan, setPesan] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!nama.trim() || !pesan.trim()) {
      setErrorMessage('Nama dan pesan wajib diisi.');
      setStatus('error');
      return;
    }
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch(`/api/ucapan?slug=${slug}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nama, pesan }),
      });
      if (!response.ok) {
        throw new Error('Gagal mengirim ucapan.');
      }
      setStatus('success');
      const newComment: Comment = {
        id: typeof crypto !== 'undefined' && 'randomUUID' in crypto
          ? crypto.randomUUID()
          : `${Date.now()}`,
        nama,
        pesan,
        waktuISO: new Date().toISOString(),
      };
      onSubmitted?.(newComment);
      setNama('');
      setPesan('');
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Terjadi kesalahan.');
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" aria-label="Form ucapan">
      <div className="grid gap-3">
        <label className="space-y-2 text-sm text-slate-300" htmlFor="nama">
          Nama
          <Input
            id="nama"
            name="nama"
            placeholder="Tuliskan nama Anda"
            value={nama}
            onChange={(event) => setNama(event.target.value)}
            autoComplete="name"
            required
          />
        </label>
        <label className="space-y-2 text-sm text-slate-300" htmlFor="pesan">
          Pesan
          <Textarea
            id="pesan"
            name="pesan"
            placeholder="Tulis doa dan ucapan hangat"
            value={pesan}
            onChange={(event) => setPesan(event.target.value)}
            required
          />
        </label>
      </div>
      {status === 'error' && errorMessage ? (
        <Alert variant="error" role="alert">
          {errorMessage}
        </Alert>
      ) : null}
      {status === 'success' ? <Alert variant="success">Ucapan berhasil dikirim. Terima kasih!</Alert> : null}
      <Button type="submit" className="w-full" disabled={status === 'loading'}>
        {status === 'loading' ? 'Mengirim…' : 'Kirim Ucapan'}
      </Button>
    </form>
  );
}
