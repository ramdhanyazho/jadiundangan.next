import { NextResponse } from 'next/server';

import { supabaseAdmin } from '@/lib/supabaseAdmin';

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from('themes')
    .select('slug,name')
    .eq('status', 'active')
    .order('name');

  if (error) {
    return new NextResponse(error.message, { status: 400 });
  }

  return NextResponse.json(data ?? []);
}
