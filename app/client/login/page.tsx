import { Suspense } from 'react';
import ClientLoginForm from './ClientLoginForm';

function LoadingFallback() {
  return (
    <div className="min-h-screen grid place-items-center p-6">
      <div className="w-full max-w-md bg-white shadow rounded-xl p-6 text-center text-slate-600">
        Memuat halaman login…
      </div>
    </div>
  );
}

export default function ClientLoginPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <ClientLoginForm />
    </Suspense>
  );
}
