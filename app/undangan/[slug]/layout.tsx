import type { ReactNode } from 'react';

import BodyAttributes from './BodyAttributes';

export default function InvitationLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <BodyAttributes />
      <div id="undangan4x" className="u4x">
        {children}
      </div>
    </>
  );
}
