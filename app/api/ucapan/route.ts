import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const nama = typeof body.nama === 'string' ? body.nama.trim() : '';
    const pesan = typeof body.pesan === 'string' ? body.pesan.trim() : '';

    if (nama.length < 2 || pesan.length < 1) {
      return NextResponse.json({ ok: false, message: 'Data tidak valid.' }, { status: 400 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('[ucapan] Failed to parse request', error);
    return NextResponse.json({ ok: false, message: 'Terjadi kesalahan pada server.' }, { status: 500 });
  }
}
