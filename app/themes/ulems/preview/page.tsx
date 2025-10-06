import dynamic from 'next/dynamic';

import previewData from '@/themes/ulems/preview-data';
import config from '@/themes/ulems/theme.config';

export const revalidate = 0;

const ThemeRoot = dynamic(() => import('@/themes/ulems/ThemeRoot'), { ssr: false });

export default function PreviewPage() {
  return <ThemeRoot data={previewData} config={config} mode="preview" />;
}
