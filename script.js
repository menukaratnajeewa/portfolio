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
      category: ["drivers"],
      for: "For — Drivers in extreme heat climates",
      title: "Passive Cabin Pre-Cooling Vent",
      problem: "Cars parked in Gulf-region heat reach cabin temperatures over 70°C, making the first minutes of every drive uncomfortable and a long-term strain on AC systems.",
      build: "A roof-mounted, solar-driven passive vent that draws hot cabin air out while parked, using convection rather than battery power.",
      result: "Lower cabin temperature at re-entry and reduced load on the AC compressor during the first cooling cycle, modelled across a typical Dubai summer day.",
      tags: ["Thermal design", "Passive systems", "CAD + CFD"]
    },
    {
      id: "prj-02",
      category: ["mechanics"],
      for: "For — Independent garages and home mechanics",
      title: "Modular Torque-Spec Reference Jig",
      problem: "Independent mechanics without access to manufacturer databases often rely on memory or guesswork for torque specs, risking under- or over-tightened fasteners.",
      build: "A low-cost, 3D-printable jig with swappable spec cards covering common fastener torque values for popular vehicle platforms, designed to clip onto a standard torque wrench.",
      result: "A physical, glanceable reference that removes guesswork from torque application without needing a subscription database or smartphone lookup.",
      tags: ["DfM", "3D printing", "Workshop tooling"]
    },
    {
      id: "prj-03",
      category: ["accessibility"],
      for: "For — Drivers with limited hand strength or mobility",
      title: "Low-Force Auxiliary Handbrake Lever",
      problem: "Standard handbrake levers require a firm pull that can be difficult for drivers with arthritis, limited grip strength, or recovering from hand injuries.",
      build: "A mechanical lever-ratio adaptor that clips onto the existing handbrake mechanism, reducing the force needed to engage it by redistributing leverage through a secondary pivot.",
      result: "A retrofit-only solution that needs no electronics or vehicle modification, cutting the required actuation force significantly based on early bench testing.",
      tags: ["Accessibility", "Mechanism design", "Retrofit"]
    },
    {
      id: "prj-04",
      category: ["students"],
      for: "For — Engineering students learning suspension dynamics",
      title: "Open-Source Suspension Geometry Simulator",
      problem: "Suspension kinematics are usually taught through static diagrams, making it hard for students to build intuition for how camber and roll centre shift through travel.",
      build: "A lightweight browser-based simulator where students drag suspension hardpoints and watch camber gain, roll centre height, and scrub radius update live.",
      result: "Turns an abstract topic into something students can manipulate directly, built to run on any laptop with no installed software.",
      tags: ["Software", "Vehicle dynamics", "Education"]
    },
    {
      id: "prj-05",
      category: ["mechanics"],
      for: "For — Mobile mechanics working without a lift",
      title: "Foldable Low-Profile Creeper Ramp Set",
      problem: "Mobile mechanics responding to roadside or driveway call-outs rarely have access to a hydraulic lift and need a safe way to access the underside of a car.",
      build: "A set of folding aluminium ramps with an integrated locking mechanism, designed to collapse flat enough to fit in a hatchback boot.",
      result: "Brings lift-level underbody access to call-out jobs, cutting setup time versus jack-and-stands while folding to under 8cm thick for transport.",
      tags: ["Structural design", "Portability", "Safety"]
    },
    {
      id: "prj-06",
      category: ["drivers"],
      for: "For — New drivers learning manual transmission",
      title: "Haptic Clutch-Bite Trainer Pedal",
      problem: "Learner drivers stalling on manual cars often can't feel where the clutch 'bites,' since that feedback is subtle and easy to miss under instruction-stress.",
      build: "A clip-on pedal attachment that gives a distinct haptic pulse at the clutch engagement point, exaggerating the feedback until the feel becomes second nature.",
      result: "Gives new drivers a tangible cue for biting point during early practice sessions, designed to be removed once the skill is internalised.",
      tags: ["Mechatronics", "Driver training", "Prototyping"]
    }
  ];

  const FILTER_LABELS = {
    all: "All builds",
    drivers: "Drivers",
    mechanics: "Mechanics & Workshops",
    accessibility: "Accessibility",
    students: "Students & Hobbyists"
  };

  /* ---------- RENDER PROJECT CARDS ---------- */
  const grid = document.getElementById("projectGrid");

  function renderProjects() {
    const frag = document.createDocumentFragment();

    projects.forEach((p, i) => {
      const card = document.createElement("article");
      card.className = "project-card";
      card.dataset.category = p.category.join(" ");
      card.setAttribute("tabindex", "0");

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
      `;

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
      const matches = filter === "all" || card.dataset.category.includes(filter);
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
