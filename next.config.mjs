const required = ['NEXT_PUBLIC_SUPABASE_URL', 'NEXT_PUBLIC_SUPABASE_ANON_KEY'];
for (const k of required) {
  if (!process.env[k]) {
    console.warn(`⚠️ Missing env: ${k}`);
  }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'picsum.photos' },
      { protocol: 'https', hostname: 'placehold.co' },
      { protocol: 'https', hostname: 'res.cloudinary.com' },
    ],
  },
  env: {
    NEXT_PUBLIC_SITE_URL:
      process.env.NEXT_PUBLIC_SITE_URL ||
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000'),
  },
  async redirects() {
    return [{ source: '/u/:slug', destination: '/undangan/:slug', permanent: true }];
  },
};
export default nextConfig;
