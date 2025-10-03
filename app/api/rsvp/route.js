import { NextResponse } from 'next/server';
import { getServerClient } from '@/lib/supabaseServer';

export async function POST(request){
  try {
    const body = await request.json();
    const payload = {
      invitation_id: body.invitation_id,
      name: body.name,
      status: body.status || 'pending',
      message: body.message || null,
    };

    if (!payload.invitation_id || !payload.name) {
      return new NextResponse('Missing invitation_id or name', { status: 400 });
    }

    const supabase = getServerClient();
    const { error } = await supabase.from('guests').insert(payload);

    if (error) {
      return new NextResponse(error.message, { status: 400 });
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error('Invalid RSVP payload', e);
    return new NextResponse('Invalid payload', { status: 400 });
  }
}
