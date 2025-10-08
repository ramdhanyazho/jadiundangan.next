(function () {
  if (typeof window === 'undefined') {
    return;
  }

  const ready = (fn) => {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn, { once: true });
    } else {
      fn();
    }
  };

  ready(() => {
    const root = document.getElementById('undangan4x');
    if (!root) {
      return;
    }

    const tabButtons = Array.from(root.querySelectorAll('[data-tab-target]'));
    const sections = Array.from(root.querySelectorAll('[data-section-id]'));

    const activateTab = (id) => {
      tabButtons.forEach((button) => {
        const target = button.getAttribute('data-tab-target');
        if (!target) return;
        if (target === id) {
          button.classList.add('active');
          button.setAttribute('aria-current', 'page');
        } else {
          button.classList.remove('active');
          button.removeAttribute('aria-current');
        }
      });
    };

    tabButtons.forEach((button) => {
      button.addEventListener('click', (event) => {
        const id = button.getAttribute('data-tab-target');
        if (!id) return;
        const target = root.querySelector(`[data-section-id="${CSS.escape(id)}"]`);
        if (!target) return;
        event.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        activateTab(id);
      });
    });

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const id = entry.target.getAttribute('data-section-id');
              if (id) {
                activateTab(id);
              }
            }
          });
        },
        { rootMargin: '-40% 0px -40% 0px', threshold: 0.25 }
      );
      sections.forEach((section) => observer.observe(section));
    }

    const modal = root.querySelector('[data-modal="gallery"]');
    const modalImage = modal ? modal.querySelector('img') : null;
    const closeModal = () => {
      if (!modal) return;
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
      modal.setAttribute('hidden', '');
      modalImage && (modalImage.src = '');
    };

    if (modal) {
      modal.addEventListener('click', (event) => {
        if (event.target === modal || event.target.hasAttribute('data-modal-close')) {
          closeModal();
        }
      });
      modal.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
          closeModal();
        }
      });
    }

    root.querySelectorAll('[data-gallery-image]').forEach((element) => {
      element.addEventListener('click', () => {
        if (!modal || !modalImage) return;
        const fullSrc = element.getAttribute('data-full') || element.getAttribute('src');
        if (!fullSrc) return;
        modalImage.src = fullSrc;
        modalImage.alt = element.getAttribute('alt') || '';
        modal.removeAttribute('hidden');
        modal.classList.add('open');
        modal.setAttribute('aria-hidden', 'false');
        modal.focus({ preventScroll: true });
      });
    });

    const form = root.querySelector('form[data-ucapan-form]');
    const statusEl = form ? form.querySelector('[data-form-status]') : null;
    if (form) {
      form.addEventListener('submit', async (event) => {
        event.preventDefault();
        if (!statusEl) return;
        statusEl.textContent = 'Mengirim...';
        statusEl.dataset.state = 'loading';
        const formData = new FormData(form);
        const payload = {
          nama: formData.get('nama')?.toString().trim() ?? '',
          pesan: formData.get('pesan')?.toString().trim() ?? '',
        };

        try {
          const response = await fetch('/api/ucapan', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          });
          const result = await response.json();
          if (response.ok && result?.ok) {
            statusEl.textContent = 'Terima kasih! Ucapanmu sudah kami terima.';
            statusEl.dataset.state = 'success';
            form.reset();
          } else {
            throw new Error('Gagal mengirim ucapan');
          }
        } catch (error) {
          statusEl.textContent = 'Maaf, terjadi kesalahan. Coba lagi nanti.';
          statusEl.dataset.state = 'error';
        }
      });
    }
  });
})();
