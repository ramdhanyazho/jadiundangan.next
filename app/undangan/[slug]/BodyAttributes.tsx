'use client';

import { useEffect } from 'react';

type BodyAttributeMap = Record<string, string>;

const BODY_ATTRIBUTES: BodyAttributeMap = {
  'data-key': 'd9faced3377732b0edf19e90d1bde0cd5de04801c75eb41743',
  'data-url': '/api/',
  'data-audio': 'https://ulems.my.id/assets/music/pure-love-304010.mp3',
  'data-confetti': 'true',
  'data-time': '2023-03-15 09:30:00',
};

const BOOTSTRAP_SRC = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js';

export default function BodyAttributes() {
  useEffect(() => {
    const body = document.body;
    const previous = new Map<string, string | null>();

    for (const [key, value] of Object.entries(BODY_ATTRIBUTES)) {
      previous.set(key, body.getAttribute(key));
      body.setAttribute(key, value);
    }

    const head = document.head;
    document.documentElement.setAttribute('data-bs-theme', 'auto');

    let appendedThemeMeta: HTMLMetaElement | null = null;
    const themeMeta = head.querySelector('meta[name="theme-color"]');
    if (!themeMeta) {
      appendedThemeMeta = document.createElement('meta');
      appendedThemeMeta.name = 'theme-color';
      appendedThemeMeta.content = '#000000';
      head.appendChild(appendedThemeMeta);
    }
    const bootstrap = document.createElement('script');
    bootstrap.src = BOOTSTRAP_SRC;
    bootstrap.async = true;
    bootstrap.defer = true;
    bootstrap.crossOrigin = 'anonymous';

    const bootstrapPromise = new Promise<void>((resolve, reject) => {
      bootstrap.onload = () => resolve();
      bootstrap.onerror = () => reject(new Error('Failed to load bootstrap.'));
    });

    head.appendChild(bootstrap);

    const guest = document.createElement('script');
    guest.src = '/themes/undangan-4x/js/guest.js';
    guest.async = true;
    guest.defer = true;

    const guestPromise = bootstrapPromise
      .catch(() => undefined)
      .then(async () => {
        const promise = new Promise<void>((resolve, reject) => {
          guest.onload = () => resolve();
          guest.onerror = () => reject(new Error('Failed to load guest script.'));
        });

        head.appendChild(guest);
        await promise;
        window.dispatchEvent(new Event('load'));
      })
      .catch(() => undefined);

    void guestPromise;

    return () => {
      bootstrap.remove();
      guest.remove();

      if (appendedThemeMeta) {
        appendedThemeMeta.remove();
      }

      for (const [key, value] of previous.entries()) {
        if (value === null) {
          body.removeAttribute(key);
        } else {
          body.setAttribute(key, value);
        }
      }
    };
  }, []);

  return null;
}
