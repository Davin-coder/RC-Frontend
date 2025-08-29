// src/pages/hackatonList.js
import { HackathonsAPI } from "../utils/api.js";



export default function HackathonList() {
  return `
    <section class="p-6 space-y-6">
      <div class="flex items-center justify-between gap-3">
        <div>
          <h1 class="text-2xl md:text-3xl font-bold">Hackathones</h1>
          <p class="text-gray-500">Explora los eventos pasados y próximos</p>
        </div>
        <div class="w-full max-w-xs">
          <input id="hack-search" class="w-full rounded-lg border border-gray-200 px-3 py-2"
                 placeholder="Buscar por título o lugar..." />
        </div>
      </div>

      <div id="hack-grid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <p class="text-gray-500">Cargando hackathones…</p>
      </div>
    </section>
  `;
}

export async function initHackathonListEvents() {
  const grid = document.getElementById("hack-grid");
  const search = document.getElementById("hack-search");
  if (!grid) return;

  let list = [];
  try {
    list = await HackathonsAPI.list(); // normalizados
  } catch { list = []; }

  const render = (arr) => {
    if (!arr?.length) {
      grid.innerHTML = `<p class="text-gray-500">No hay hackathones para mostrar.</p>`;
      return;
    }
    grid.innerHTML = arr.map(card).join("");
    // Navegación al detalle
    grid.querySelectorAll("[data-id]").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-id");
        if (!id) return;
        window.location.hash = `#/HackathonDetail/${id}`;
      });
    });
  };

  render(list);

  // buscador simple
  let t;
  search?.addEventListener("input", () => {
    clearTimeout(t);
    t = setTimeout(() => {
      const q = (search.value || "").toLowerCase().trim();
      if (!q) return render(list);
      const filtered = list.filter(h =>
        (h.title || "").toLowerCase().includes(q) ||
        (h.location || "").toLowerCase().includes(q)
      );
      render(filtered);
    }, 180);
  });
}

/* =========
   Helpers UI
   ========= */
function card(h) {
  const dateTxt = h.date ? formatDate(h.date) : "Sin fecha";
  const badge = statusBadge(h.status, h.diasRestantes);
  const sub = [
    `📅 ${dateTxt}`,
    h.location ? `📍 ${escapeHtml(h.location)}` : null,
    h.participants ? `👥 ${escapeHtml(h.participants)}` : null,
  ].filter(Boolean).map(x => `<p class="text-gray-600">${x}</p>`).join("");

  return `
    <div class="bg-white shadow-md rounded-xl p-4 relative hover:shadow-lg transition-shadow">
      ${badge}
      <h2 class="text-xl font-bold mt-2">${escapeHtml(h.title)}</h2>
      ${h.desc ? `<p class="text-gray-600 mt-1 line-clamp-2">${escapeHtml(h.desc)}</p>` : ""}
      <div class="my-3 border-t"></div>
      ${sub}
      ${h.prize ? `<p class="font-bold text-purple-700 mt-2">${escapeHtml(h.prize)}</p>` : ""}
      <button data-id="${h.id}"
        class="mt-4 w-full bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition">
        Saber más
      </button>
    </div>
  `;
}

function statusBadge(status, diasRestantes) {
  // Si viene de la BD: upcoming | ongoing | finished
  if (status === "ongoing") {
    return `<span class="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded absolute top-3 right-3">Activo</span>`;
  }
  if (status === "finished") {
    return `<span class="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded absolute top-3 right-3">Finalizado</span>`;
  }
  // upcoming: intentamos el estilo “En X días” si tenemos conteo
  if (typeof diasRestantes === "number" && diasRestantes > 0 && diasRestantes <= 5) {
    return `<span class="bg-orange-100 text-orange-800 text-xs font-medium px-2.5 py-0.5 rounded absolute top-3 right-3">En ${diasRestantes} días</span>`;
  }
  return `<span class="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded absolute top-3 right-3">Próximamente</span>`;
}

function formatDate(iso) {
  const d = new Date(iso);
  if (isNaN(d)) return iso;
  return d.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
}

function escapeHtml(s="") {
  return s.replace(/[&<>"']/g, c => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;" }[c]));
}
