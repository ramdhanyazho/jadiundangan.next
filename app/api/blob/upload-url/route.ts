import { NextRequest, NextResponse } from 'next/server';

import { getServerClient } from '@/lib/supabaseServer';
import { createUploadUrl } from '@/lib/vercelBlob';
import type { Profile } from '@/types/db';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const invitationId = url.searchParams.get('invitation_id');
  const type = url.searchParams.get('type');
  const filename = url.searchParams.get('filename') || 'upload.bin';
  const contentType = url.searchParams.get('contentType') || undefined;

  if (!invitationId || !type) {
    return new NextResponse('Missing params', { status: 400 });
  }
  if (!['photo', 'video'].includes(type)) {
    return new NextResponse('Invalid type', { status: 400 });
  }

  const supabase = getServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  if (invitationId === 'brand') {
    type ProfileRoleInfo = Pick<Profile, 'is_admin' | 'role'>;

    const { data: profile } = await supabase
      .from('profiles')
      .select('is_admin, role')
      .eq('user_id', user.id)
      .maybeSingle<ProfileRoleInfo>();

    const isAdmin = !!profile && (profile.is_admin === true || profile.role === 'admin');
    if (!isAdmin) {
      return new NextResponse('Forbidden', { status: 403 });
    }
  } else {
    const { data: owns } = await supabase
      .from('invitations')
      .select('id')
      .eq('id', invitationId)
      .eq('user_id', user.id)
      .maybeSingle();

    if (!owns) {
      return new NextResponse('Forbidden', { status: 403 });
    }
  }

  const blobToken = process.env.BLOB_READ_WRITE_TOKEN;
  if (!blobToken) {
    return new NextResponse('Blob token missing', { status: 500 });
  }

  try {
    const uploadUrl = await createUploadUrl({
      access: 'public',
      token: blobToken,
      contentType,
      metadata: {
        invitation_id: invitationId,
        media_type: type,
        owner_user_id: user.id,
        original_name: filename,
      },
      callbackUrl: `${url.origin}/api/blob/callback`,
    });

    return NextResponse.json({ url: uploadUrl });
  } catch (error) {
    console.error('[blob/upload-url]', error);
    return new NextResponse('Failed to create upload URL', { status: 500 });
  }
}
