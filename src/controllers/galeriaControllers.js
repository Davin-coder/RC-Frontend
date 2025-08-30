// src/controllers/galeriaController.js
import { ProjectsAPI } from "../utils/api.js";

export async function initGaleriaController() {
  const grid = document.getElementById("projects-grid");
  const search = document.getElementById("search-projects");
  if (!grid) return;

  let projects = [];
  try {
    projects = await ProjectsAPI.list();
  } catch {
    projects = [];
  }

  const render = (list) => {
    if (!list?.length) {
      grid.innerHTML = `<p class="text-gray-500">No hay proyectos para mostrar.</p>`;
      return;
    }
    grid.innerHTML = list.map(cardProject).join("");
    grid.querySelectorAll("[data-url]").forEach(btn => {
      btn.addEventListener("click", () => {
        const url = btn.getAttribute("data-url");
        if (url) window.open(url, "_blank", "noopener,noreferrer");
      });
    });
  };

  render(projects);

  // Buscador en tiempo real
  let t;
  search?.addEventListener("input", () => {
    clearTimeout(t);
    t = setTimeout(() => {
      const q = (search.value || "").toLowerCase().trim();
      if (!q) return render(projects);
      const filtered = projects.filter(p =>
        (p.title || "").toLowerCase().includes(q) ||
        (p.description || "").toLowerCase().includes(q) ||
        (p.ownerName || "").toLowerCase().includes(q)
      );
      render(filtered);
    }, 180);
  });
}

/* =========
   Helpers
   ========= */
function cardProject(p) {
  const img = p.screenshots?.[0] || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop";
  const title = escapeHtml(p.title);
  const desc = escapeHtml((p.description || "").slice(0, 140)) + (p.description?.length > 140 ? "…" : "");
  const ownerBadge = p.ownerType === "group"
    ? `<span class="text-xs px-2 py-0.5 rounded bg-blue-100 text-blue-700">Grupo</span>`
    : (p.ownerType === "user"
        ? `<span class="text-xs px-2 py-0.5 rounded bg-emerald-100 text-emerald-700">Usuario</span>`
        : "");
  const owner = p.ownerName ? `<span class="text-xs text-gray-500">${escapeHtml(p.ownerName)}</span>` : "";

  const metrics = `
    <div class="flex items-center gap-3 text-xs text-gray-500">
      <span>⭐ ${Number(p.total || 0).toFixed(1)}</span>
      <span>👍 ${p.votes || 0}</span>
      <span>💬 ${p.comments || 0}</span>
    </div>
  `;

  const url = p.demoUrl || p.repoUrl || "";

  return `
    <article class="overflow-hidden rounded-xl border bg-white shadow-sm hover:shadow-md transition">
      <div class="aspect-[16/10] w-full overflow-hidden">
        <img src="${img}" alt="${title}" class="h-full w-full object-cover hover:scale-105 transition-transform"/>
      </div>
      <div class="p-4 space-y-2">
        <div class="flex items-center justify-between gap-2">
          <h3 class="text-lg font-semibold truncate">${title}</h3>
          ${ownerBadge}
        </div>
        <p class="text-sm text-gray-600">${desc}</p>
        <div class="flex items-center justify-between">
          ${owner}
          ${metrics}
        </div>
        <div class="pt-1">
          <button data-url="${url}" class="w-full md:w-auto px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700"
                  ${url ? "" : "disabled aria-disabled='true' class='opacity-60 cursor-not-allowed px-4 py-2 rounded-lg bg-gray-200 text-gray-500 w-full md:w-auto'"} >
            ${url ? "Ver proyecto" : "Sin demo"}
          </button>
        </div>
      </div>
    </article>
  `;
}

function escapeHtml(s="") {
  return s.replace(/[&<>"']/g, c => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;" }[c]));
}
