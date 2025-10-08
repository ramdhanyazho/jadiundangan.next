import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  let payload: { nama?: string; pesan?: string };

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON' }, { status: 400 });
  }

  if (!payload.nama || !payload.pesan) {
    return NextResponse.json(
      { ok: false, error: 'Nama dan pesan wajib diisi.' },
      { status: 400 },
    );
  }

  return NextResponse.json({ ok: true });
}
