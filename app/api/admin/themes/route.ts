import { requireAdmin } from '@/lib/adminGuard';
import { NextRequest } from 'next/server';
export const dynamic = 'force-dynamic';

export async function GET() {
  const { admin } = await requireAdmin();
  const { data } = await admin
    .from('themes')
    .select('id, slug, name, status, preview_url, package_path, created_at')
    .order('created_at', { ascending: false });
  return Response.json({ items: data ?? [] });
}

export async function POST(req: NextRequest) {
  const { admin } = await requireAdmin();
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

  const { error: insErr } = await admin.from('themes').insert({
    slug,
    name,
    status: 'inactive',
    preview_url: null,
    package_path: put?.path ?? objectPath,
  });
  if (insErr) return new Response(insErr.message, { status: 400 });

  return new Response(null, { status: 201 });
}
