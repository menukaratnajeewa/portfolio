(function(){
"use strict";

/* ============================================================
   DATA — edit these to update site content
============================================================ */
/* TOOL_LOGOS — official software logos, served from assets/icons/.
   These are the open-source Devicon logo set (MIT licensed).
   The logos are decorative (the tool name sits right beside them), so alt is empty. */
const TOOL_LOGOS = {
  fusion: '<img src="assets/icons/fusion360.svg" alt="" loading="lazy" decoding="async">',
  matlab: '<img src="assets/icons/matlab.svg" alt="" loading="lazy" decoding="async">',
  python: '<img src="assets/icons/python.svg" alt="" loading="lazy" decoding="async">',
  web: `
    <img src="assets/icons/html5.svg" alt="" loading="lazy" decoding="async">
    <img src="assets/icons/css3.svg" alt="" loading="lazy" decoding="async">
    <img src="assets/icons/javascript.svg" alt="" loading="lazy" decoding="async">
  `,
  data: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false"><path d="M4 20V10M10 20V4M16 20v-7M21 20H3" stroke="#1D6F42" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>'
};

const TOOLS = [
  { name: "Fusion 360", desc: "Computer-aided design focused on automotive design", color: "fusion", icon: TOOL_LOGOS.fusion, tag: "ITEM 01" },
  {
    name: "MATLAB", desc: "App Designer & numerical analysis", color: "matlab", icon: TOOL_LOGOS.matlab, tag: "ITEM 02",
    certs: ["assets/certs/MATLAB Onramp.pdf", "assets/certs/MATLAB Advanced Course.pdf"]
  },
  {
    name: "Data Science & Analysis", desc: "Statistical modelling, data cleaning & visualisation", color: "data", icon: TOOL_LOGOS.data, tag: "ITEM 03",
    certs: ["assets/certs/Coursera Data 2.pdf", "assets/certs/Coursera Data Analysis 1.pdf", "assets/certs/Coursera Data Analysis.pdf", "assets/certs/Coursera Python 2.pdf"]
  },
  {
    name: "Software Programming & Machine Learning", desc: "Engineering scripts, automation & ML models", color: "python", icon: TOOL_LOGOS.python, tag: "ITEM 04",
    certs: ["assets/certs/Coursera Machine Learning.pdf", "assets/certs/Coursera Python 1.pdf"]
  },
  {
    name: "HTML / CSS / JS", desc: "Web tools & this site", color: "web", icon: TOOL_LOGOS.web, tag: "ITEM 05",
    certs: ["assets/certs/Coursera HTML 2.pdf"]
  }
];

const IMG_ICON = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false"><rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" stroke-width="1.6"/><circle cx="8.5" cy="9.5" r="1.5" stroke="currentColor" stroke-width="1.6"/><path d="M21 16l-5.5-5.5a1.5 1.5 0 00-2.1 0L4 19" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
/* small stacked-photos icon used on CAD thumbnails that have multiple angles */
const IMG_ICON_STACK = '<svg viewBox="0 0 24 24" fill="none" width="11" height="11" aria-hidden="true" focusable="false"><rect x="3" y="7" width="14" height="12" rx="1.5" stroke="currentColor" stroke-width="1.8"/><path d="M7 7V6a2 2 0 012-2h9a2 2 0 012 2v9a2 2 0 01-2 2h-1" stroke="currentColor" stroke-width="1.8"/></svg>';

/* CAD album — Fusion 360 model renders.
   Each design can have MULTIPLE files (different angles of the same model) —
   just add more paths to the "images" array for a given design. Images (.png/.jpg/…)
   and animation clips (.mov/.mp4/.webm) can be mixed; the first *image* is the thumbnail.
   For the widest browser support, export clips as MP4 (H.264) — .mov will not play in Firefox. */
const CAD_RENDERS = [
  { images: ["assets/cad/Rim 2.png", "assets/cad/Rim 1.png", "assets/cad/Rim 3.png", "assets/cad/Tire 1.png", "assets/cad/Tire 2.png", "assets/cad/Tire 3.png"], caption: "Lamborghini-inspired rim and tyre design" },
  { images: ["assets/cad/SA1.png", "assets/cad/SA2.png", "assets/cad/SA3.png"], caption: "Automobile shock absorber" },
  { images: ["assets/cad/brake 1.png", "assets/cad/brake 2.png", "assets/cad/brake 3.png", "assets/cad/brake 4.png"], caption: "Brake disc with a Brembo-branded brake caliper" },
  { images: ["assets/cad/Steering Wheel TN.png", "assets/cad/Steering Wheel 2.png", "assets/cad/Steering Wheel 3.png", "assets/cad/Steering Wheel 5.png"], caption: "Racing-style steering wheel" },
  { images: ["assets/cad/CS TN.png", "assets/cad/CS 1.png", "assets/cad/CS 2.png", "assets/cad/CS 3.png", "assets/cad/CS 4.png", "assets/cad/Crankshaft Animation.mov"], caption: "12-cylinder V-engine crankshaft assembly" },
  { images: ["assets/cad/Gearbox 1.png", "assets/cad/Gearbox 2.png", "assets/cad/Gearbox.mov", "assets/cad/Gearbox 2.mov"], caption: "Constant-mesh gearbox assembly" }
];

/* Certifications — categorized for clean organization.
   The list is displayed newest-first, so entries can be added in any order. */
const CERTIFICATIONS = [
  { name: "Private Tutor", issuer: "Ministry of Human Resources and Emiratisation", date: "June 2026", color: "brass", category: "academic" },
  { name: "Efficient and Robust MATLAB Programming", issuer: "MathWorks", date: "August 2026", color: "blue", credentialType: "link", credentialUrl: "https://www.credly.com/badges/b5ba2ae4-0f47-4064-a16b-4d5918df8f9b/linked_in_profile", category: "engineering" },
  { name: "Programming for Everybody (Getting Started with Python)", issuer: "Coursera & University of Michigan", date: "July 2023", color: "blue", credentialType: "link", credentialUrl: "https://www.coursera.org/account/accomplishments/verify/4K8Q9P6AV2HY", category: "programming" },
  { name: "Data Science Math Skills", issuer: "Duke University", date: "August 2023", color: "orange", credentialType: "link", credentialUrl: "https://www.coursera.org/account/accomplishments/verify/A9ELPLPGFEVU", category: "programming" },
  { name: "HTML, CSS, and Javascript for Web Developers", issuer: "Johns Hopkins University", date: "July 2023", color: "brass", credentialType: "link", credentialUrl: "https://www.coursera.org/account/accomplishments/verify/6L9LJGRHYP92", category: "programming" },
  { name: "GE Aerospace - Explore Electrical Engineering Job Simulation", issuer: "Forage", date: "June 2026", color: "blue", credentialType: "link", credentialUrl: "https://www.theforage.com/completion-certificates/ay2tsYxaTif7Nt6z7/ntFrRvKxX5AmquXRr_ay2tsYxaTif7Nt6z7_6a342df5fc33e5c800739740_1782128490240_completion_certificate.pdf", category: "engineering" },
  { name: "GEMS-SU Global Futures Curriculum Diploma", issuer: "GEMS Education", date: "June 2023", color: "orange", credentialType: "pdf", credentialUrl: "assets/certs/Global Futures Diploma.pdf", category: "academic" },
  { name: "Engineers Without Borders UK - Globally Responsible Engineering Job Simulation", issuer: "Forage", date: "June 2026", color: "brass", credentialType: "link", credentialUrl: "https://www.theforage.com/completion-certificates/WRaqrfXsBgp477LWq/4b5788DoosozTZEfv_WRaqrfXsBgp477LWq_6a342df5fc33e5c800739740_1781876090623_completion_certificate.pdf", category: "engineering" },
  { name: "IELTS Academic - Band 8.0", issuer: "IDP Education UAE", date: "August 2023", color: "orange", category: "academic" },
  { name: "Responsible Business and Sustainability Leadership", issuer: "Canvas Credentials (Badgr)", date: "September 2026", color: "orange", credentialType: "link", credentialUrl: "https://birmingham.badges.parchment.eu/public/credentials/dMjb_N05Rl6cVHBIkh1mLQ?identity__email=mar469@student.bham.ac.uk", category: "academic" },
];

/* ============================================================
   HELPERS
============================================================ */
const $ = (id) => document.getElementById(id);
const root = document.documentElement;
const hasIO = "IntersectionObserver" in window;
const VIDEO_RE = /\.(mov|mp4|m4v|webm)(\?.*)?$/i;

/* escape text/attribute values before they go into innerHTML */
function esc(value){
  return String(value).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

/* ============================================================
   YEAR
============================================================ */
const yearEl = $("year");
if(yearEl) yearEl.textContent = new Date().getFullYear();

/* ============================================================
   THEME — "Paper" (light) / "Blueprint" (dark)
   The saved / system theme is applied by a tiny inline script in <head> before first paint;
   this code keeps the toggle, aria state and <meta theme-color> in sync.
   A preference is only stored when the visitor actually flips the switch,
   so people who never touch it keep following their system setting.
============================================================ */
const themeToggle = $("themeToggle");
const themeColorMeta = $("themeColor");
const systemDark = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;

function storedTheme(){
  try{
    const t = localStorage.getItem("theme");
    return (t === "dark" || t === "light") ? t : null;
  }catch(e){ return null; }
}
function setTheme(theme, persist){
  root.setAttribute("data-theme", theme);
  themeToggle.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
  if(themeColorMeta) themeColorMeta.setAttribute("content", theme === "dark" ? "#0E2A44" : "#FAF8F2");
  if(persist){ try{ localStorage.setItem("theme", theme); }catch(e){} }
}
setTheme(storedTheme() || (systemDark && systemDark.matches ? "dark" : "light"), false);
themeToggle.addEventListener("click", () => {
  setTheme(root.getAttribute("data-theme") === "dark" ? "light" : "dark", true);
});
if(systemDark && systemDark.addEventListener){
  systemDark.addEventListener("change", (e) => {
    if(!storedTheme()) setTheme(e.matches ? "dark" : "light", false);
  });
}

/* ============================================================
   NAV
============================================================ */
const navToggle = $("navToggle");
const navlinks = $("navlinks");

function setNav(open){
  navlinks.classList.toggle("is-open", open);
  navToggle.setAttribute("aria-expanded", open ? "true" : "false");
}
navToggle.addEventListener("click", () => setNav(!navlinks.classList.contains("is-open")));
navlinks.addEventListener("click", (e) => { if(e.target.closest("a")) setNav(false); });
document.addEventListener("click", (e) => {
  if(navlinks.classList.contains("is-open") && !e.target.closest(".topbar")) setNav(false);
});
document.addEventListener("keydown", (e) => {
  if(e.key === "Escape" && navlinks.classList.contains("is-open")){
    setNav(false);
    navToggle.focus();
  }
});

/* Scroll-spy: highlight the nav link whose section sits under the middle of the viewport.
   Keeps a set of visible sections so the highlight clears at the top of the page and
   falls back correctly when a nested section (Experience inside About) scrolls out. */
const navAnchors = Array.from(document.querySelectorAll("[data-nav]"));
const navTargets = navAnchors.map((a) => document.querySelector(a.getAttribute("href"))).filter(Boolean);
if(hasIO){
  const inView = new Set();
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if(entry.isIntersecting) inView.add(entry.target); else inView.delete(entry.target);
    });
    let active = null;
    navTargets.forEach((t) => { if(inView.has(t)) active = t; });   /* later (more specific) section wins */
    navAnchors.forEach((a) => {
      const on = !!active && a.getAttribute("href") === "#" + active.id;
      a.classList.toggle("is-active", on);
      if(on) a.setAttribute("aria-current", "location"); else a.removeAttribute("aria-current");
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  navTargets.forEach((t) => spy.observe(t));
}

/* ============================================================
   SCROLL REVEAL
   Elements only start hidden when JS is running (html.js), and they are
   revealed immediately if IntersectionObserver isn't available.
============================================================ */
const revealObserver = hasIO
  ? new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if(entry.isIntersecting){
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 })
  : null;
function reveal(el){
  if(revealObserver) revealObserver.observe(el); else el.classList.add("is-visible");
}
document.querySelectorAll(".reveal").forEach(reveal);

/* ============================================================
   MODALS — shared open / close / focus handling
   While a viewer is open the rest of the page is made inert (no tabbing, no screen-reader
   access behind it), Tab is kept inside the dialog, and focus returns to whatever opened it.
============================================================ */
const pageRegions = ["header", "main", "footer"].map((sel) => document.querySelector(sel)).filter(Boolean);
let lastFocused = null;

function openModal(modal, focusTarget){
  lastFocused = document.activeElement;
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  pageRegions.forEach((el) => { el.inert = true; });
  document.body.style.overflow = "hidden";
  if(focusTarget) focusTarget.focus();
}
function closeModal(modal){
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  pageRegions.forEach((el) => { el.inert = false; });
  document.body.style.overflow = "";
  if(lastFocused && typeof lastFocused.focus === "function") lastFocused.focus();
  lastFocused = null;
}
function trapFocus(e, modal){
  const focusable = Array.from(modal.querySelectorAll("button:not([disabled]), iframe, video[controls]"))
    .filter((el) => !el.hidden && el.getClientRects().length > 0);
  if(focusable.length === 0) return;
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if(e.shiftKey && document.activeElement === first){ e.preventDefault(); last.focus(); }
  else if(!e.shiftKey && document.activeElement === last){ e.preventDefault(); first.focus(); }
}

/* ============================================================
   CERTIFICATE VIEWER — full-screen, supports multiple PDFs
============================================================ */
const certViewer = $("certViewer");
const certViewerFrame = $("certViewerFrame");
const certViewerTitle = $("certViewerTitle");
const certViewerCount = $("certViewerCount");
const certViewerPrev = $("certViewerPrev");
const certViewerNext = $("certViewerNext");
const certViewerClose = $("certViewerClose");

let activeCertPaths = [];
let activeCertLabel = "Certificate";
let activeCertIndex = 0;

function renderCertFrame(){
  const total = activeCertPaths.length;
  certViewerFrame.src = activeCertPaths[activeCertIndex] || "about:blank";
  certViewerFrame.title = `${activeCertLabel} — certificate ${activeCertIndex + 1} of ${total}`;
  certViewerCount.textContent = `${activeCertIndex + 1} / ${total}`;
  certViewerPrev.disabled = activeCertIndex === 0;
  certViewerNext.disabled = activeCertIndex === total - 1;
}
function openCertViewer(paths, label){
  activeCertPaths = (paths && paths.length) ? paths : [""];
  activeCertLabel = label || "Certificate";
  activeCertIndex = 0;
  certViewerTitle.textContent = activeCertLabel;
  certViewer.classList.toggle("is-single", activeCertPaths.length <= 1);
  renderCertFrame();
  openModal(certViewer, certViewerClose);
}
function closeCertViewer(){
  closeModal(certViewer);
  certViewerFrame.src = "about:blank";   /* an empty src can reload the host page in some browsers */
}
certViewerPrev.addEventListener("click", () => {
  if(activeCertIndex > 0){ activeCertIndex--; renderCertFrame(); }
});
certViewerNext.addEventListener("click", () => {
  if(activeCertIndex < activeCertPaths.length - 1){ activeCertIndex++; renderCertFrame(); }
});
certViewerClose.addEventListener("click", closeCertViewer);

/* ============================================================
   CAD VIEWER — full-screen gallery for images and animation clips
============================================================ */
const cadViewer = $("cadViewer");
const cadViewerImg = $("cadViewerImg");
const cadViewerVideo = $("cadViewerVideo");
const cadViewerTitle = $("cadViewerTitle");
const cadViewerCount = $("cadViewerCount");
const cadViewerPrev = $("cadViewerPrev");
const cadViewerNext = $("cadViewerNext");
const cadViewerClose = $("cadViewerClose");

let activeCadImages = [];
let activeCadCaption = "";
let activeCadIndex = 0;

function clearCadMedia(){
  cadViewerVideo.pause();
  cadViewerVideo.removeAttribute("src");
  cadViewerVideo.load();
  cadViewerImg.removeAttribute("src");
}

function renderCadModal(){
  if(activeCadImages.length === 0) return;
  const total = activeCadImages.length;
  const src = activeCadImages[activeCadIndex];

  cadViewerTitle.textContent = activeCadCaption;
  cadViewerCount.textContent = `${activeCadIndex + 1} / ${total}`;
  cadViewerPrev.disabled = activeCadIndex === 0;
  cadViewerNext.disabled = activeCadIndex === total - 1;

  clearCadMedia();
  if(VIDEO_RE.test(src)){
    /* .mov/.mp4 files can't be shown by <img> — use a <video> so animation clips actually play */
    cadViewerImg.hidden = true;
    cadViewerVideo.hidden = false;
    cadViewerVideo.setAttribute("aria-label", `${activeCadCaption} — animation ${activeCadIndex + 1} of ${total}`);
    cadViewerVideo.src = src;
    const started = cadViewerVideo.play();
    if(started && typeof started.catch === "function") started.catch(() => {});
  } else {
    cadViewerVideo.hidden = true;
    cadViewerImg.hidden = false;
    cadViewerImg.alt = `${activeCadCaption} — view ${activeCadIndex + 1} of ${total}`;
    cadViewerImg.src = src;
  }
}

/* Opens the viewer scoped to ONE design's files — prev/next scrolls
   through that design's angles only, not the whole album. */
function openCadViewer(images, caption){
  const valid = (images || []).filter((src) => src && src.trim() !== "");
  if(valid.length === 0) return;
  activeCadImages = valid;
  activeCadCaption = caption || "CAD Render";
  activeCadIndex = 0;
  cadViewer.classList.toggle("is-single", valid.length <= 1);
  renderCadModal();
  openModal(cadViewer, cadViewerClose);
}
function closeCadViewer(){
  closeModal(cadViewer);
  clearCadMedia();
}

cadViewerPrev.addEventListener("click", () => {
  if(activeCadIndex > 0){ activeCadIndex--; renderCadModal(); }
});
cadViewerNext.addEventListener("click", () => {
  if(activeCadIndex < activeCadImages.length - 1){ activeCadIndex++; renderCadModal(); }
});
cadViewerClose.addEventListener("click", closeCadViewer);
/* clicking the dark backdrop (not the image / buttons) closes the viewer */
cadViewer.addEventListener("click", (e) => { if(e.target === cadViewer) closeCadViewer(); });

/* keyboard: Esc closes, arrows step, Tab stays inside the open viewer */
document.addEventListener("keydown", (e) => {
  const modal = certViewer.classList.contains("is-open") ? certViewer
              : cadViewer.classList.contains("is-open") ? cadViewer : null;
  if(!modal) return;
  const isCert = modal === certViewer;

  if(e.key === "Escape"){
    e.preventDefault();
    if(isCert) closeCertViewer(); else closeCadViewer();
  } else if(e.key === "Tab"){
    trapFocus(e, modal);
  } else if((e.key === "ArrowLeft" || e.key === "ArrowRight") && !(e.target && e.target.tagName === "VIDEO")){
    /* (arrow keys keep seeking inside a focused video) */
    const btn = e.key === "ArrowLeft" ? (isCert ? certViewerPrev : cadViewerPrev)
                                      : (isCert ? certViewerNext : cadViewerNext);
    if(!btn.disabled) btn.click();
  }
});

/* ============================================================
   SKILLS — tool logo grid
============================================================ */
const skillsGrid = $("skillsGrid");
TOOLS.forEach((t) => {
  const card = document.createElement("div");
  card.className = "toolbadge reveal";
  card.innerHTML = `
    <span class="toolbadge__tag">${esc(t.tag || "")}</span>
    <div class="toolbadge__logo toolbadge__logo--${esc(t.color)}">${t.icon}</div>
    <div class="toolbadge__info">
      <strong>${esc(t.name)}</strong>
      <span>${esc(t.desc)}</span>
      ${t.certs ? `<button class="toolbadge__certbtn" type="button" aria-label="View certification${t.certs.length > 1 ? "s" : ""} for ${esc(t.name)}">View certification${t.certs.length > 1 ? "s" : ""} →</button>` : ""}
    </div>
  `;
  skillsGrid.appendChild(card);
  if(t.certs){
    card.querySelector(".toolbadge__certbtn").addEventListener("click", () => openCertViewer(t.certs, t.name));
  }
  reveal(card);
});

/* ============================================================
   CAD ALBUM — Fusion 360 renders
   Filled plates are real <button>s, so they work with keyboard and screen readers.
============================================================ */
const cadAlbum = $("cadAlbum");

CAD_RENDERS.forEach((r, i) => {
  const files = (r.images || []).filter((src) => src && src.trim() !== "");
  const caption = (r.caption || ("Fusion 360 render " + (i + 1))).trim();
  const thumb = files.find((src) => !VIDEO_RE.test(src));   /* a clip can't be a thumbnail */
  let slot;

  if(thumb){
    slot = document.createElement("button");
    slot.type = "button";
    slot.className = "cadalbum__slot cadalbum__slot--filled reveal";
    slot.setAttribute("data-caption", caption);
    slot.setAttribute("aria-label", `${caption} — open ${files.length} ${files.length > 1 ? "views" : "view"}`);
    slot.innerHTML = `
      <img src="${esc(thumb)}" alt="" loading="lazy" decoding="async">
      ${files.length > 1 ? `<span class="cadalbum__badge" aria-hidden="true">${IMG_ICON_STACK} ${files.length}</span>` : ""}
    `;
    slot.addEventListener("click", () => openCadViewer(files, caption));
  } else {
    slot = document.createElement("div");
    slot.className = "cadalbum__slot reveal";
    slot.innerHTML = `${IMG_ICON}<span>Add render — ${esc(caption)}</span>`;
  }
  cadAlbum.appendChild(slot);
  reveal(slot);
});

/* ============================================================
   CERTIFICATIONS — on-demand list with category filters & search
============================================================ */
const certList = $("certList");
const certSearch = $("certSearch");
const certTabs = document.querySelectorAll(".cert-tab");

const MONTHS = ["january","february","march","april","may","june","july","august","september","october","november","december"];
function monthIndex(dateStr){
  const [month, year] = String(dateStr).toLowerCase().split(/\s+/);
  return (parseInt(year, 10) || 0) * 12 + Math.max(0, MONTHS.indexOf(month));
}
/* newest first; entries with the same date keep the order they were written in */
const CERTS_NEWEST_FIRST = CERTIFICATIONS
  .map((c, i) => ({ c, i }))
  .sort((a, b) => monthIndex(b.c.date) - monthIndex(a.c.date) || a.i - b.i)
  .map((x) => x.c);

let currentCategory = null; // nothing selected by default — pick a filter (or type a search) to reveal certs
let searchQuery = "";

function renderCertifications(){
  certList.innerHTML = "";

  /* typing in the search box searches everything, even before a tab has been picked */
  const category = currentCategory || (searchQuery ? "all" : null);
  if(!category){
    certList.innerHTML = `<div class="cert-empty">Select a filter above to view certifications.</div>`;
    return;
  }

  const q = searchQuery.toLowerCase();
  const filtered = CERTS_NEWEST_FIRST.filter((c) => {
    const matchesCat = category === "all" || c.category === category;
    const matchesSearch = !q || c.name.toLowerCase().includes(q) || c.issuer.toLowerCase().includes(q);
    return matchesCat && matchesSearch;
  });

  if(filtered.length === 0){
    certList.innerHTML = `<div class="cert-empty">No certifications found matching your criteria.</div>`;
    return;
  }

  filtered.forEach((c) => {
    const item = document.createElement("div");
    item.className = "certitem";   /* no scroll-reveal here: the list re-renders on every keystroke */

    let credentialHTML = "";
    const label = `View credential: ${esc(c.name)}`;
    if(c.credentialType === "link"){
      credentialHTML = `<a class="certitem__link" href="${esc(c.credentialUrl || "#")}" target="_blank" rel="noopener noreferrer" aria-label="${label}">View credential →</a>`;
    } else if(c.credentialType === "pdf"){
      credentialHTML = `<button class="certitem__link" type="button" aria-label="${label}">View credential →</button>`;
    }

    item.innerHTML = `
      <div class="certitem__main">
        <span class="certitem__dot" style="background:var(--${esc(c.color)})" aria-hidden="true"></span>
        <div>
          <h3 class="certitem__title">${esc(c.name)}</h3>
          <p class="certitem__issuer">${esc(c.issuer)} &bull; <span class="certitem__date">${esc(c.date)}</span></p>
        </div>
      </div>
      <div class="certitem__action">
        ${credentialHTML}
      </div>
    `;
    certList.appendChild(item);

    if(c.credentialType === "pdf"){
      item.querySelector(".certitem__link").addEventListener("click", () => openCertViewer([c.credentialUrl], c.name));
    }
  });
}

if(certSearch){
  certSearch.addEventListener("input", (e) => {
    searchQuery = e.target.value.trim();
    renderCertifications();
  });
}

certTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    certTabs.forEach((t) => {
      t.classList.remove("is-active");
      t.setAttribute("aria-pressed", "false");
    });
    tab.classList.add("is-active");
    tab.setAttribute("aria-pressed", "true");
    currentCategory = tab.getAttribute("data-category");
    renderCertifications();
  });
});

renderCertifications();

/* ============================================================
   HERO — technical drawing: spokes
   (the reduced-motion case is handled entirely in CSS)
============================================================ */
const svgNS = "http://www.w3.org/2000/svg";

function buildSpokes(containerId, cx, cy, radius, count){
  const container = $(containerId);
  if(!container) return;
  for(let i = 0; i < count; i++){
    const angle = (i / count) * Math.PI * 2;
    const line = document.createElementNS(svgNS, "line");
    line.setAttribute("x1", cx);
    line.setAttribute("y1", cy);
    line.setAttribute("x2", (cx + radius * Math.cos(angle)).toFixed(2));
    line.setAttribute("y2", (cy + radius * Math.sin(angle)).toFixed(2));
    line.setAttribute("class", "spoke");
    container.appendChild(line);
  }
}

buildSpokes("spokes", 240, 240, 96, 10);

})();
