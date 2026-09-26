/* =========================================================
   Launchpad project cards
   Renders real project cards from projects.json, replacing the
   static placeholders. Falls back to the placeholders untouched
   when the manifest is missing, empty, or unreachable.

   Uses textContent/createElement only — never innerHTML — so a
   malicious projects.json (e.g. via a compromised upload) cannot
   inject markup or scripts.
   ========================================================= */

(() => {
  "use strict";

  const grid = document.getElementById("project-grid");
  if (!grid) return;

  fetch("projects.json", { cache: "no-store" })
    .then((res) => (res.ok ? res.json() : []))
    .then((data) => {
      if (!Array.isArray(data) || data.length === 0) return; // keep placeholders
      renderCards(data);
    })
    .catch(() => {
      /* keep placeholders on any network/parse failure */
    });

  function renderCards(projects) {
    grid.textContent = "";
    projects.forEach((project) => grid.appendChild(buildCard(project)));
  }

  function buildCard(project) {
    const article = document.createElement("article");
    article.className = "project-card reveal";

    const icon = document.createElement("div");
    icon.className = "project-icon";
    icon.textContent = project.icon || "🛰️";
    article.appendChild(icon);

    const title = document.createElement("h3");
    title.textContent = project.name || "Untitled project";
    article.appendChild(title);

    if (project.description) {
      const desc = document.createElement("p");
      desc.textContent = project.description;
      article.appendChild(desc);
    }

    if (Array.isArray(project.tags) && project.tags.length) {
      const tagRow = document.createElement("div");
      tagRow.className = "tags";
      project.tags.forEach((tag) => {
        const span = document.createElement("span");
        span.className = "tag";
        span.textContent = String(tag);
        tagRow.appendChild(span);
      });
      article.appendChild(tagRow);
    }

    const links = document.createElement("div");
    links.className = "project-links";
    links.appendChild(buildLink(project.demoUrl, "Live Demo"));
    links.appendChild(buildLink(project.sourceUrl, "Source Code"));
    article.appendChild(links);

    return article;
  }

  function buildLink(href, label) {
    if (href) {
      const a = document.createElement("a");
      a.href = href;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.className = "link-active";
      a.textContent = label;
      return a;
    }
    const span = document.createElement("span");
    span.className = "link-disabled";
    span.textContent = label;
    return span;
  }
})();
