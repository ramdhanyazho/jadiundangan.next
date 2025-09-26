import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';
export async function POST(request){
  try {
    const body = await request.json();
    const { invitation_id } = body || {};
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || '0.0.0.0';
    const ua = request.headers.get('user-agent') || '';
    if (!invitation_id) return new NextResponse('Missing invitation_id', { status: 400 });
    await supabase.from('visit_logs').insert({ invitation_id, ip, ua });
    await supabase.rpc('increment_view_count', { inv_id: invitation_id }).catch(()=>{});
    return NextResponse.json({ ok: true });
  } catch (e) {
    return new NextResponse('Invalid', { status: 400 });
  }
}
