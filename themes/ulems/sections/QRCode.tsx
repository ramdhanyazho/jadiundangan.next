export default function QRCodeSec({ slug }: { slug: string }) {
  const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
    `https://jadiundangan.my.id/undangan/${slug}`
  )}`;
  return (
    <section className="py-14 bg-white">
      <div className="mx-auto max-w-sm px-6 text-center">
        <h2 className="text-2xl font-semibold">Bagikan Undangan</h2>
        <p className="mt-3 text-sm opacity-80">Scan kode QR di bawah ini untuk membagikan undangan kepada kerabat.</p>
        <div className="mt-6 flex justify-center">
          <img src={qrSrc} alt="QR Code Undangan" className="h-40 w-40 object-contain" />
        </div>
      </div>
    </section>
  );
}
