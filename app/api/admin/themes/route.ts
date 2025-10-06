import { requireAdmin } from '@/lib/adminGuard';
import { getAdminClient } from '@/lib/supabaseAdmin';
import { NextRequest } from 'next/server';
import type { Database } from '@/types/db';
export const dynamic = 'force-dynamic';

export async function GET() {
  await requireAdmin();
  const admin = getAdminClient();
  const themesTable = 'themes' satisfies keyof Database['public']['Tables'];
  const themesQuery = admin.from(themesTable) as any;
  const { data, error } = await themesQuery
    .select('id, slug, name, status, preview_url, package_path, created_at')
    .order('created_at', { ascending: false });

  if (error) {
    return new Response(error.message, { status: 400 });
  }

  return Response.json({ items: data ?? [] });
}

export async function POST(req: NextRequest) {
  await requireAdmin();
  const admin = getAdminClient();
  const themesTable = 'themes' satisfies keyof Database['public']['Tables'];
  const themesQuery = admin.from(themesTable) as any;
  const form = await req.formData();
  const file = form.get('file') as File | null;
  const slug = String(form.get('slug') || '');
  const name = String(form.get('name') || '');
  if (!file || !slug || !name) return new Response('Missing fields', { status: 400 });

  const arrayBuffer = await file.arrayBuffer();
  const bytes = new Uint8Array(arrayBuffer);
  const ext = file.name.split('.').pop() || 'zip';
  const objectPath = `${slug}/${Date.now()}.${ext}`;

  const { data: put, error: upErr } = await admin.storage.from('themes').upload(objectPath, bytes, {
    contentType: file.type || 'application/zip',
    upsert: true,
  });
  if (upErr) return new Response(upErr.message, { status: 400 });

  admin.storage.from('themes').getPublicUrl(objectPath);

  const payload = {
    slug,
    name,
    status: 'inactive' as const,
    preview_url: null,
    package_path: put?.path ?? objectPath,
  } satisfies Database['public']['Tables']['themes']['Insert'];

  const { error: insErr } = await themesQuery.insert(payload);
  if (insErr) return new Response(insErr.message, { status: 400 });

  return new Response(null, { status: 201 });
}
