import { NextResponse } from 'next/server';
import { createUploadURL } from '@vercel/blob';

import { getServerClient } from '@/lib/supabaseServer';

export const runtime = 'edge';

export async function GET(req: Request) {
  const supabase = getServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('is_admin, role')
    .eq('user_id', user.id)
    .maybeSingle();

  if (profileError) {
    return new NextResponse(profileError.message, { status: 400 });
  }

  const isAdmin = !!profile && (profile.is_admin === true || profile.role === 'admin');
  if (!isAdmin) {
    return new NextResponse('Forbidden', { status: 403 });
  }

  const url = new URL(req.url);
  const contentType = url.searchParams.get('contentType') || undefined;

  const uploadUrl = await createUploadURL({
    access: 'public',
    token: process.env.BLOB_READ_WRITE_TOKEN!,
    contentType,
  });

  return NextResponse.json({ url: uploadUrl });
}
