import type { SVGProps } from 'react';

export function HeartIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M12 21.35c-1.45-1.32-5.59-4.42-7.64-6.64C2.17 12.38 1.5 10.87 1.5 9.2c0-2.9 2.1-5.2 4.84-5.2 1.7 0 3.22.9 4.16 2.29.94-1.4 2.46-2.29 4.16-2.29 2.74 0 4.84 2.3 4.84 5.2 0 1.67-.67 3.18-2.86 5.51-2.05 2.22-6.19 5.32-7.64 6.64z" />
    </svg>
  );
}
