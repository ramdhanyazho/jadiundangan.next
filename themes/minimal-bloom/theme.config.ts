const config = {
  slug: 'minimal-bloom',
  name: 'Minimal Bloom',
  fonts: {
    google: [
      { family: 'Cormorant Garamond', weights: ['400', '600'] },
      { family: 'Inter', weights: ['400', '500', '600'] },
    ],
  },
  palette: {
    primary: '#f97316',
    secondary: '#fb7185',
    accent: '#22d3ee',
    bg: '#fdf2f8',
    text: '#4a5568',
  },
  ornaments: { top: 'floral', bottom: 'floral' },
  sections: ['Cover', 'Event', 'Couple', 'Gallery', 'RSVP', 'Gift', 'Footer'],
};

export default config;
