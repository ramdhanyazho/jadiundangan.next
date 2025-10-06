export default function Gift({ gift }: { gift: any }) {
  if (!gift) return null;
  return (
    <section className="py-14 bg-slate-100">
      <div className="mx-auto max-w-xl px-6 text-center">
        <h2 className="text-2xl font-semibold">Kado Digital</h2>
        <p className="mt-3 text-sm opacity-80">Terima kasih atas doa dan hadiah terbaik Anda.</p>
        <div className="mt-6 rounded-xl border bg-white p-6 shadow-sm">
          <p className="font-semibold text-lg">{gift.bank_name}</p>
          <p className="mt-2 text-sm tracking-wider">{gift.account_number}</p>
          <p className="text-sm opacity-70">a.n. {gift.account_name}</p>
          {gift.qr_image_url ? (
            <div className="mt-4 flex justify-center">
              <img src={gift.qr_image_url} alt="QR Code" className="h-40 w-40 object-contain" />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
