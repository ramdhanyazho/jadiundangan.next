import type { ReactNode } from 'react';
import Script from 'next/script';

export default function InvitationLayout({ children }: { children: ReactNode }) {
  return (
    <div data-bs-theme="dark" className="min-vh-100 bg-light-dark text-white">
      {children}
      <Script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
        strategy="afterInteractive"
        integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
        crossOrigin="anonymous"
      />
    </div>
  );
}
