const required = ['NEXT_PUBLIC_SUPABASE_URL', 'NEXT_PUBLIC_SUPABASE_ANON_KEY'];
for (const k of required) {
  if (!process.env[k]) {
    console.warn(`⚠️ Missing env: ${k}`);
  }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { remotePatterns: [{ protocol: 'https', hostname: '**' }, { protocol: 'http', hostname: '**' }] },
};
export default nextConfig;
