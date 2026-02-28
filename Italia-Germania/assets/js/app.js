(function(){
  const $ = (sel, root=document) => root.querySelector(sel);

  const current = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  document.querySelectorAll('.nav a').forEach(a=>{
    const href = (a.getAttribute('href')||'').toLowerCase();
    if(href === current) a.classList.add('active');
  });

  const search = $('#navSearch');
  if(search){
    search.addEventListener('input', ()=>{
      const q = search.value.trim().toLowerCase();
      document.querySelectorAll('.nav a').forEach(a=>{
        const t = a.textContent.toLowerCase();
        a.style.display = (!q || t.includes(q)) ? 'flex' : 'none';
      });
    });
  }

  const openBtn = $('#btnVideo');
  const modal = $('#videoModal');
  const closeBtn = $('#closeVideo');
  const muteBtn = $('#toggleMute');

  let player = null;
  let apiInjected = false;

  function injectAPI(){
    if(apiInjected) return;
    apiInjected = true;
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(tag);
  }

  window.onYouTubeIframeAPIReady = function(){
    const frame = $('#ytplayer');
    if(!frame) return;
    player = new YT.Player('ytplayer', {
      events: {
        'onReady': (e)=>{
          try{ e.target.mute(); }catch(_){}
          syncMuteUI(true);
        }
      }
    });
  };

  function showModal(){
    if(!modal) return;
    modal.classList.add('show');
    modal.setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden';
  }

  function hideModal(){
    if(!modal) return;
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden','true');
    document.body.style.overflow = '';
    try{ player && player.pauseVideo(); }catch(_){}
  }

  function syncMuteUI(isMuted){
    if(!muteBtn) return;
    muteBtn.setAttribute('aria-pressed', isMuted ? 'true' : 'false');
    muteBtn.querySelector('span').textContent = isMuted ? 'Audio: OFF' : 'Audio: ON';
  }

  function toggleMute(){
    if(!player) return;
    try{
      const muted = player.isMuted();
      if(muted){ player.unMute(); syncMuteUI(false); }
      else { player.mute(); syncMuteUI(true); }
    }catch(_){}
  }

  if(openBtn && modal){
    openBtn.addEventListener('click', ()=>{
      injectAPI();
      showModal();
    });
  }
  if(closeBtn) closeBtn.addEventListener('click', hideModal);
  if(muteBtn) muteBtn.addEventListener('click', toggleMute);

  if(modal){
    modal.addEventListener('click', (e)=>{ if(e.target === modal) hideModal(); });
    document.addEventListener('keydown', (e)=>{ if(e.key === 'Escape' && modal.classList.contains('show')) hideModal(); });
  }
})();
