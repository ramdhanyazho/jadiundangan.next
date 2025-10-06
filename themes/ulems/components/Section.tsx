import type { ReactNode } from 'react';

export default function Section({
  id,
  title,
  subtitle,
  children,
  className = '',
}: {
  id?: string;
  title?: string;
  subtitle?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={`py-12 md:py-16 ${className}`}>
      {(title || subtitle) && (
        <div className="text-center mb-8">
          {title ? (
            <h2 className="text-2xl md:text-3xl font-semibold tracking-wide uppercase text-slate-800">
              {title}
            </h2>
          ) : null}
          {subtitle ? <p className="opacity-70 mt-1 max-w-2xl mx-auto">{subtitle}</p> : null}
        </div>
      )}
      {children}
    </section>
  );
}
