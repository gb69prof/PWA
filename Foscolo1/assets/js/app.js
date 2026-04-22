
const storageKey = "eco-foscolo-state-v1";

const state = {
  chapterIndex: 0,
  fontScale: 1,
  notes: {},
};

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) || "{}");
    Object.assign(state, saved);
  } catch (e) {
    console.warn("State load failed", e);
  }
}

function saveState() {
  localStorage.setItem(storageKey, JSON.stringify(state));
}

function el(tag, className, html) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (html !== undefined) node.innerHTML = html;
  return node;
}

function renderChapterCard(chapter, pageNumber, side) {
  const article = el("article", `chapter-card chapter-card--${side}`);

  const header = el("div", "chapter-card__header");
  header.innerHTML = `
    <div>
      <p class="eyebrow">${chapter.kicker}</p>
      <h2>${chapter.title}</h2>
    </div>
    <div class="book-mark">✦</div>
  `;
  article.appendChild(header);

  const grid = el("div", "chapter-card__grid");
  const body = el("div", "chapter-card__body");
  const media = el("aside", "chapter-card__media");

  chapter.sections.forEach(section => {
    const sec = el("section", "chapter-section");
    sec.appendChild(el("h3", null, section.heading));
    section.paragraphs.forEach(p => sec.appendChild(el("p", null, p)));
    body.appendChild(sec);
  });

  const imgWrap = el("div", "image-frame");
  const img = el("img");
  img.src = chapter.image;
  img.alt = chapter.title;
  img.loading = "lazy";
  imgWrap.appendChild(img);

  const sidebar = el("div", "info-box");
  sidebar.innerHTML = `<h4>${chapter.sidebarTitle}</h4>`;
  const ul = el("ul");
  chapter.sidebar.forEach(item => ul.appendChild(el("li", null, item)));
  sidebar.appendChild(ul);

  const quote = el("div", "quote-box", `<p>${chapter.quote}</p>`);

  media.appendChild(imgWrap);
  media.appendChild(sidebar);
  media.appendChild(quote);

  grid.appendChild(body);
  grid.appendChild(media);
  article.appendChild(grid);

  const footer = el("div", "chapter-card__footer");
  footer.innerHTML = `<span>${side === "left" ? "L'eco di Foscolo" : chapter.label}</span><span class="page-no">${pageNumber}</span>`;
  article.appendChild(footer);

  return article;
}

function renderIndex() {
  const list = document.getElementById("chapterList");
  list.innerHTML = "";
  window.FOSCOLO_CHAPTERS.forEach((chapter, index) => {
    const button = el("button", `chapter-chip ${index === state.chapterIndex ? "is-active" : ""}`, chapter.label);
    button.addEventListener("click", () => {
      state.chapterIndex = index;
      saveState();
      render();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    list.appendChild(button);
  });
}

function renderReader() {
  const desktop = document.getElementById("desktopSpread");
  const mobile = document.getElementById("mobilePage");
  desktop.innerHTML = "";
  mobile.innerHTML = "";

  const chapters = window.FOSCOLO_CHAPTERS;
  const current = chapters[state.chapterIndex];
  const next = chapters[(state.chapterIndex + 1) % chapters.length];

  desktop.appendChild(renderChapterCard(current, state.chapterIndex * 2 + 2, "left"));
  desktop.appendChild(renderChapterCard(next, state.chapterIndex * 2 + 3, "right"));
  mobile.appendChild(renderChapterCard(current, state.chapterIndex + 1, "right"));

  document.documentElement.style.setProperty("--reader-scale", String(state.fontScale));
  document.getElementById("currentChapterLabel").textContent = current.label;
}

function renderNotes() {
  const chapter = window.FOSCOLO_CHAPTERS[state.chapterIndex];
  const area = document.getElementById("notesArea");
  area.value = state.notes[chapter.id] || "";
}

function bindControls() {
  document.getElementById("prevBtn").addEventListener("click", () => {
    state.chapterIndex = (state.chapterIndex - 1 + window.FOSCOLO_CHAPTERS.length) % window.FOSCOLO_CHAPTERS.length;
    saveState();
    render();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  document.getElementById("nextBtn").addEventListener("click", () => {
    state.chapterIndex = (state.chapterIndex + 1) % window.FOSCOLO_CHAPTERS.length;
    saveState();
    render();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  document.getElementById("fontMinus").addEventListener("click", () => {
    state.fontScale = Math.max(0.92, +(state.fontScale - 0.04).toFixed(2));
    saveState();
    renderReader();
  });

  document.getElementById("fontPlus").addEventListener("click", () => {
    state.fontScale = Math.min(1.16, +(state.fontScale + 0.04).toFixed(2));
    saveState();
    renderReader();
  });

  document.getElementById("homeBtn").addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  document.getElementById("notesArea").addEventListener("input", (e) => {
    const chapter = window.FOSCOLO_CHAPTERS[state.chapterIndex];
    state.notes[chapter.id] = e.target.value;
    saveState();
  });
}

function render() {
  renderIndex();
  renderReader();
  renderNotes();
}

loadState();
window.addEventListener("DOMContentLoaded", () => {
  bindControls();
  render();

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./service-worker.js").catch(console.warn);
  }
});
