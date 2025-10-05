import { getServerClient } from '@/lib/supabaseServer';

export async function GET() {
  const supabase = getServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let profile = null;
  if (user) {
    const { data } = await supabase
      .from('profiles')
      .select('is_admin, email')
      .eq('user_id', user.id)
      .maybeSingle();
    profile = data ?? null;
  }

  return Response.json({ user, profile });
}
