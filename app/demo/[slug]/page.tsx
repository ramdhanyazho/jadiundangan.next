import { Suspense, type ComponentType } from "react";
import { notFound } from "next/navigation";

import TemplateButtons from "@/components/demo/TemplateButtons";
import UlemsEmerald from "@/components/themes/ulems-classic-emerald/Demo";
import Jawabiru from "@/components/themes/jawabiru-elegan/Demo";
import MinimalBloom from "@/components/themes/minimal-bloom/Demo";
import ForestEmerald from "@/components/themes/forest-emerald/Demo";
import CinematicHighlight from "@/components/themes/cinematic-highlight/Demo";
import IndigoClassic from "@/components/themes/indigo-classic/Demo";
import { THEME_TEMPLATES } from "@/lib/themes/templates";

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
  const templates = THEME_TEMPLATES[params.slug] ?? [];
  const prettySlug = params.slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  const defaultTitle = `Undangan ${prettySlug}`;

  return (
    <>
      <Theme />
      <Suspense fallback={<TemplateButtonsFallback />}>
        <TemplateButtons
          items={templates}
          defaults={{
            title: defaultTitle,
            names: "Wahyu & Riski",
            date: "2026-06-21 09:00",
            venue: "Jakarta",
          }}
          sourceSlug={params.slug}
        />
      </Suspense>
    </>
  );
}

function TemplateButtonsFallback() {
  return (
    <aside className="mx-auto max-w-4xl px-6 pb-12 text-center text-slate-600">
      Memuat pilihan template…
    </aside>
  );
}

export async function generateStaticParams() {
  return Object.keys(registry).map((slug) => ({ slug }));
}
