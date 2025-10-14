import { notFound } from "next/navigation";

import type { ComponentType } from "react";

import UlemsEmerald from "@/components/themes/ulems-classic-emerald/Demo";
import Jawabiru from "@/components/themes/jawabiru-elegan/Demo";
import MinimalBloom from "@/components/themes/minimal-bloom/Demo";
import ForestEmerald from "@/components/themes/forest-emerald/Demo";
import CinematicHighlight from "@/components/themes/cinematic-highlight/Demo";
import IndigoClassic from "@/components/themes/indigo-classic/Demo";

const registry: Record<string, ComponentType> = {
  "ulems-classic-emerald": UlemsEmerald,
  "jawabiru-elegan": Jawabiru,
  "minimal-bloom": MinimalBloom,
  "forest-emerald": ForestEmerald,
  "cinematic-highlight": CinematicHighlight,
  "indigo-classic": IndigoClassic,
};

export default function Page({ params }: { params: { slug: string } }) {
  const Theme = registry[params.slug];
  if (!Theme) return notFound();
  return <Theme />;
}

export async function generateStaticParams() {
  return Object.keys(registry).map((slug) => ({ slug }));
}
