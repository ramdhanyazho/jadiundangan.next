import type { Metadata } from 'next';
import NextDynamic from 'next/dynamic';
import { notFound } from 'next/navigation';

import { getInvitationView } from '@/lib/invitations';
import ulemsConfig from '@/themes/ulems/theme.config';
import ulemsPreview from '@/themes/ulems/preview-data';

const Ulems = NextDynamic(() => import('@/themes/ulems/ThemeRoot'), { ssr: true });
export const dynamic = 'force-dynamic';

type Props = { params: { slug: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params.slug;
  const data = await getInvitationView(slug);
  const base = data?.invitation?.title || `The Wedding • ${slug}`;
  return {
    title: slug === 'contoh-rahmat-nisa' ? `${base} — Demo Ulems` : base,
    description: 'Undangan digital modern yang elegan.',
    robots: slug === 'contoh-rahmat-nisa' ? { index: false, follow: false } : undefined,
  };
}

export default async function Page({ params }: Props) {
  const { slug } = params;
  const data = await getInvitationView(slug);

  if (data?.invitation?.theme_slug === 'ulems') {
    return <Ulems data={data} config={ulemsConfig} />;
  }
  if (slug === 'contoh-rahmat-nisa') {
    return <Ulems data={ulemsPreview as any} config={ulemsConfig} />;
  }
  notFound();
}
