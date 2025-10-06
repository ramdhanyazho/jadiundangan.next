import Image from 'next/image';
import Link from 'next/link';

import { getServerClient } from '@/lib/supabaseServer';
import type { Database } from '@/types/db';

export default async function Brand() {
  let logo: string | null = null;

  try {
    const supabase = getServerClient();
    type BrandingSetting = Database['public']['Tables']['settings']['Row'];

    const { data } = await supabase
      .from('settings')
      .select('value')
      .eq('key', 'branding')
      .maybeSingle<BrandingSetting>();

    const brandingValue = (data?.value as { logo_url?: string | null } | null) ?? null;
    logo = typeof brandingValue?.logo_url === 'string' ? brandingValue.logo_url : null;
  } catch (error) {
    logo = null;
  }

  return (
    <Link href="/" className="flex items-center gap-2">
      {logo ? (
        <Image src={logo} alt="Logo" width={28} height={28} className="rounded" />
      ) : (
        <span className="font-bold text-xl text-brand">JadiUndangan</span>
      )}
    </Link>
  );
}
