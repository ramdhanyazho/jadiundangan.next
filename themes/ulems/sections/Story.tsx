export default function Story({ stories }: { stories: any[] }) {
  const list = stories || [];
  if (!list.length) return null;
  return (
    <section className="py-14">
      <div className="mx-auto max-w-3xl px-6">
        <h2 className="text-center text-2xl font-semibold mb-8">Perjalanan Cinta</h2>
        <div className="space-y-6">
          {list.map((story: any, idx: number) => (
            <article key={idx} className="rounded-xl border bg-white p-5 shadow-sm">
              <h3 className="font-semibold text-lg">{story.title}</h3>
              <p className="text-sm opacity-70">{story.date_display}</p>
              <p className="mt-3 text-sm leading-relaxed">{story.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
