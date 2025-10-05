export const dynamic = 'force-dynamic';

import PaymentsTable from './table';

export default function PaymentsPage() {
  return (
    <div className="bg-white rounded-xl border p-6">
      <h1 className="text-xl font-semibold mb-4">Pembayaran</h1>
      <PaymentsTable />
    </div>
  );
}
