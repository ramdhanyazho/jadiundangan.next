export default function Loading() {
  return (
    <div className="container py-5 text-white">
      <div className="placeholder-glow mb-4">
        <div className="rounded-4 bg-white bg-opacity-10" style={{ height: '18rem' }}>
          <span className="placeholder col-12 h-100 rounded-4" />
        </div>
      </div>
      <div className="row g-3 mb-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="col-6 col-md-3">
            <div className="placeholder-glow">
              <div className="rounded-4 bg-white bg-opacity-10" style={{ height: '6rem' }}>
                <span className="placeholder col-12 h-100 rounded-4" />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="placeholder-glow">
        <div className="rounded-4 bg-white bg-opacity-10" style={{ height: '16rem' }}>
          <span className="placeholder col-12 h-100 rounded-4" />
        </div>
      </div>
    </div>
  );
}
