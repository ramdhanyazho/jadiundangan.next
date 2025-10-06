export default function Couple({ invitation, media }: { invitation: any; media: any[] }) {
  const secondPhoto = media?.find((m) => m.type === 'photo' && m.sort_index === 1)?.url;
  return (
    <section id="couple" className="py-16 px-6 bg-white">
      <div className="mx-auto max-w-4xl text-center">
        <p className="text-sm uppercase tracking-[0.35em] text-sky-500">Kedua Mempelai</p>
        <h2 className="text-3xl md:text-4xl font-semibold mt-3">
          {invitation.groom_name} &amp; {invitation.bride_name}
        </h2>
        <p className="mt-4 text-base opacity-80">
          Dengan penuh rasa syukur, kami mengundang Anda untuk hadir dan memberikan doa restu di hari bahagia kami.
        </p>
        {secondPhoto ? (
          <div className="mt-8">
            <img src={secondPhoto} alt="Gallery" className="mx-auto max-h-80 rounded-xl object-cover shadow" />
          </div>
        ) : null}
      </div>
    </section>
  );
}
