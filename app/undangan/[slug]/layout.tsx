import type { ReactNode } from 'react';

import { Tabbar } from '@/components/tabbar';

export default function InvitationLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0B1220] text-white">
      <main className="relative mx-auto flex min-h-screen max-w-5xl flex-col gap-10 px-4 pb-24 pt-6 sm:px-6">
        {children}
      </main>
      <Tabbar />
    </div>
  );
}
