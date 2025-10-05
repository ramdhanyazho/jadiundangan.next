import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';
import { getAdminClient } from '@/lib/supabaseAdmin';

export async function requireAdmin() {
  const cookieStore = cookies();
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const anon = (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY)!;

  const supabase = createServerClient(url, anon, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value;
      },
      set(name: string, value: string, options: any) {
        cookieStore.set(name, value, options);
      },
      remove(name: string, options: any) {
        cookieStore.set(name, '', { ...options, maxAge: 0 });
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error('UNAUTHORIZED');

  const { data: prof } = await supabase
    .from('profiles')
    .select('is_admin')
    .eq('user_id', user.id)
    .maybeSingle();

  if (!prof?.is_admin) throw new Error('FORBIDDEN');

  const admin = getAdminClient();
  return { admin, user } as const;
}
