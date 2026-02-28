(function(){
  const modal = document.getElementById('modal');
  if(!modal) return;

  const titleEl = modal.querySelector('[data-modal-title]');
  const bodyEl  = modal.querySelector('[data-modal-body]');
  const closeBtn = modal.querySelector('[data-modal-close]');

  const content = window.__POPUPS__ || {};

  function openModal(key){
    const item = content[key];
    if(!item) return;
    titleEl.textContent = item.title;
    bodyEl.innerHTML = item.body;
    modal.setAttribute('aria-hidden', 'false');
    closeBtn.focus({preventScroll:true});
  }
  function closeModal(){ modal.setAttribute('aria-hidden', 'true'); }

  document.addEventListener('click', (e)=>{
    const t = e.target.closest('.term');
    if(t){ e.preventDefault(); openModal(t.dataset.popup); return; }

    const close = e.target.closest('[data-modal-close]');
    if(close){ e.preventDefault(); closeModal(); }
  });

  document.addEventListener('keydown', (e)=>{
    if(modal.getAttribute('aria-hidden')==='false' && e.key==='Escape') closeModal();
  });

  modal.addEventListener('click', (e)=>{
    if(e.target === modal) closeModal();
  });
})();
