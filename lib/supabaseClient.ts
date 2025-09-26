'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export const getBrowserClient = () => {
  return createClientComponentClient();
};