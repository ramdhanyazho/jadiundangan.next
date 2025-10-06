import { NextResponse } from 'next/server';

import { getServerClient } from '@/lib/supabaseServer';

const rateLimitStore = new Map<string, number>();
const RATE_LIMIT_WINDOW = 60 * 1000;

function getClientIdentifier(request: Request) {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  return 'unknown';
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const invitationId = searchParams.get('invitationId');

  if (!invitationId) {
    return new NextResponse('Missing invitationId', { status: 400 });
  }

  const supabase = getServerClient();
  const { data, error } = await supabase
    .from('guests')
    .select('id,name,message,created_at')
    .eq('invitation_id', invitationId)
    .not('message', 'is', null)
    .order('created_at', { ascending: false })
    .limit(20);

  if (error) {
    return new NextResponse(error.message, { status: 400 });
  }

  return NextResponse.json({ entries: data ?? [] });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const invitationId = body.invitation_id as string | undefined;
    const name = (body.name as string | undefined)?.slice(0, 120) ?? 'Tamu Terkasih';
    const message = (body.message as string | undefined)?.trim();

    if (!invitationId || !message) {
      return new NextResponse('Missing invitation_id or message', { status: 400 });
    }

    const clientId = `${invitationId}:${getClientIdentifier(request)}`;
    const now = Date.now();
    const lastRequest = rateLimitStore.get(clientId) ?? 0;
    if (now - lastRequest < RATE_LIMIT_WINDOW) {
      return new NextResponse('Tunggu sebentar sebelum mengirim ucapan lagi.', { status: 429 });
    }

    const supabase = getServerClient();
    const { error } = await supabase.from('guests').insert({
      invitation_id: invitationId,
      name,
      message,
      status: 'pending',
    });

    if (error) {
      return new NextResponse(error.message, { status: 400 });
    }

    rateLimitStore.set(clientId, now);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Failed to submit wish', error);
    return new NextResponse('Invalid payload', { status: 400 });
  }
}
