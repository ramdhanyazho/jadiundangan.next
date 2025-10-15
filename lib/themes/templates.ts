export type ThemeTemplate = {
  id: string;
  label: string;
  previewPath: string;
};

export const THEME_TEMPLATES: Record<string, ThemeTemplate[]> = {
  "ulems-classic-emerald": [
    { id: "ulems", label: "Ulems Cover", previewPath: "/themes/ulems/preview" },
  ],
  "jawabiru-elegan": [
    { id: "jawabiru", label: "Jawabiru Split", previewPath: "/themes/jawabiru/preview" },
  ],
  "indigo-classic": [
    { id: "indigo", label: "Indigo Classic", previewPath: "/themes/indigo/preview" },
  ],
  "cinematic-highlight": [
    { id: "cinematic", label: "Cinematic Video", previewPath: "/themes/cinematic/preview" },
    {
      id: "cinematic-light",
      label: "Cinematic Light",
      previewPath: "/themes/cinematic-light/preview",
    },
  ],
  "minimal-bloom": [
    { id: "minimal", label: "Minimal Bloom", previewPath: "/themes/minimal/preview" },
  ],
  "forest-emerald": [
    { id: "forest", label: "Forest Emerald", previewPath: "/themes/forest/preview" },
  ],
};
