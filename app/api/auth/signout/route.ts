import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import type { Database } from '@/types/db';

export async function POST() {
  const supabase = createRouteHandlerClient<Database>({ cookies });
  await supabase.auth.signOut();

  const response = new NextResponse(null, { status: 204 });
  response.cookies.set({ name: 'is_admin', value: '', path: '/', maxAge: 0 });

  return response;
}