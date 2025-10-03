import { NextResponse } from 'next/server';
import { getServerClient } from '@/lib/supabaseServer';

export async function POST(request){
  try {
    const body = await request.json();
    const { invitation_id } = body || {};
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || '0.0.0.0';
    const ua = request.headers.get('user-agent') || '';

    if (!invitation_id) {
      return new NextResponse('Missing invitation_id', { status: 400 });
    }

    const supabase = getServerClient();

    const { error } = await supabase.from('visit_logs').insert({ invitation_id, ip, ua });
    if (error) {
      console.error('Failed to record visit log', error);
      return new NextResponse(error.message, { status: 500 });
    }

    await supabase.rpc('increment_view_count', { inv_id: invitation_id }).catch(()=>{});

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error('Invalid track visit payload', e);
    return new NextResponse('Invalid', { status: 400 });
  }
}
