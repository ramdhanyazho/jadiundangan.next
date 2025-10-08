'use client';

import { useEffect } from 'react';

export function BootstrapThemeClient({ theme = 'dark' }: { theme?: 'auto' | 'dark' | 'light' }) {
  useEffect(() => {
    const html = document.documentElement;
    const previous = html.getAttribute('data-bs-theme');
    if (previous === theme) {
      return;
    }
    html.setAttribute('data-bs-theme', theme);
    return () => {
      if (previous) {
        html.setAttribute('data-bs-theme', previous);
      } else {
        html.removeAttribute('data-bs-theme');
      }
    };
  }, [theme]);

  return null;
}
