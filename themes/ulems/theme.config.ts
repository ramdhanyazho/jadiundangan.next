import type { ThemeConfig } from '@/types/theme';

const config: ThemeConfig = {
  slug: 'ulems',
  name: 'Ulems Classic',
  fonts: {
    google: [{ family: 'Josefin Sans', weights: ['400', '600'] }],
  },
  palette: {
    primary: '#1e293b',
    secondary: '#0ea5e9',
    accent: '#f59e0b',
    bg: '#f8fafc',
    text: '#1f2937',
  },
  ornaments: {
    top: '/themes/ulems/assets/ornaments/batik-top.svg',
    bottom: '/themes/ulems/assets/ornaments/batik-bottom.svg',
  },
  sections: [
    'Cover',
    'Couple',
    'Event',
    'Gallery',
    'Story',
    'Wishes',
    'Gift',
    'Location',
    'QRCode',
    'Footer',
  ],
};

export default config;
