import { NextResponse } from 'next/server';
import { getAdminClient } from '@/lib/adminClient';
export async function POST(request){
  try {
    const body = await request.json();
    const payload = { invitation_id: body.invitation_id, name: body.name, status: body.status || 'pending', message: body.message || null };
    const supabase = getAdminClient();
    const { error } = await supabase.from('guests').insert(payload);
    if (error) return new NextResponse(error.message, { status: 400 });
    return NextResponse.json({ ok: true });
  } catch (e) {
    return new NextResponse('Invalid payload', { status: 400 });
  }
}
