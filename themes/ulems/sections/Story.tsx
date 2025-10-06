'use client';

import Image from 'next/image';

import Heading from '../components/Heading';
import Section from '../components/Section';

import type { StoryRow } from '@/types/db';

type StoryProps = {
  stories: StoryRow[];
};

export default function Story({ stories }: StoryProps) {
  if (!stories.length) return null;

  return (
    <Section id="story" className="bg-white">
      <div className="mx-auto max-w-4xl">
        <Heading
          title="Kisah Kami"
          description="Jejak perjalanan cinta kami yang membawa pada hari istimewa ini"
        />
        <ol className="relative border-l border-slate-200 pl-8">
          {stories.map((story) => (
            <li key={story.id} className="mb-10 ml-2">
              <div className="absolute -left-[0.65rem] mt-1 h-3 w-3 rounded-full border-2 border-white bg-amber-400" />
              <div className="rounded-3xl bg-slate-50/80 p-6 shadow-sm">
                <div className="text-sm uppercase tracking-[0.3em] text-sky-500">{story.date_display || story.date}</div>
                <h3 className="mt-2 text-xl font-semibold text-slate-800">{story.title}</h3>
                {story.photo_url ? (
                  <div className="relative mt-4 overflow-hidden rounded-2xl">
                    <Image
                      src={story.photo_url}
                      alt={story.title || 'Story photo'}
                      width={800}
                      height={600}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ) : null}
                {story.body ? <p className="mt-4 text-sm leading-relaxed text-slate-600">{story.body}</p> : null}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
