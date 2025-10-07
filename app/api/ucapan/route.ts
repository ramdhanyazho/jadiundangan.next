import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');
  if (!slug) {
    return NextResponse.json({ ok: false, message: 'Slug tidak ditemukan.' }, { status: 400 });
  }

  try {
    const body = await request.json();
    const nama = String(body?.nama || '').trim();
    const pesan = String(body?.pesan || '').trim();

    if (!nama || !pesan) {
      return NextResponse.json({ ok: false, message: 'Nama dan pesan wajib diisi.' }, { status: 400 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { ok: false, message: error instanceof Error ? error.message : 'Terjadi kesalahan.' },
      { status: 500 }
    );
  }
}
