/* Pascoli01 PWA helper */
(() => {
  if (!('serviceWorker' in navigator)) return;

  const BANNER_ID = 'pwa-update-banner';

  function showUpdateBanner(registration) {
    if (document.getElementById(BANNER_ID)) return;

    const banner = document.createElement('div');
    banner.id = BANNER_ID;
    banner.style.cssText = [
      'position:fixed',
      'left:16px',
      'right:16px',
      'bottom:16px',
      'z-index:9999',
      'background:#961B2B',
      'color:#fff',
      'padding:12px 14px',
      'border-radius:14px',
      'box-shadow:0 10px 28px rgba(0,0,0,.20)',
      'display:flex',
      'gap:12px',
      'align-items:center',
      'justify-content:space-between',
      'font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif',
      'font-size:14px'
    ].join(';');

    const msg = document.createElement('div');
    msg.textContent = 'Aggiornamento disponibile';
    msg.style.cssText = 'font-weight:600';

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.textContent = 'Ricarica';
    btn.style.cssText = [
      'border:0',
      'background:#fff',
      'color:#961B2B',
      'font-weight:800',
      'padding:10px 12px',
      'border-radius:12px',
      'cursor:pointer'
    ].join(';');

    btn.addEventListener('click', () => {
      if (!registration || !registration.waiting) {
        window.location.reload();
        return;
      }
      registration.waiting.postMessage({ type: 'SKIP_WAITING' });
    });

    banner.appendChild(msg);
    banner.appendChild(btn);
    document.body.appendChild(banner);
  }

  window.addEventListener('load', async () => {
    try {
      const registration = await navigator.serviceWorker.register('./service-worker.js', { scope: './' });

      // If there's already a waiting worker, show banner immediately
      if (registration.waiting) showUpdateBanner(registration);

      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        if (!newWorker) return;
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            showUpdateBanner(registration);
          }
        });
      });

      navigator.serviceWorker.addEventListener('controllerchange', () => {
        // New SW has taken control
        window.location.reload();
      });

    } catch (err) {
      // Silent fail: do not break the app
      console.warn('PWA: SW registration failed', err);
    }
  });
})();
