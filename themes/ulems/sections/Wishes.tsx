export default function Wishes({ invitation }: { invitation: any }) {
  return (
    <section className="py-14 bg-white">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <h2 className="text-2xl font-semibold">Doa dan Harapan</h2>
        <p className="mt-4 text-sm leading-relaxed opacity-80">
          Terima kasih atas doa dan perhatian yang diberikan kepada kami. Kehadiran dan restu Anda menjadi kebahagiaan tersendiri
          bagi {invitation.groom_name} &amp; {invitation.bride_name}.
        </p>
      </div>
    </section>
  );
}
