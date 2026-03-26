(() => {
  if (!('serviceWorker' in navigator)) return;

  let refreshing = false;
  const banner = () => document.getElementById('update-banner');
  const reloadButton = () => document.getElementById('update-reload');

  window.addEventListener('load', async () => {
    try {
      const registration = await navigator.serviceWorker.register('./service-worker.js');

      const showUpdate = () => {
        const el = banner();
        if (!el) return;
        el.classList.add('show');
        const btn = reloadButton();
        if (btn && !btn.dataset.bound) {
          btn.dataset.bound = 'true';
          btn.addEventListener('click', () => {
            if (registration.waiting) registration.waiting.postMessage({ type: 'SKIP_WAITING' });
          });
        }
      };

      if (registration.waiting) showUpdate();

      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        if (!newWorker) return;
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) showUpdate();
        });
      });

      navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (refreshing) return;
        refreshing = true;
        window.location.reload();
      });
    } catch (error) {
      console.error('Service worker registration failed:', error);
    }
  });
})();
