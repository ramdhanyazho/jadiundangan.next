'use client';

import { useEffect } from 'react';

interface RoleCookieSyncProps {
  isAdmin?: boolean;
}

const ONE_WEEK_IN_SECONDS = 60 * 60 * 24 * 7;

export default function RoleCookieSync({ isAdmin = false }: RoleCookieSyncProps) {
  useEffect(() => {
    const secure = typeof window !== 'undefined' && window.location.protocol === 'https:' ? '; secure' : '';
    const cookieBase = `; path=/; sameSite=lax${secure}`;

    const value = isAdmin ? 'true' : '';
    const maxAge = isAdmin ? ONE_WEEK_IN_SECONDS : 0;

    document.cookie = `is_admin=${value}${cookieBase}; max-age=${maxAge}`;
  }, [isAdmin]);

  return null;
}