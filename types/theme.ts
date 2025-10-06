export type ThemeFontConfig = {
  google?: Array<{ family: string; weights: string[] }>;
};

export type ThemePalette = {
  primary: string;
  secondary: string;
  accent: string;
  bg: string;
  text: string;
};

export type ThemeOrnaments = {
  top: string;
  bottom: string;
};

export type ThemeConfig = {
  slug: string;
  name: string;
  fonts?: ThemeFontConfig;
  palette: ThemePalette;
  ornaments: ThemeOrnaments;
  sections: string[];
};
