import { NextResponse } from 'next/server';
import { getServerClient } from '@/lib/supabaseServer';
import { createUploadUrl } from '@/lib/vercelBlob';
import type { Profile } from '@/types/db';

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

    type ProfileRoleInfo = Pick<Profile, 'is_admin' | 'role'>;

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('is_admin, role')
      .eq('user_id', user.id)
      .maybeSingle<ProfileRoleInfo>();

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

    const uploadUrl = await createUploadUrl({
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
