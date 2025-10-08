import type { ReactNode } from 'react';
import Script from 'next/script';
import { BootstrapThemeClient } from '@/components/legacy/BootstrapThemeClient';

export default function InvitationLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <BootstrapThemeClient theme="dark" />
      <div id="undangan4x" className="u4x bg-white-black position-relative" data-section-id="root">
        {children}
      </div>
      <Script src="/themes/undangan-4x/js/guest.js" strategy="afterInteractive" />
    </>
  );
}
