export default function OurStory({ stories = [] }) {
  if (!stories.length) return null;

  return (
    <section className="section container-narrow">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Perjalanan Cinta Kami</h2>
      <div className="space-y-4">
        {stories.map((story, idx) => (
          <article key={story.id || idx} className="card">
            <div className="text-sm uppercase tracking-wide text-brand-gold">
              {story.date_display || story.date || `Bab ${idx + 1}`}
            </div>
            {story.title ? <h3 className="mt-2 text-xl font-semibold">{story.title}</h3> : null}
            {story.description ? (
              <p className="mt-2 leading-relaxed opacity-80 whitespace-pre-line">{story.description}</p>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}