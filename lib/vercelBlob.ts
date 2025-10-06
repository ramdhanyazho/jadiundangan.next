export type CreateUploadUrlOptions = {
  access: 'public' | 'private';
  token: string;
  contentType?: string;
  metadata?: Record<string, string>;
  callbackUrl?: string;
};

export async function createUploadUrl({ access, token, contentType, metadata, callbackUrl }: CreateUploadUrlOptions) {
  if (!token) {
    throw new Error('Missing blob token');
  }

  const baseUrl = process.env.VERCEL_BLOB_API_URL ?? 'https://blob.vercel-storage.com';
  const endpoint = `${baseUrl.replace(/\/$/, '')}/upload-url`;
  const payload: Record<string, unknown> = { access };
  if (contentType) payload.contentType = contentType;
  if (metadata) payload.metadata = metadata;
  if (callbackUrl) payload.callbackUrl = callbackUrl;

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${token}`,
      'x-api-version': '6',
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || 'Failed to create upload URL');
  }

  const json = (await res.json()) as { uploadUrl?: string };
  if (!json.uploadUrl) {
    throw new Error('Upload URL missing in response');
  }

  return json.uploadUrl;
}
