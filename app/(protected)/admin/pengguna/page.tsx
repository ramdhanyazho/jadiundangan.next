export const dynamic = 'force-dynamic';

import { getServerClient } from '@/lib/supabaseServer';

export default async function AdminUsers() {
  const supabase = getServerClient();
  const { data } = await supabase
    .from('profiles')
    .select('user_id, email, is_admin')
    .order('created_at', { ascending: false })
    .limit(200)
    .returns<{ user_id: string; email: string | null; is_admin: boolean | null }[]>();

  return (
    <div className="bg-white rounded-xl border p-6">
      <h1 className="text-xl font-semibold mb-4">Pengguna</h1>
      <table className="w-full text-sm">
        <thead><tr><th className="text-left">Email</th><th>Admin</th><th>User ID</th></tr></thead>
        <tbody>
          {data?.map((u) => (
            <tr key={u.user_id} className="border-t">
              <td className="py-2">{u.email}</td>
              <td className="text-center">{u.is_admin ? '✅' : '—'}</td>
              <td className="font-mono text-xs">{u.user_id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
