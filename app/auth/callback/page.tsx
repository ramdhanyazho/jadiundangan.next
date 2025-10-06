export default function CallbackPage() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-semibold">Email terverifikasi</h1>
        <p className="opacity-70">Silakan login untuk mulai mengelola undangan.</p>
        <a className="underline" href="/client/login">
          Ke halaman login
        </a>
      </div>
    </main>
  );
}
