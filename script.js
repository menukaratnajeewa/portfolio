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
      title: "Project title placeholder",
      problem: "Problem placeholder — describe the constraint or friction this project responds to.",
      build: "Build placeholder — describe what was designed and how it works.",
      result: "Result placeholder — describe the outcome, measured or expected.",
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
      title: "Project title placeholder",
      problem: "Problem placeholder — describe the constraint or friction this project responds to.",
      build: "Build placeholder — describe what was designed and how it works.",
      result: "Result placeholder — describe the outcome, measured or expected.",
      tags: ["Tag one", "Tag two", "Tag three"]
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

      const indexLabel = `PRJ-${String(i + 1).padStart(2, "0")}`;

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

  /* ---------- PROJECT DETAIL PANEL (CAD VIEWER) ---------- */
  const panel = document.getElementById("projectPanel");
  const panelOverlay = document.getElementById("panelOverlay");
  const panelClose = document.getElementById("panelClose");

  const panelIndex = document.getElementById("panelIndex");
  const panelFor = document.getElementById("panelFor");
  const panelTitle = document.getElementById("panelTitle");
  const panelProblem = document.getElementById("panelProblem");
  const panelBuild = document.getElementById("panelBuild");
  const panelResult = document.getElementById("panelResult");
  const panelTags = document.getElementById("panelTags");
  const panelCad = document.getElementById("panelCad");

  let lastFocusedCard = null;

  function openPanel(project, indexLabel) {
    lastFocusedCard = document.activeElement;

    panelIndex.textContent = indexLabel;
    panelFor.textContent = project.for;
    panelTitle.textContent = project.title;
    panelProblem.textContent = project.problem;
    panelBuild.textContent = project.build;
    panelResult.textContent = project.result;

    panelTags.innerHTML = project.tags
      .map(t => `<span class="project-tag">${escapeHTML(t)}</span>`)
      .join("");

    // CAD slot: swap in an image if the project defines one, otherwise show the placeholder.
    if (project.cadImage) {
      panelCad.innerHTML = `<img src="${escapeHTML(project.cadImage)}" alt="${escapeHTML(project.title)} CAD render">`;
    } else {
      panelCad.innerHTML = `
        <div class="panel-cad-placeholder">
          <span>CAD VIEW</span>
          <p>Drop a render, screenshot, or embed here</p>
        </div>
      `;
    }

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
