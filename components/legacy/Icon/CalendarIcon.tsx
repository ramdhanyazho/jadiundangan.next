import type { SVGProps } from 'react';

export function CalendarIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M7 2a1 1 0 0 1 1 1v1h8V3a1 1 0 0 1 2 0v1h1.5A2.5 2.5 0 0 1 22 6.5v13A2.5 2.5 0 0 1 19.5 22h-15A2.5 2.5 0 0 1 2 19.5v-13A2.5 2.5 0 0 1 4.5 4H6V3a1 1 0 0 1 1-1zm12.5 8.5h-15v9a.5.5 0 0 0 .5.5h14a.5.5 0 0 0 .5-.5zm-15-2h15V6.5a.5.5 0 0 0-.5-.5h-14a.5.5 0 0 0-.5.5z" />
    </svg>
  );
}
