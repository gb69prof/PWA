const originalBtn=document.getElementById('toggleOriginal');
const notesBtn=document.getElementById('toggleNotes');
const printBtn=document.getElementById('printPage');
const truePage=document.getElementById('truePage');
const originalPage=document.getElementById('originalPage');
const notesPanel=document.getElementById('notesPanel');
const notes=document.getElementById('notes');
originalBtn.addEventListener('click',()=>{const show=originalPage.hidden;originalPage.hidden=!show;truePage.hidden=show;originalBtn.textContent=show?'Testo vero':'Originale'});
notesBtn.addEventListener('click',()=>{notesPanel.hidden=!notesPanel.hidden});
printBtn.addEventListener('click',()=>window.print());
notes.value=localStorage.getItem('foscolo-p4-notes')||'';
notes.addEventListener('input',()=>localStorage.setItem('foscolo-p4-notes',notes.value));
if('serviceWorker' in navigator){window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}));}
