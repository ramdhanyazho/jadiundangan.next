import { NextResponse } from 'next/server';

interface Body {
  nama?: string;
  pesan?: string;
}

export async function POST(request: Request) {
  const data = (await request.json()) as Body;
  const nama = data?.nama?.trim();
  const pesan = data?.pesan?.trim();

  if (!nama || !pesan) {
    return NextResponse.json({ ok: false, message: 'Nama dan pesan wajib diisi.' }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}
