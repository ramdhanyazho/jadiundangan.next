export type ThemeMeta = {
  slug: string;
  title: string;
  tag: "PREMIUM" | "TRADISIONAL" | "MODERN" | "OUTDOOR" | "VIDEO" | "ELEGAN";
  description: string;
};

export const THEMES: ThemeMeta[] = [
  {
    slug: "ulems-classic-emerald",
    title: "Ulems Classic Emerald",
    tag: "PREMIUM",
    description:
      "Perpaduan hijau emerald & emas lembut dengan nuansa islami modern.",
  },
  {
    slug: "jawabiru-elegan",
    title: "Jawabiru Elegan",
    tag: "TRADISIONAL",
    description:
      "Motif batik biru dengan tipografi serif yang klasik dan hangat.",
  },
  {
    slug: "minimal-bloom",
    title: "Minimal Bloom",
    tag: "MODERN",
    description:
      "Pastel lembut, layout bersih, fokus pada foto & informasi inti.",
  },
  {
    slug: "forest-emerald",
    title: "Forest Emerald",
    tag: "OUTDOOR",
    description:
      "Nuansa hijau hutan, tekstur halus, cocok untuk garden/woodland.",
  },
  {
    slug: "cinematic-highlight",
    title: "Cinematic Highlight",
    tag: "VIDEO",
    description:
      "Hero fullscreen dengan video cinematic dan countdown.",
  },
  {
    slug: "indigo-classic",
    title: "Indigo Classic",
    tag: "ELEGAN",
    description:
      "Skema indigo mewah dengan elemen klasik kekinian.",
  },
];
