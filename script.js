/* ============================================
   MENUKA RATNAJEEWA — PORTFOLIO
   script.js
   ============================================ */

(function () {
  "use strict";

  /* ---------- PROJECT DATA ---------- */
  // Each project names: who it's for, the problem, the build, and the result.
  // Replace freely with your real projects — structure stays the same.
  const projects = [
    {
      id: "prj-01",
      category: "university",
      kicker: "Renewable Energy",
      for: "Project 1 - November 2025",
      title: "Self-cleaning solar panel systems",
      problem: "Dust and dirt on solar panel surfaces can reduce panel efficiency by up to 40% in arid regions like the Middle East and North Africa.",
      build: "A proposed self-cleaning system for solar panel surfaces that requires no external water source.",
      result: "Increased efficiency of solar panels, helping take steps towards green energy and a cleaner planet.",
      images: [
        { src: "savonius-1.png", caption: "A full isometric view of the Savonius turbine" },
        { src: "savonius-2.png", caption: "A front view of the Savonius turbine" },
        { src: "savonius-3.png", caption: "A side view of the Savonius turbine" },
        { src: "exploded_turbine.png", caption: "An exploded drawing of the Savonius turbine" },
        { src: "Lower_bearing.png", caption: "An exploded drawing, with all core components labelled" }
      ],
      notes: "I propose a solution that increases the efficiency of solar panels through installation of self-cleaning systems that require no external water sources to operate.\n\nThe system combines a Savonius wind turbine with an air–water collector powered by thermoelectric Peltier units.\n\n• The turbine converts wind energy into electricity, which powers the collector to extract humidity from the air and form water droplets\n• The collected water flows over the solar panel surfaces to remove dust and dirt\n• AI and IoT sensors, such as a pyranometer, detect dust buildup and automatically activate cleaning only when needed\n• Real-world testing showed a 28% boost in solar panel efficiency, achieved without using external water or electricity sources",
      readMoreUrl: "https://canva.link/pte0pt9mqwu4xg5",
      tags: ["Sustainability Solutions", "Self-cleaning Technology", "Renewable Energy"],
      selfMade: true
    },
    {
      id: "prj-02",
      category: "university",
      kicker: "Coursework",
      for: "For — ",
      title: "Project title placeholder",
      problem: "Problem placeholder — describe the constraint or friction this project responds to.",
      build: "Build placeholder — describe what was designed and how it works.",
      result: "Result placeholder — describe the outcome, measured or expected.",
      tags: ["Tag one", "Tag two", "Tag three"]
    },
    {
      id: "prj-03",
      category: "university",
      kicker: "Coursework",
      for: "For — ",
      title: "Project title placeholder",
      problem: "Problem placeholder — describe the constraint or friction this project responds to.",
      build: "Build placeholder — describe what was designed and how it works.",
      result: "Result placeholder — describe the outcome, measured or expected.",
      tags: ["Tag one", "Tag two", "Tag three"]
    },
    {
      id: "prj-04",
      category: "personal",
      kicker: "Self-directed",
      for: "For — ",
      title: "Project title placeholder",
      problem: "Problem placeholder — describe the constraint or friction this project responds to.",
      build: "Build placeholder — describe what was designed and how it works.",
      result: "Result placeholder — describe the outcome, measured or expected.",
      tags: ["Tag one", "Tag two", "Tag three"]
    },
    {
      id: "prj-05",
      category: "personal",
      kicker: "Self-directed",
      for: "For — ",
      title: "Project title placeholder",
      problem: "Problem placeholder — describe the constraint or friction this project responds to.",
      build: "Build placeholder — describe what was designed and how it works.",
      result: "Result placeholder — describe the outcome, measured or expected.",
      tags: ["Tag one", "Tag two", "Tag three"]
    },
    {
      id: "prj-06",
      category: "personal",
      kicker: "Self-directed",
      for: "For — ",
      title: "Project title placeholder",
      problem: "Problem placeholder — describe the constraint or friction this project responds to.",
      build: "Build placeholder — describe what was designed and how it works.",
      result: "Result placeholder — describe the outcome, measured or expected.",
      tags: ["Tag one", "Tag two", "Tag three"]
    }
  ];

  const FILTER_LABELS = {
    all: "All builds",
    university: "University Projects",
    personal: "Personal Projects"
  };

  /* ---------- RENDER PROJECT CARDS ---------- */
  const grid = document.getElementById("projectGrid");

  function escapeHTML(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  function renderProjects() {
    const frag = document.createDocumentFragment();

    projects.forEach((p, i) => {
      const card = document.createElement("article");
      card.className = "project-card";
      card.dataset.category = p.category;
      card.dataset.projectId = p.id;
      card.setAttribute("tabindex", "0");
      card.setAttribute("role", "button");
      card.setAttribute("aria-haspopup", "true");

      const indexLabel = `Project ${i + 1}`;

      card.innerHTML = `
        <div class="project-card-top">
          <span class="project-index">${String(i + 1).padStart(2, "0")}</span>
          <span class="project-kicker">${escapeHTML(p.kicker || "")}</span>
        </div>
        <p class="project-for">${escapeHTML(p.for)}</p>
        <h3 class="project-title">${escapeHTML(p.title)}</h3>

        <div class="project-row">
          <span class="label">PROBLEM</span>
          <span class="value">${escapeHTML(p.problem)}</span>
        </div>
        <div class="project-row">
          <span class="label">BUILD</span>
          <span class="value">${escapeHTML(p.build)}</span>
        </div>
        <div class="project-row">
          <span class="label">RESULT</span>
          <span class="value">${escapeHTML(p.result)}</span>
        </div>

        <div class="project-tags">
          ${p.tags.map(t => `<span class="project-tag">${escapeHTML(t)}</span>`).join("")}
        </div>

        <span class="project-open-cue">Read full write-up →</span>
      `;

      card.addEventListener("click", () => openPanel(p, indexLabel));
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openPanel(p, indexLabel);
        }
      });

      frag.appendChild(card);
    });

    grid.innerHTML = "";
    grid.appendChild(frag);
  }

  /* ---------- FILTERING ---------- */
  const filterBar = document.getElementById("filterBar");

  function applyFilter(filter) {
    const cards = grid.querySelectorAll(".project-card");
    cards.forEach(card => {
      const matches = filter === "all" || card.dataset.category === filter;
      card.hidden = !matches;
    });
  }

  filterBar.addEventListener("click", (e) => {
    const pill = e.target.closest(".filter-pill");
    if (!pill) return;

    filterBar.querySelectorAll(".filter-pill").forEach(p => {
      p.classList.remove("is-active");
      p.setAttribute("aria-selected", "false");
    });
    pill.classList.add("is-active");
    pill.setAttribute("aria-selected", "true");

    applyFilter(pill.dataset.filter);
  });

  /* ---------- PROJECT DETAIL MODAL (TEXT) ---------- */
  const panel = document.getElementById("projectPanel");
  const panelOverlay = document.getElementById("panelOverlay");
  const panelClose = document.getElementById("panelClose");

  const panelSelfMade = document.getElementById("panelSelfMade");
  const panelFor = document.getElementById("panelFor");
  const panelTitle = document.getElementById("panelTitle");
  const panelProblem = document.getElementById("panelProblem");
  const panelBuild = document.getElementById("panelBuild");
  const panelResult = document.getElementById("panelResult");
  const panelTags = document.getElementById("panelTags");
  const panelNotes = document.getElementById("panelNotes");

  // The three summary rows (PROBLEM / BUILD / RESULT) — grabbed as their
  // containing rows so we can hide the whole row, not just the value.
  const panelSummaryRows = [panelProblem, panelBuild, panelResult]
    .map(el => el.closest(".panel-row"));

  let panelReadMore = document.getElementById("panelReadMore");
  if (!panelReadMore) {
    panelReadMore = document.createElement("a");
    panelReadMore.id = "panelReadMore";
    panelReadMore.className = "panel-readmore";
    panelReadMore.target = "_blank";
    panelReadMore.rel = "noopener";
    panelNotes.insertAdjacentElement("afterend", panelReadMore);
  }

  /* ---------- PROJECT DETAIL MODAL — IMAGE GALLERY ---------- */
  // Built once and inserted right after the title. Only shown for
  // projects that supply an `images` array.
  const panelGallery = document.createElement("div");
  panelGallery.className = "panel-gallery";
  panelGallery.hidden = true;
  panelGallery.innerHTML = `
    <div class="panel-gallery-frame">
      <img class="panel-gallery-img" alt="" />
      <button type="button" class="panel-gallery-nav panel-gallery-prev" aria-label="Previous image">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 2L4 8L10 14" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </button>
      <button type="button" class="panel-gallery-nav panel-gallery-next" aria-label="Next image">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 2L12 8L6 14" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </button>
    </div>
    <div class="panel-gallery-meta">
      <span class="panel-gallery-caption"></span>
      <span class="panel-gallery-count"></span>
    </div>
    <div class="panel-gallery-dots"></div>
  `;
  panelTitle.insertAdjacentElement("afterend", panelGallery);

  const galleryImg = panelGallery.querySelector(".panel-gallery-img");
  const galleryCaption = panelGallery.querySelector(".panel-gallery-caption");
  const galleryCount = panelGallery.querySelector(".panel-gallery-count");
  const galleryDots = panelGallery.querySelector(".panel-gallery-dots");
  const galleryPrevBtn = panelGallery.querySelector(".panel-gallery-prev");
  const galleryNextBtn = panelGallery.querySelector(".panel-gallery-next");

  let galleryImages = [];
  let galleryIndex = 0;

  function renderGalleryFrame() {
    if (!galleryImages.length) return;
    const current = galleryImages[galleryIndex];
    galleryImg.src = current.src;
    galleryImg.alt = current.caption || "";
    galleryCaption.textContent = current.caption || "";
    galleryCount.textContent = `${galleryIndex + 1}/${galleryImages.length}`;
    galleryDots.querySelectorAll(".panel-gallery-dot").forEach((dot, i) => {
      dot.classList.toggle("is-active", i === galleryIndex);
      dot.setAttribute("aria-current", i === galleryIndex ? "true" : "false");
    });
  }

  function goToGalleryIndex(i) {
    if (!galleryImages.length) return;
    galleryIndex = (i + galleryImages.length) % galleryImages.length;
    renderGalleryFrame();
  }

  function setupGallery(project) {
    galleryImages = Array.isArray(project.images) ? project.images : [];

    if (!galleryImages.length) {
      panelGallery.hidden = true;
      return;
    }

    panelGallery.hidden = false;
    galleryIndex = 0;

    galleryDots.innerHTML = galleryImages
      .map((_, i) => `<button type="button" class="panel-gallery-dot" aria-label="Go to image ${i + 1}"></button>`)
      .join("");

    renderGalleryFrame();
  }

  galleryPrevBtn.addEventListener("click", () => goToGalleryIndex(galleryIndex - 1));
  galleryNextBtn.addEventListener("click", () => goToGalleryIndex(galleryIndex + 1));

  galleryDots.addEventListener("click", (e) => {
    const dot = e.target.closest(".panel-gallery-dot");
    if (!dot) return;
    goToGalleryIndex(Array.from(galleryDots.children).indexOf(dot));
  });

  let lastFocusedCard = null;

  function openPanel(project, indexLabel) {
    lastFocusedCard = document.activeElement;

    panelSelfMade.hidden = !project.selfMade;
    panelFor.textContent = project.for;
    panelTitle.textContent = project.title;

    setupGallery(project);

    // Projects with a full write-up (`notes`) show that instead of the
    // PROBLEM / BUILD / RESULT summary rows used on the card.
    const hasNotes = Boolean(project.notes);

    panelSummaryRows.forEach(row => { row.hidden = hasNotes; });

    if (hasNotes) {
      panelNotes.textContent = project.notes;
    } else {
      panelProblem.textContent = project.problem;
      panelBuild.textContent = project.build;
      panelResult.textContent = project.result;
      panelNotes.textContent = project.notes ||
        "Write-up placeholder — this space is for the full project story: design process, iterations, calculations, materials, manufacturing notes, testing, and reflections. Add as much detail here as you like.";
    }

    if (project.readMoreUrl) {
      panelReadMore.href = project.readMoreUrl;
      panelReadMore.textContent = "To read more, follow this presentation →";
      panelReadMore.hidden = false;
    } else {
      panelReadMore.hidden = true;
    }

    panelTags.innerHTML = project.tags
      .map(t => `<span class="project-tag">${escapeHTML(t)}</span>`)
      .join("");

    panelOverlay.hidden = false;
    document.body.classList.add("panel-open");

    requestAnimationFrame(() => {
      panel.classList.add("is-open");
      panelOverlay.classList.add("is-visible");
    });

    panel.setAttribute("aria-hidden", "false");
    panelClose.focus();

    document.addEventListener("keydown", onPanelKeydown);
  }

  function closePanel() {
    panel.classList.remove("is-open");
    panelOverlay.classList.remove("is-visible");
    panel.setAttribute("aria-hidden", "true");
    document.body.classList.remove("panel-open");

    document.removeEventListener("keydown", onPanelKeydown);

    setTimeout(() => {
      panelOverlay.hidden = true;
    }, 320);

    if (lastFocusedCard) lastFocusedCard.focus();
  }

  function onPanelKeydown(e) {
    if (e.key === "Escape") closePanel();
    if (!panelGallery.hidden) {
      if (e.key === "ArrowLeft") goToGalleryIndex(galleryIndex - 1);
      if (e.key === "ArrowRight") goToGalleryIndex(galleryIndex + 1);
    }
  }

  panelClose.addEventListener("click", closePanel);
  panelOverlay.addEventListener("click", closePanel);

  /* ---------- LIGHT / DARK THEME TOGGLE ---------- */
  const themeToggle = document.getElementById("themeToggle");
  const root = document.documentElement;

  function isLight() {
    return root.getAttribute("data-theme") === "light";
  }

  function setTheme(theme) {
    if (theme === "light") {
      root.setAttribute("data-theme", "light");
    } else {
      root.removeAttribute("data-theme");
    }
    themeToggle.setAttribute("aria-pressed", String(theme === "light"));
    themeToggle.setAttribute("aria-label", theme === "light" ? "Switch to dark mode" : "Switch to light mode");
    try { localStorage.setItem("theme", theme); } catch (e) {}
  }

  themeToggle.addEventListener("click", () => {
    setTheme(isLight() ? "dark" : "light");
  });

  // Sync the toggle's a11y state with whatever the inline head script already applied.
  setTheme(isLight() ? "light" : "dark");

  /* ---------- MOBILE NAV TOGGLE ---------- */
  const navToggle = document.getElementById("navToggle");
  const primaryNav = document.getElementById("primary-nav");

  navToggle.addEventListener("click", () => {
    const isOpen = primaryNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  // Close mobile nav after clicking a link
  primaryNav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      primaryNav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });

  /* ---------- ACTIVE NAV LINK ON SCROLL ---------- */
  const sections = ["about", "work", "approach", "contact"]
    .map(id => document.getElementById(id))
    .filter(Boolean);

  const navLinks = Array.from(document.querySelectorAll("[data-nav]"));

  if ("IntersectionObserver" in window && sections.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach(link => {
            link.classList.toggle("is-current", link.getAttribute("href") === `#${id}`);
          });
        }
      });
    }, { rootMargin: "-45% 0px -45% 0px" });

    sections.forEach(section => observer.observe(section));
  }

  /* ---------- SCROLL REVEAL (About section fade-in) ---------- */
  const revealEls = Array.from(document.querySelectorAll(".reveal"));

  if (revealEls.length) {
    if ("IntersectionObserver" in window) {
      const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15, rootMargin: "0px 0px -8% 0px" });

      revealEls.forEach(el => revealObserver.observe(el));
    } else {
      // No IntersectionObserver support — just show everything.
      revealEls.forEach(el => el.classList.add("is-visible"));
    }
  }

  /* ---------- FOOTER YEAR ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- INIT ---------- */
  renderProjects();
})();
