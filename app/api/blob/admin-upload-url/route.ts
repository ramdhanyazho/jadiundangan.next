import { NextResponse } from 'next/server';
import { getServerClient } from '@/lib/supabaseServer';
import { createUploadUrl } from '@/lib/vercelBlob';
import type { Profile } from '@/types/db';

export const runtime = 'edge';

export async function GET(req: Request) {
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

  const url = new URL(req.url);
  const contentType = url.searchParams.get('contentType') || undefined;

  const blobToken = process.env.BLOB_READ_WRITE_TOKEN;
  if (!blobToken) {
    return new NextResponse('Blob token missing', { status: 500 });
  }

  const uploadUrl = await createUploadUrl({
    access: 'public',
    token: blobToken,
    contentType,
  });

  return NextResponse.json({ url: uploadUrl });
}
