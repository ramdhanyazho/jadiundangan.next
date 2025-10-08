import type { InvitationMessage, InvitationStats } from '@/lib/types';
import { StatsCards } from './StatsCards';

interface Props {
  stats: InvitationStats;
  messages: InvitationMessage[];
}

export function SectionUcapan({ stats, messages }: Props) {
  return (
    <section className="bg-light-dark py-5" id="ucapan" data-section-id="ucapan">
      <div className="container">
        <div className="bg-theme-auto rounded-5 shadow p-4">
          <h2 className="font-esthetic text-center mb-4" style={{ fontSize: '2.25rem' }}>
            Ucapan &amp; Doa
          </h2>
          <StatsCards stats={stats} />
          <div className="mt-4">
            <h3 className="font-esthetic text-center mb-3" style={{ fontSize: '2rem' }}>
              Kirim Ucapan
            </h3>
            <form className="row g-3" data-ucapan-form>
              <div className="col-12">
                <label htmlFor="nama" className="form-label fw-semibold">
                  Nama
                </label>
                <input
                  id="nama"
                  name="nama"
                  className="form-control"
                  placeholder="Nama lengkap"
                  required
                />
              </div>
              <div className="col-12">
                <label htmlFor="pesan" className="form-label fw-semibold">
                  Pesan
                </label>
                <textarea
                  id="pesan"
                  name="pesan"
                  className="form-control"
                  placeholder="Tulis ucapan terbaikmu di sini"
                  rows={3}
                  required
                />
              </div>
              <div className="col-12 d-flex justify-content-between align-items-center">
                <button type="submit" className="btn btn-outline-auto rounded-pill px-4">
                  Kirim Ucapan
                </button>
                <p
                  className="m-0 small text-secondary"
                  data-form-status
                  role="status"
                  aria-live="polite"
                />
              </div>
            </form>
          </div>
          <div className="mt-5">
            <h3 className="font-esthetic text-center mb-3" style={{ fontSize: '2rem' }}>
              Ucapan Teman &amp; Keluarga
            </h3>
            <div className="list-group list-group-flush">
              {messages.map((message) => (
                <div key={message.id} className="list-group-item bg-transparent border-secondary-subtle border rounded-4 mb-3 p-3">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h4 className="m-0" style={{ fontSize: '1rem' }}>
                      {message.name}
                    </h4>
                    <span className="badge bg-theme-auto text-uppercase" style={{ fontSize: '0.65rem' }}>
                      {message.status}
                    </span>
                  </div>
                  <p className="mb-2" style={{ fontSize: '0.95rem' }}>
                    {message.message}
                  </p>
                  <small className="text-secondary">{message.createdAt}</small>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
