import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import type { ReactNode } from 'react';
import ClientNav from '@/components/ClientNav';
import { getServerClient } from '@/lib/supabaseServer';

interface ClientLayoutProps {
  children: ReactNode;
}

export default async function ClientLayout({ children }: ClientLayoutProps) {
  const cookieStore = cookies();
  const supabase = getServerClient(cookieStore);
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <ClientNav />
      <main className="px-6 py-10 max-w-6xl mx-auto">{children}</main>
    </div>
  );
}