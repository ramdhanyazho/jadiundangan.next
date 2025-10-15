const coupleSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" fill="none">
  <rect width="200" height="200" rx="100" fill="#E2E8F0" />
  <g font-family="Georgia, Cambria, 'Times New Roman', Times, serif" text-anchor="middle">
    <text x="50%" y="48%" font-size="40" fill="#475569">W</text>
    <text x="50%" y="68%" font-size="40" fill="#475569">R</text>
  </g>
</svg>`;

const cinematicPosterSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#111827" />
      <stop offset="50%" stop-color="#1F2937" />
      <stop offset="100%" stop-color="#4B5563" />
    </linearGradient>
  </defs>
  <rect width="1280" height="720" fill="url(#grad)" />
  <g fill="#F9FAFB" font-family="'Inter', 'Segoe UI', sans-serif" text-anchor="middle">
    <text x="50%" y="40%" font-size="80" font-weight="600">Wahyu &amp; Riski</text>
    <text x="50%" y="52%" font-size="32" fill="#E5E7EB">Cinematic Highlight</text>
    <text x="50%" y="63%" font-size="24" fill="#E5E7EB">Jakarta · 21 Juni 2026</text>
  </g>
</svg>`;

export const COUPLE_PLACEHOLDER = `data:image/svg+xml,${encodeURIComponent(coupleSvg)}`;
export const CINEMATIC_POSTER_PLACEHOLDER = `data:image/svg+xml,${encodeURIComponent(cinematicPosterSvg)}`;

export const CINEMATIC_VIDEO_PLACEHOLDER = "/videos/cinematic.mp4";
