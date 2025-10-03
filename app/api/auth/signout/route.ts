import { NextResponse } from 'next/server';
import { getServerClient } from '@/lib/supabaseServer';

export async function POST() {
  const supabase = getServerClient();
  await supabase.auth.signOut();

  const response = new NextResponse(null, { status: 204 });
  response.cookies.set({ name: 'is_admin', value: '', path: '/', maxAge: 0 });

  return response;
}