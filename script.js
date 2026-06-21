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
      for: "For — ",
      title: "Self-cleaning solar panel systems",
      problem: "Dust and dirt on solar panel surfaces can reduce efficiency by up to 40% in arid regions like the Middle East and North Africa.",
      build: "A proposed self-cleaning system for solar panel surfaces that requires no external water source.",
      result: "Increased efficiency of solar panels, helping take steps towards green energy and a cleaner planet.",
      tags: ["Tag one", "Tag two", "Tag three"]
    },
    {
      id: "prj-02",
      category: "university",
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
      for: "For — ",
      title: "Savonius Wind Turbine",
      problem: "Problem placeholder — describe the constraint or friction this project responds to.",
      build: "Build placeholder — describe what was designed and how it works.",
      result: "Result placeholder — describe the outcome, measured or expected.",
      tags: ["Tag one", "Tag two", "Tag three"],
      selfMade: true,
      cadImages: [
        "assets/savonius-1.png",
        "assets/savonius-2.png",
        "assets/savonius-3.png"
      ]
    },
    {
      id: "prj-05",
      category: "personal",
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
        <span class="project-index">${indexLabel}</span>
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

        <span class="project-open-cue">View CAD →</span>
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

  function escapeHTML(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
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

  /* ---------- PROJECT DETAIL MODAL (CAD VIEWER) ---------- */
  const panel = document.getElementById("projectPanel");
  const panelOverlay = document.getElementById("panelOverlay");
  const panelClose = document.getElementById("panelClose");

  const panelIndex = document.getElementById("panelIndex");
  const panelSelfMade = document.getElementById("panelSelfMade");
  const panelFor = document.getElementById("panelFor");
  const panelTitle = document.getElementById("panelTitle");
  const panelProblem = document.getElementById("panelProblem");
  const panelBuild = document.getElementById("panelBuild");
  const panelResult = document.getElementById("panelResult");
  const panelTags = document.getElementById("panelTags");
  const panelNotes = document.getElementById("panelNotes");

  const panelCadPlaceholder = document.getElementById("panelCadPlaceholder");
  const panelCarousel = document.getElementById("panelCarousel");
  const carouselImage = document.getElementById("carouselImage");
  const carouselPrev = document.getElementById("carouselPrev");
  const carouselNext = document.getElementById("carouselNext");
  const carouselDots = document.getElementById("carouselDots");
  const carouselCounter = document.getElementById("carouselCounter");

  let lastFocusedCard = null;
  let currentImages = [];
  let currentImageIndex = 0;

  function renderCarouselFrame() {
    if (!currentImages.length) return;
    carouselImage.src = currentImages[currentImageIndex];
    carouselCounter.textContent = `${currentImageIndex + 1} / ${currentImages.length}`;

    carouselDots.querySelectorAll(".carousel-dot").forEach((dot, i) => {
      dot.classList.toggle("is-active", i === currentImageIndex);
    });
  }

  function goToImage(index) {
    if (!currentImages.length) return;
    currentImageIndex = (index + currentImages.length) % currentImages.length;
    renderCarouselFrame();
  }

  function setupCarousel(project) {
    currentImages = project.cadImages && project.cadImages.length ? project.cadImages : [];
    currentImageIndex = 0;

    if (currentImages.length) {
      panelCadPlaceholder.hidden = true;
      panelCarousel.hidden = false;

      carouselDots.innerHTML = currentImages
        .map((_, i) => `<button class="carousel-dot" data-index="${i}" aria-label="Go to image ${i + 1}"></button>`)
        .join("");

      // Arrows only make sense with more than one image.
      const multi = currentImages.length > 1;
      carouselPrev.hidden = !multi;
      carouselNext.hidden = !multi;
      carouselDots.hidden = !multi;
      carouselCounter.hidden = !multi;

      renderCarouselFrame();
    } else {
      panelCadPlaceholder.hidden = false;
      panelCarousel.hidden = true;
    }
  }

  carouselPrev.addEventListener("click", () => goToImage(currentImageIndex - 1));
  carouselNext.addEventListener("click", () => goToImage(currentImageIndex + 1));
  carouselDots.addEventListener("click", (e) => {
    const dot = e.target.closest(".carousel-dot");
    if (!dot) return;
    goToImage(Number(dot.dataset.index));
  });

  function openPanel(project, indexLabel) {
    lastFocusedCard = document.activeElement;

    panelIndex.textContent = indexLabel;
    panelSelfMade.hidden = !project.selfMade;
    panelFor.textContent = project.for;
    panelTitle.textContent = project.title;
    panelProblem.textContent = project.problem;
    panelBuild.textContent = project.build;
    panelResult.textContent = project.result;
    panelNotes.textContent = project.notes ||
      "Write-up placeholder — this space is for the full project story: design process, iterations, calculations, materials, manufacturing notes, testing, and reflections. Add as much detail here as you like.";

    panelTags.innerHTML = project.tags
      .map(t => `<span class="project-tag">${escapeHTML(t)}</span>`)
      .join("");

    setupCarousel(project);

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
    if (e.key === "ArrowLeft") goToImage(currentImageIndex - 1);
    if (e.key === "ArrowRight") goToImage(currentImageIndex + 1);
  }

  panelClose.addEventListener("click", closePanel);
  panelOverlay.addEventListener("click", closePanel);

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
  const sections = ["work", "about", "approach", "contact"]
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

  /* ---------- FOOTER YEAR ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- INIT ---------- */
  renderProjects();
})();
