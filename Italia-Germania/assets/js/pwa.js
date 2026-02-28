(function(){
  if (!('serviceWorker' in navigator)) return;

  const toast = document.getElementById('updateToast');
  const btnReload = document.getElementById('btnReload');
  const btnDismiss = document.getElementById('btnDismiss');

  let waitingWorker = null;

  function showToast(){ toast && toast.classList.add('show'); }
  function hideToast(){ toast && toast.classList.remove('show'); }

  function promptRefresh(reg){
    waitingWorker = reg.waiting;
    showToast();
  }

  window.addEventListener('load', async ()=>{
    try{
      const reg = await navigator.serviceWorker.register('./service-worker.js', { scope: './' });

      if (reg.waiting) promptRefresh(reg);

      reg.addEventListener('updatefound', ()=>{
        const nw = reg.installing;
        if(!nw) return;
        nw.addEventListener('statechange', ()=>{
          if(nw.state === 'installed' && navigator.serviceWorker.controller){
            promptRefresh(reg);
          }
        });
      });

      btnReload && btnReload.addEventListener('click', ()=>{
        if(!waitingWorker) return;
        waitingWorker.postMessage({ type: 'SKIP_WAITING' });
      });
      btnDismiss && btnDismiss.addEventListener('click', hideToast);

      let refreshing = false;
      navigator.serviceWorker.addEventListener('controllerchange', ()=>{
        if(refreshing) return;
        refreshing = true;
        window.location.reload();
      });
    }catch(e){
      console.warn('SW registration failed:', e);
    }
  });
})();
