export async function signInPasswordRaw(email: string, password: string) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Konfigurasi Supabase tidak lengkap untuk melakukan login.');
  }

  const url = `${supabaseUrl}/auth/v1/token?grant_type=password`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      apikey: supabaseAnonKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) {
    const bodyText = await res.text();

    const buildFriendlyMessage = () => {
      if (!bodyText) {
        return undefined;
      }

      try {
        const parsed = JSON.parse(bodyText) as {
          error?: unknown;
          error_description?: unknown;
          message?: unknown;
        };

        const descriptionCandidate = [
          parsed.error_description,
          parsed.message,
          parsed.error,
        ].find((value) => typeof value === 'string') as string | undefined;

        if (!descriptionCandidate) {
          return undefined;
        }

        const normalized = descriptionCandidate.trim().toLowerCase();

        if (
          normalized.includes('invalid login credentials') ||
          normalized.includes('invalid email or password') ||
          normalized.includes('invalid_grant')
        ) {
          return 'Email atau password salah.';
        }

        if (
          normalized.includes('email not confirmed') ||
          normalized.includes('email_not_confirmed')
        ) {
          return 'Email belum terverifikasi. Silakan verifikasi email Anda terlebih dahulu.';
        }

        if (normalized.includes('over email rate limit')) {
          return 'Terlalu banyak percobaan login. Silakan coba lagi beberapa saat lagi.';
        }

        if (normalized.includes('no api key found')) {
          return 'Konfigurasi Supabase tidak ditemukan. Periksa NEXT_PUBLIC_SUPABASE_ANON_KEY.';
        }

        return descriptionCandidate;
      } catch (error) {
        if (error instanceof SyntaxError) {
          return undefined;
        }
        throw error;
      }
    };

    const friendlyMessage = buildFriendlyMessage();
    const fallbackMessage = bodyText
      ? `Auth error ${res.status}: ${bodyText}`
      : `Auth error ${res.status}`;

    throw new Error(friendlyMessage ?? fallbackMessage);
  }
  return res.json();
}