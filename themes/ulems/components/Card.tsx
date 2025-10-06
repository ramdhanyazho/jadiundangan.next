import type { ReactNode } from 'react';

export default function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-3xl bg-white/80 backdrop-blur shadow-sm border border-white/60 p-6 md:p-8 ${className}`}>
      {children}
    </div>
  );
}
