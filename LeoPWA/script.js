
(function(){
  const sidebar = document.getElementById('sidebar');
  const overlay = document.querySelector('.overlay');
  document.querySelectorAll('[data-open-sidebar]').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      sidebar?.classList.add('open');
      overlay?.classList.add('show');
    });
  });
  document.querySelectorAll('[data-close-sidebar]').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      sidebar?.classList.remove('open');
      overlay?.classList.remove('show');
    });
  });

  document.querySelectorAll('.media-tab').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const parent = btn.parentElement;
      parent.querySelectorAll('.media-tab').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      const container = parent.nextElementSibling;
      container.querySelectorAll('.tab-pane').forEach(p=>p.classList.remove('active'));
      container.querySelector('#'+btn.dataset.target)?.classList.add('active');
    });
  });

  const notesPanel = document.getElementById('notesPanel');
  const notesText = document.getElementById('notesText');
  const openNotes = document.getElementById('open-notes');
  const closeNotes = document.getElementById('closeNotes');
  const downloadNotes = document.getElementById('downloadNotes');
  const pageId = document.body.dataset.page || 'pagina';
  const noteKey = 'eco-leopardi-notes-' + pageId;

  if (notesText) {
    notesText.value = localStorage.getItem(noteKey) || '';
    notesText.addEventListener('input', ()=>localStorage.setItem(noteKey, notesText.value));
  }
  openNotes?.addEventListener('click', ()=>{ notesPanel.hidden = false; });
  closeNotes?.addEventListener('click', ()=>{ notesPanel.hidden = true; });
  downloadNotes?.addEventListener('click', ()=>{
    const blob = new Blob([notesText.value], {type:'text/plain;charset=utf-8'});
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = pageId + '-appunti.txt';
    link.click();
    URL.revokeObjectURL(link.href);
  });

  const dragHandle = document.getElementById('notesDragHandle');
  if (dragHandle && notesPanel) {
    let active=false, startX=0, startY=0, panelX=0, panelY=0;
    dragHandle.addEventListener('pointerdown', (e)=>{
      active=true;
      startX=e.clientX; startY=e.clientY;
      const rect = notesPanel.getBoundingClientRect();
      panelX=rect.left; panelY=rect.top;
      notesPanel.style.left = panelX + 'px';
      notesPanel.style.top = panelY + 'px';
      notesPanel.style.right = 'auto';
      notesPanel.style.bottom = 'auto';
      dragHandle.setPointerCapture(e.pointerId);
    });
    dragHandle.addEventListener('pointermove', (e)=>{
      if(!active) return;
      const x = panelX + (e.clientX - startX);
      const y = panelY + (e.clientY - startY);
      notesPanel.style.left = Math.max(8, Math.min(window.innerWidth - notesPanel.offsetWidth - 8, x)) + 'px';
      notesPanel.style.top = Math.max(8, Math.min(window.innerHeight - notesPanel.offsetHeight - 8, y)) + 'px';
    });
    dragHandle.addEventListener('pointerup', ()=> active=false);
  }

  const imageModal = document.getElementById('imageModal');
  const imageModalImg = document.getElementById('imageModalImg');
  const imageModalCaption = document.getElementById('imageModalCaption');
  document.querySelectorAll('[data-modal-image]').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      imageModal.hidden = false;
      imageModalImg.src = btn.dataset.modalImage;
      imageModalImg.alt = btn.dataset.modalAlt || '';
      imageModalCaption.textContent = btn.dataset.modalAlt || '';
    });
  });
  document.getElementById('closeImageModal')?.addEventListener('click', ()=> imageModal.hidden = true);
  imageModal?.addEventListener('click', (e)=>{ if (e.target === imageModal) imageModal.hidden = true; });

  const glossary = window.LEOPARDI_GLOSSARY || {};
  const article = document.querySelector('.lesson-article');

  function escapeRegExp(s){
    return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  function wrapGlossaryTerms(root){
    if (!root || !Object.keys(glossary).length) return;
    const terms = Object.keys(glossary).sort((a,b)=>b.length-a.length);
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(node){
        if (!node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        if (node.parentElement && (node.parentElement.closest('.glossary-term, h1, h2, h3, h4, h5, h6, script, style, textarea, button, a'))) {
          return NodeFilter.FILTER_REJECT;
        }
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    const textNodes = [];
    while (walker.nextNode()) textNodes.push(walker.currentNode);

    textNodes.forEach(node=>{
      const original = node.nodeValue;
      let replaced = original;
      let changed = false;
      terms.forEach(term=>{
        const re = new RegExp(`(^|[^\\p{L}])(${escapeRegExp(term)})(?=[^\\p{L}]|$)`, 'giu');
        if (re.test(replaced)) {
          replaced = replaced.replace(re, (_, prefix, match)=> `${prefix}<span class="glossary-term" data-term="${term}">${match}</span>`);
          changed = true;
        }
      });
      if (changed) {
        const span = document.createElement('span');
        span.innerHTML = replaced;
        node.replaceWith(...span.childNodes);
      }
    });
  }

  wrapGlossaryTerms(article);

  const glossaryModal = document.getElementById('glossaryModal');
  const glossaryTitle = document.getElementById('glossaryTitle');
  const glossaryDef = document.getElementById('glossaryDef');
  const glossaryQuote = document.getElementById('glossaryQuote');
  const glossaryLinks = document.getElementById('glossaryLinks');
  let currentTerm = null;

  article?.addEventListener('click', (e)=>{
    const target = e.target.closest('.glossary-term');
    if (!target) return;
    currentTerm = target.dataset.term;
    const item = glossary[currentTerm];
    if (!item) return;
    glossaryTitle.textContent = currentTerm;
    glossaryDef.textContent = item.def;
    glossaryQuote.textContent = item.quote;
    glossaryLinks.innerHTML = '';
    (item.links || []).forEach(link=>{
      const a = document.createElement('a');
      a.href = link;
      const label = link.replace('.html','').replaceAll('-', ' ');
      a.textContent = label.charAt(0).toUpperCase() + label.slice(1);
      glossaryLinks.appendChild(a);
    });
    glossaryModal.hidden = false;
  });

  document.getElementById('closeGlossary')?.addEventListener('click', ()=> glossaryModal.hidden = true);
  glossaryModal?.addEventListener('click', (e)=>{ if (e.target === glossaryModal) glossaryModal.hidden = true; });

  document.getElementById('highlightOccurrences')?.addEventListener('click', ()=>{
    if (!article || !currentTerm) return;
    article.querySelectorAll('.highlighted-occurrence').forEach(el=> el.classList.remove('highlighted-occurrence'));
    article.querySelectorAll('.glossary-term').forEach(el=>{
      if (el.dataset.term === currentTerm) el.classList.add('highlighted-occurrence');
    });
    article.querySelector('.highlighted-occurrence')?.scrollIntoView({behavior:'smooth', block:'center'});
    glossaryModal.hidden = true;
  });

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', ()=> navigator.serviceWorker.register('service-worker.js').catch(()=>{}));
  }
})();
