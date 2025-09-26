import { supabase } from '@/lib/supabaseClient';
export const revalidate = 0;
export default async function AdminUsers(){
  const { data: users } = await supabase.from('profiles').select('*').order('created_at', { ascending: false });
  return (
    <div className="card">
      <h2 className="text-xl font-semibold mb-4">Management Pengguna</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead><tr className="text-left border-b"><th className="py-2">Email</th><th>Nama</th><th>Role</th><th>Created</th></tr></thead>
          <tbody>
            {users?.map(u => (
              <tr key={u.id} className="border-b">
                <td className="py-2">{u.email}</td>
                <td>{u.full_name || '-'}</td>
                <td>{u.is_admin ? 'Admin' : 'Client'}</td>
                <td>{new Date(u.created_at).toLocaleString('id-ID')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
