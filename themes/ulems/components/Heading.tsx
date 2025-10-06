import type { ReactNode } from 'react';

export default function Heading({
  kicker,
  title,
  description,
  align = 'center',
  children,
}: {
  kicker?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: 'left' | 'center' | 'right';
  children?: ReactNode;
}) {
  const alignment =
    align === 'left' ? 'text-left items-start' : align === 'right' ? 'text-right items-end' : 'text-center items-center';

  return (
    <div className={`flex flex-col gap-3 mb-10 ${alignment}`}>
      {kicker ? <span className="text-sm tracking-[0.3em] uppercase text-sky-500">{kicker}</span> : null}
      <h2 className="text-3xl md:text-4xl font-semibold text-slate-800">{title}</h2>
      {description ? <p className="max-w-2xl text-base md:text-lg text-slate-600">{description}</p> : null}
      {children}
    </div>
  );
}
