import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  const hasUrl = Boolean(supabaseUrl);
  const hasAnon = Boolean(anonKey);

  let emailEnabled: boolean | null = null;
  let authSettingsError: string | null = null;

  if (supabaseUrl && serviceRoleKey) {
    try {
      const response = await fetch(`${supabaseUrl}/auth/v1/settings`, {
        headers: {
          apikey: serviceRoleKey,
          Authorization: `Bearer ${serviceRoleKey}`,
        },
        cache: 'no-store',
      });

      if (!response.ok) {
        authSettingsError = `Gagal mengambil pengaturan auth (status ${response.status}).`;
      } else {
        const payload = (await response.json()) as { email?: { enabled?: boolean } } | null;
        emailEnabled = payload?.email?.enabled ?? null;
      }
    } catch (error) {
      authSettingsError = error instanceof Error ? error.message : 'Gagal mengambil pengaturan auth.';
    }
  } else {
    authSettingsError = 'Supabase URL atau service role key belum dikonfigurasi.';
  }

  const anonCheck = {
    success: false,
    error: null as string | null,
  };

  if (supabaseUrl && anonKey) {
    try {
      const supabase = createClient(supabaseUrl, anonKey, {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
        },
      });

      const { error } = await supabase.from('invitations').select('id').limit(1);

      if (!error) {
        anonCheck.success = true;
      } else {
        anonCheck.error = error.message;
      }
    } catch (error) {
      anonCheck.error = error instanceof Error ? error.message : 'Gagal menguji akses anon.';
    }
  } else {
    anonCheck.error = 'Anon key atau URL tidak tersedia.';
  }

  return NextResponse.json({
    hasUrl,
    hasAnon,
    authSettings: {
      emailEnabled,
      error: authSettingsError,
    },
    canAnonSelect: anonCheck,
  });
}