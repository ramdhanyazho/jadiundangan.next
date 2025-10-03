import LoginClient from './ui';
import { getPublicSupabaseEnv } from '@/lib/publicEnv';

export default function LoginPage() {
  const { url, anon, hasUrl, hasAnon } = getPublicSupabaseEnv();

  return (
    <LoginClient
      supabaseUrl={url}
      supabaseAnon={anon}
      hasUrl={hasUrl}
      hasAnon={hasAnon}
    />
  );
}