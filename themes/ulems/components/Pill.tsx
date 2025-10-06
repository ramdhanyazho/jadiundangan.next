import type { ReactNode } from 'react';

export default function Pill({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border border-slate-200 bg-white/70 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-slate-600 ${className}`}
    >
      {children}
    </span>
  );
}
