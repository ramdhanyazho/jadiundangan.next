import type { SVGProps } from 'react';

export function MessageIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M5 4h14a3 3 0 0 1 3 3v7a3 3 0 0 1-3 3h-4.38l-3.72 3.72A1 1 0 0 1 9 19.99V17H5a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3zm0 2a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h5a1 1 0 0 1 1 1v1.59l2.3-2.3a1 1 0 0 1 .7-.29H19a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1z" />
    </svg>
  );
}
