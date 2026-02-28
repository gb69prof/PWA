(() => {
  if (!('serviceWorker' in navigator)) return;

  let newWorker = null;

  function showUpdateBanner() {
    const banner = document.getElementById('updateBanner');
    if (!banner) return;
    banner.classList.add('show');

    const btn = banner.querySelector('button');
    if (btn) {
      btn.onclick = () => {
        if (newWorker) newWorker.postMessage({ type: 'SKIP_WAITING' });
      };
    }
  }

  window.addEventListener('load', async () => {
    try {
      const reg = await navigator.serviceWorker.register('./service-worker.js', { scope: './' });

      reg.addEventListener('updatefound', () => {
        const installing = reg.installing;
        if (!installing) return;

        installing.addEventListener('statechange', () => {
          if (installing.state === 'installed' && navigator.serviceWorker.controller) {
            newWorker = installing;
            showUpdateBanner();
          }
        });
      });

      navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (sessionStorage.getItem('pwa-reloaded') === '1') return;
        sessionStorage.setItem('pwa-reloaded', '1');
        window.location.reload();
      });
    } catch (err) {
      console.warn('SW registration failed', err);
    }
  });
})();
