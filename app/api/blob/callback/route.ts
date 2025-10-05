import { NextRequest, NextResponse } from 'next/server';
import { handleUpload } from '@vercel/blob';
import { createClient } from '@supabase/supabase-js';

import type { Database } from '@/types/db';

export const runtime = 'edge';

type UploadMetadata = {
  invitation_id?: string;
  media_type?: 'photo' | 'video';
  owner_user_id?: string;
  original_name?: string;
};

const admin = () =>
  createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: { autoRefreshToken: false, persistSession: false },
    }
  );

export async function POST(req: NextRequest) {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) {
    return new NextResponse('Blob token missing', { status: 500 });
  }

  let completedPayload: { blob?: { url: string }; tokenPayload?: string | null } | null = null;
  let metadata: UploadMetadata | null = null;

  const body = (await req.json().catch(() => null)) as Record<string, unknown> | null;
  if (!body) {
    return new NextResponse('Invalid callback', { status: 400 });
  }

  await handleUpload({
    token,
    request: req,
    body,
    onBeforeGenerateToken: async () => ({}),
    onUploadCompleted: async (payload) => {
      completedPayload = payload;
      if (payload.tokenPayload) {
        try {
          metadata = JSON.parse(payload.tokenPayload) as UploadMetadata;
        } catch (error) {
          console.error('[blob/callback] failed to parse tokenPayload', error);
        }
      }
        if (!metadata && body && typeof body === 'object' && 'metadata' in body) {
          const raw = (body as { metadata?: UploadMetadata }).metadata;
          if (raw) {
            metadata = raw;
          }
        }
    },
  }).catch((error) => {
    console.error('[blob/callback] handleUpload failed', error);
  });

  // payload should be assigned in onUploadCompleted
  const payload = completedPayload;
  if (!payload?.blob || !metadata?.invitation_id || !metadata.media_type || !metadata.owner_user_id) {
    return new NextResponse('Invalid callback payload', { status: 400 });
  }

  const supa = admin();
  const { data: owns } = await supa
    .from('invitations')
    .select('id')
    .eq('id', metadata.invitation_id)
    .eq('user_id', metadata.owner_user_id)
    .maybeSingle();

  if (!owns) {
    return new NextResponse('Forbidden', { status: 403 });
  }

  const { error } = await supa.from('media').insert({
    invitation_id: metadata.invitation_id,
    type: metadata.media_type,
    url: payload.blob.url,
    caption: metadata.original_name,
    sort_index: 0,
  });

  if (error) {
    console.error('[blob/callback] insert failed', error);
    return new NextResponse(error.message, { status: 400 });
  }

  return NextResponse.json({ ok: true, url: payload.blob.url });
}
