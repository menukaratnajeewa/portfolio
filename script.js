(function(){
"use strict";

/* ============================================================
   DATA — edit these to update site content
============================================================ */
/* TOOL_LOGOS — official software logos, served from assets/icons/.
   These are the open-source Devicon logo set (MIT licensed). */
const TOOL_LOGOS = {
  fusion: '<img src="assets/icons/fusion360.svg" alt="Fusion 360 logo" loading="lazy">',
  matlab: '<img src="assets/icons/matlab.svg" alt="MATLAB logo" loading="lazy">',
  python: '<img src="assets/icons/python.svg" alt="Python logo" loading="lazy">',
  web: `
    <img src="assets/icons/html5.svg" alt="HTML5 logo" loading="lazy">
    <img src="assets/icons/css3.svg" alt="CSS3 logo" loading="lazy">
    <img src="assets/icons/javascript.svg" alt="JavaScript logo" loading="lazy">
  `,
  data: '<svg viewBox="0 0 24 24" fill="none"><path d="M4 20V10M10 20V4M16 20v-7M21 20H3" stroke="#1D6F42" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>'
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

const IMG_ICON = '<svg viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" stroke-width="1.6"/><circle cx="8.5" cy="9.5" r="1.5" stroke="currentColor" stroke-width="1.6"/><path d="M21 16l-5.5-5.5a1.5 1.5 0 00-2.1 0L4 19" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
/* small stacked-photos icon used on CAD thumbnails that have multiple angles */
const IMG_ICON_STACK = '<svg viewBox="0 0 24 24" fill="none" width="11" height="11"><rect x="3" y="7" width="14" height="12" rx="1.5" stroke="currentColor" stroke-width="1.8"/><path d="M7 7V6a2 2 0 012-2h9a2 2 0 012 2v9a2 2 0 01-2 2h-1" stroke="currentColor" stroke-width="1.8"/></svg>';

/* CAD album — Fusion 360 model renders.
   Each design can have MULTIPLE images (different angles of the same model) —
   just add more paths to the "images" array for a given design, e.g.:
   { images: ["assets/cad/handcycle-front.jpg", "assets/cad/handcycle-side.jpg"], caption: "Handcycle Drivetrain" } */
const CAD_RENDERS = [
  { images: ["assets/cad/Rim 2.png", "assets/cad/Rim 1.png", "assets/cad/Rim 3.png", "assets/cad/Tire 1.png", "assets/cad/Tire 2.png", "assets/cad/Tire 3.png"], caption: "Lamborghini-inspired rim and tyre design " },
  { images: ["assets/cad/SA1.png", "assets/cad/SA2.png", "assets/cad/SA3.png"], caption: "Automobile shock absorber " },
  { images: ["assets/cad/brake 1.png", "assets/cad/brake 2.png", "assets/cad/brake 3.png", "assets/cad/brake 4.png"], caption: "Brake disc with a Brembo-branded brake caliper " },
  { images: ["assets/cad/Steering Wheel TN.png", "assets/cad/Steering Wheel 2.png", "assets/cad/Steering Wheel 3.png", "assets/cad/Steering Wheel 5.png"], caption: "Racing-style steering wheel " },
  { images: ["assets/cad/CS TN.png", "assets/cad/CS 1.png", "assets/cad/CS 2.png", "assets/cad/CS 3.png", "assets/cad/CS 4.png", "assets/cad/Crankshaft Animation.mov"], caption: "12-cylinder V-engine crankshaft assembly " },
  { images: ["assets/cad/Gearbox 1.png", "assets/cad/Gearbox 2.png", "assets/cad/Gearbox.mov", "assets/cad/Gearbox 2.mov"], caption: "Constant-mesh gearbox assembly " },

];

/* Certifications — categorized for clean organization */
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
];

/* ============================================================
   YEAR
============================================================ */
document.getElementById("year").textContent = new Date().getFullYear();

/* ============================================================
   THEME — "Paper" (light) / "Blueprint" (dark)
============================================================ */
const themeToggle = document.getElementById("themeToggle");
function applyTheme(theme){
  document.documentElement.setAttribute("data-theme", theme);
  try{ localStorage.setItem("theme", theme); }catch(e){}
}
(function initTheme(){
  let saved = null;
  try{ saved = localStorage.getItem("theme"); }catch(e){}
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme(saved || (prefersDark ? "dark" : "light"));
})();
themeToggle.addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme");
  applyTheme(current === "dark" ? "light" : "dark");
});

/* ============================================================
   NAV
============================================================ */
const navToggle = document.getElementById("navToggle");
const navlinks = document.getElementById("navlinks");
navToggle.addEventListener("click", () => {
  const open = navlinks.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", open ? "true" : "false");
});
navlinks.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
  navlinks.classList.remove("is-open");
  navToggle.setAttribute("aria-expanded", "false");
}));

const navAnchors = document.querySelectorAll("[data-nav]");
const sectionsForNav = Array.from(navAnchors).map(a => document.querySelector(a.getAttribute("href"))).filter(Boolean);
const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      const id = "#" + entry.target.id;
      navAnchors.forEach(a => a.classList.toggle("is-active", a.getAttribute("href") === id));
    }
  });
}, { rootMargin: "-45% 0px -50% 0px" });
sectionsForNav.forEach(s => navObserver.observe(s));

/* ============================================================
   SCROLL REVEAL (generic)
============================================================ */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.18 });
document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

/* ============================================================
   CERTIFICATE VIEWER — full-screen, supports multiple PDFs
============================================================ */
const certViewer = document.getElementById("certViewer");
const certViewerFrame = document.getElementById("certViewerFrame");
const certViewerTitle = document.getElementById("certViewerTitle");
const certViewerCount = document.getElementById("certViewerCount");
const certViewerPrev = document.getElementById("certViewerPrev");
const certViewerNext = document.getElementById("certViewerNext");

let activeCertPaths = [];
let activeCertIndex = 0;

function renderCertFrame(){
  certViewerFrame.src = activeCertPaths[activeCertIndex] || "";
  certViewerCount.textContent = `${activeCertIndex + 1} / ${activeCertPaths.length}`;
  certViewerPrev.disabled = activeCertIndex === 0;
  certViewerNext.disabled = activeCertIndex === activeCertPaths.length - 1;
}
function openCertViewer(paths, label){
  activeCertPaths = (paths && paths.length) ? paths : [""];
  activeCertIndex = 0;
  certViewerTitle.textContent = label || "Certificate";
  certViewer.classList.toggle("is-single", activeCertPaths.length <= 1);
  renderCertFrame();
  certViewer.classList.add("is-open");
  certViewer.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}
function closeCertViewer(){
  certViewer.classList.remove("is-open");
  certViewer.setAttribute("aria-hidden", "true");
  certViewerFrame.src = "";
  document.body.style.overflow = "";
}
certViewerPrev.addEventListener("click", () => {
  if(activeCertIndex > 0){ activeCertIndex--; renderCertFrame(); }
});
certViewerNext.addEventListener("click", () => {
  if(activeCertIndex < activeCertPaths.length - 1){ activeCertIndex++; renderCertFrame(); }
});
document.getElementById("certViewerClose").addEventListener("click", closeCertViewer);

/* ============================================================
   CAD VIEWER — full-screen image gallery modal
============================================================ */
const cadViewer = document.getElementById("cadViewer");
const cadViewerImg = document.getElementById("cadViewerImg");
const cadViewerTitle = document.getElementById("cadViewerTitle");
const cadViewerCount = document.getElementById("cadViewerCount");
const cadViewerPrev = document.getElementById("cadViewerPrev");
const cadViewerNext = document.getElementById("cadViewerNext");

let activeCadImages = [];
let activeCadCaption = "";
let activeCadIndex = 0;

function renderCadModal(){
  if(activeCadImages.length === 0) return;
  cadViewerImg.src = activeCadImages[activeCadIndex];
  cadViewerTitle.textContent = activeCadCaption || "CAD Render";
  cadViewerCount.textContent = `${activeCadIndex + 1} / ${activeCadImages.length}`;
  cadViewerPrev.disabled = activeCadIndex === 0;
  cadViewerNext.disabled = activeCadIndex === activeCadImages.length - 1;
}

/* Opens the viewer scoped to ONE design's images — prev/next scrolls
   through that design's angles only, not the whole album. */
function openCadViewer(images, caption){
  const valid = (images || []).filter(src => src && src.trim() !== "");
  if(valid.length === 0) return;
  activeCadImages = valid;
  activeCadCaption = caption || "CAD Render";
  activeCadIndex = 0;
  cadViewer.classList.toggle("is-single", activeCadImages.length <= 1);
  renderCadModal();
  cadViewer.classList.add("is-open");
  cadViewer.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeCadViewer(){
  cadViewer.classList.remove("is-open");
  cadViewer.setAttribute("aria-hidden", "true");
  cadViewerImg.src = "";
  document.body.style.overflow = "";
}

cadViewerPrev.addEventListener("click", () => {
  if(activeCadIndex > 0){ activeCadIndex--; renderCadModal(); }
});
cadViewerNext.addEventListener("click", () => {
  if(activeCadIndex < activeCadImages.length - 1){ activeCadIndex++; renderCadModal(); }
});
document.getElementById("cadViewerClose").addEventListener("click", closeCadViewer);

document.addEventListener("keydown", (e) => {
  if(certViewer.classList.contains("is-open")){
    if(e.key === "Escape") closeCertViewer();
    if(e.key === "ArrowLeft") certViewerPrev.click();
    if(e.key === "ArrowRight") certViewerNext.click();
  }
  if(cadViewer.classList.contains("is-open")){
    if(e.key === "Escape") closeCadViewer();
    if(e.key === "ArrowLeft" && !cadViewerPrev.disabled) cadViewerPrev.click();
    if(e.key === "ArrowRight" && !cadViewerNext.disabled) cadViewerNext.click();
  }
});

/* ============================================================
   SKILLS — tool logo grid
============================================================ */
const skillsGrid = document.getElementById("skillsGrid");
TOOLS.forEach(t => {
  const card = document.createElement("div");
  card.className = "toolbadge reveal";
  card.innerHTML = `
    <span class="toolbadge__tag">${t.tag || ""}</span>
    <div class="toolbadge__logo toolbadge__logo--${t.color}">${t.icon}</div>
    <div class="toolbadge__info">
      <strong>${t.name}</strong>
      <span>${t.desc}</span>
      ${t.certs ? `<button class="toolbadge__certbtn" type="button">View certification${t.certs.length > 1 ? "s" : ""} →</button>` : ""}
    </div>
  `;
  skillsGrid.appendChild(card);
  if(t.certs){
    card.querySelector(".toolbadge__certbtn").addEventListener("click", () => openCertViewer(t.certs, t.name));
  }
});
skillsGrid.querySelectorAll(".toolbadge").forEach(el => revealObserver.observe(el));

/* ============================================================
   CAD ALBUM — Fusion 360 render placeholders
============================================================ */
const cadAlbum = document.getElementById("cadAlbum");

CAD_RENDERS.forEach((r, i) => {
  const slot = document.createElement("div");
  const images = (r.images || []).filter(src => src && src.trim() !== "");
  const caption = r.caption || ("Fusion 360 render " + (i + 1));
  if(images.length > 0){
    slot.className = "cadalbum__slot cadalbum__slot--filled reveal";
    slot.setAttribute("data-caption", caption);
    slot.innerHTML = `
      <img src="${images[0]}" alt="${caption}" loading="lazy">
      ${images.length > 1 ? `<span class="cadalbum__badge">${IMG_ICON_STACK} ${images.length}</span>` : ""}
    `;
    slot.addEventListener("click", () => openCadViewer(images, caption));
  } else {
    slot.className = "cadalbum__slot reveal";
    slot.innerHTML = `${IMG_ICON}<span>Add render — ${caption}</span>`;
  }
  cadAlbum.appendChild(slot);
});
cadAlbum.querySelectorAll(".cadalbum__slot").forEach(el => revealObserver.observe(el));

/* ============================================================
   CERTIFICATIONS — on-demand list with category filters & search
============================================================ */
const certList = document.getElementById("certList");
const certSearch = document.getElementById("certSearch");
const certTabs = document.querySelectorAll(".cert-tab");

let currentCategory = null; // nothing selected by default — pick a filter to reveal certs
let searchQuery = "";

function renderCertifications(){
  certList.innerHTML = "";

  if(!currentCategory){
    certList.innerHTML = `<div class="cert-empty">Select a filter above to view certifications.</div>`;
    return;
  }

  const seen = new Set();
  const filtered = CERTIFICATIONS.filter(c => {
    const matchesCat = !currentCategory || currentCategory === "all" || c.category === currentCategory;
    const matchesSearch = !searchQuery ||
                          c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.issuer.toLowerCase().includes(searchQuery.toLowerCase());
    if(!matchesCat || !matchesSearch) return false;
    const key = `${c.name}|${c.issuer}|${c.date}`;
    if(seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  if(filtered.length === 0){
    certList.innerHTML = `<div class="cert-empty">No certifications found matching your criteria.</div>`;
    return;
  }

  filtered.forEach((c) => {
    const item = document.createElement("div");
    item.className = "certitem reveal";

    let credentialHTML = "";
    if(c.credentialType === "link"){
      credentialHTML = `<a class="certitem__link" href="${c.credentialUrl || "#"}" target="_blank" rel="noopener">View credential →</a>`;
    } else if(c.credentialType === "pdf"){
      credentialHTML = `<button class="certitem__link" type="button">View credential →</button>`;
    }

    item.innerHTML = `
      <div class="certitem__main">
        <span class="certitem__dot" style="background:var(--${c.color})"></span>
        <div>
          <h4 class="certitem__title">${c.name}</h4>
          <p class="certitem__issuer">${c.issuer} &bull; <span class="certitem__date">${c.date}</span></p>
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

  certList.querySelectorAll(".certitem").forEach(el => revealObserver.observe(el));
}

if(certSearch){
  certSearch.addEventListener("input", (e) => {
    searchQuery = e.target.value.trim();
    renderCertifications();
  });
}

certTabs.forEach(tab => {
  tab.addEventListener("click", () => {
    certTabs.forEach(t => t.classList.remove("is-active"));
    tab.classList.add("is-active");
    currentCategory = tab.getAttribute("data-category");
    renderCertifications();
  });
});

renderCertifications();

/* ============================================================
   HERO — technical drawing: spokes + pinion gear teeth
============================================================ */
const svgNS = "http://www.w3.org/2000/svg";

function buildSpokes(containerId, cx, cy, radius, count){
  const container = document.getElementById(containerId);
  if(!container) return;
  for(let i = 0; i < count; i++){
    const angle = (i / count) * Math.PI * 2;
    const x2 = cx + radius * Math.cos(angle);
    const y2 = cy + radius * Math.sin(angle);
    const line = document.createElementNS(svgNS, "line");
    line.setAttribute("x1", cx);
    line.setAttribute("y1", cy);
    line.setAttribute("x2", x2);
    line.setAttribute("y2", y2);
    line.setAttribute("class", "spoke");
    container.appendChild(line);
  }
}

function buildTeeth(containerId, radius, count, toothW, toothH){
  const container = document.getElementById(containerId);
  if(!container) return;
  for(let i = 0; i < count; i++){
    const angle = (i / count) * 360;
    const rect = document.createElementNS(svgNS,"rect");
    rect.setAttribute("x", -toothW/2);
    rect.setAttribute("y", -radius - toothH);
    rect.setAttribute("width", toothW);
    rect.setAttribute("height", toothH);
    rect.setAttribute("rx", 1.5);
    rect.setAttribute("class", "gear-tooth");
    rect.setAttribute("transform", `rotate(${angle})`);
    container.appendChild(rect);
  }
}

buildSpokes("spokes", 240, 240, 96, 10);

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if(reduceMotion){
  document.querySelectorAll("#spokes").forEach(el => el.style.animation = "none");
}

})();
