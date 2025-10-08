import type { SVGProps } from 'react';

export function GalleryIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M4.5 5h15A2.5 2.5 0 0 1 22 7.5v9A2.5 2.5 0 0 1 19.5 19h-15A2.5 2.5 0 0 1 2 16.5v-9A2.5 2.5 0 0 1 4.5 5zm0 2a.5.5 0 0 0-.5.5v9c0 .28.22.5.5.5h15a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5zm2.75 1.5a1.75 1.75 0 1 1 0 3.5 1.75 1.75 0 0 1 0-3.5zm2.21 7.25 2.57-3.21a1 1 0 0 1 1.56 0l1.55 1.94.49-.49a1 1 0 0 1 1.41 0l1.46 1.45z" />
    </svg>
  );
}
