export default function AdminHome(){
  return (
    <div className="grid md:grid-cols-3 gap-4">
      <div className="card"><div className="text-sm opacity-70">Total Pengguna</div><div className="text-3xl font-bold">—</div></div>
      <div className="card"><div className="text-sm opacity-70">Total Undangan</div><div className="text-3xl font-bold">—</div></div>
      <div className="card"><div className="text-sm opacity-70">Pembayaran Pending</div><div className="text-3xl font-bold">—</div></div>
    </div>
  )
}
