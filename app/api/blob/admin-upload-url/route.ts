import { NextResponse } from 'next/server';
import { createUploadURL } from '@vercel/blob';

import { getServerClient } from '@/lib/supabaseServer';

export const runtime = 'nodejs';

export async function GET(req: Request) {
  try {
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

    const token = process.env.BLOB_READ_WRITE_TOKEN;
    if (!token) {
      return new NextResponse('Missing BLOB_READ_WRITE_TOKEN', { status: 500 });
    }

    const urlObj = new URL(req.url);
    const contentType = urlObj.searchParams.get('contentType') || 'image/png';

    const uploadUrl = await createUploadURL({
      access: 'public',
      token,
      contentType,
    });

    return NextResponse.json({ url: uploadUrl });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return new NextResponse(`Blob error: ${message}`, { status: 500 });
  }
}
