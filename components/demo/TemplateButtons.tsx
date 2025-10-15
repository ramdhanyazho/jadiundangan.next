"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import type { ThemeTemplate } from "@/lib/themes/templates";

type TemplateDefaults = {
  title?: string;
  names?: string;
  date?: string;
  venue?: string;
};

type TemplateButtonsProps = {
  items: ThemeTemplate[];
  defaults?: TemplateDefaults;
  sourceSlug?: string;
};

export default function TemplateButtons({
  items,
  defaults,
  sourceSlug,
}: TemplateButtonsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  if (!items?.length) return null;

  const handleUse = (template: ThemeTemplate) => {
    const params = new URLSearchParams({
      template: template.id,
      title: defaults?.title ?? "Undangan Baru",
      names: defaults?.names ?? "Wahyu & Riski",
      date: defaults?.date ?? "2026-06-21 09:00",
      venue: defaults?.venue ?? "Jakarta",
    });

    const fromSlug = sourceSlug ?? searchParams.get("slug") ?? undefined;
    if (fromSlug) {
      params.set("from", fromSlug);
    }

    router.push(`/builder/new?${params.toString()}`);
  };

  return (
    <aside className="mx-auto max-w-4xl px-6 pb-12">
      <h4 className="mb-3 text-sm font-semibold text-slate-700">Pilih Folder Template</h4>
      <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
        {items.map((template) => (
          <div
            key={template.id}
            className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            <div className="text-sm font-medium">{template.label}</div>
            <div className="mt-3 flex items-center gap-2">
              <Link
                href={template.previewPath}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-slate-200 px-3 py-1.5 text-sm hover:bg-slate-50"
              >
                Preview
              </Link>
              <button
                type="button"
                onClick={() => handleUse(template)}
                className="rounded-full bg-slate-900 px-3 py-1.5 text-sm text-white hover:bg-slate-800"
              >
                Gunakan Template
              </button>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
