// src/pages/dashboard.js
import { userStore } from "../utils/userStore.js";
import { ChallengesAPI } from "../utils/api.js";

export function initDashboardEvents() {
  const container = document.getElementById("challenges-list");
  if (!container) return;
  container.innerHTML = `<div class="col-span-full text-sm text-gray-500">Cargando retos…</div>`;
  (async () => {
    try {
      const challenges = await ChallengesAPI.list(); // [{id_challenge, title, challenge_desc, difficulty}]
      if (!challenges.length) {
        container.innerHTML = `<div class="col-span-full text-sm text-gray-500">No hay retos disponibles.</div>`;
        return;
      }
      container.innerHTML = challenges.map(challengeCard).join("");
    } catch (err) {
      console.error("Error cargando retos:", err);
      container.innerHTML = `<div class="col-span-full text-sm text-red-600">No se pudieron cargar los retos.</div>`;
    }
  })();
}

export default function Dashboard() {
  const role = userStore.role() || "coder";

  const header =
    role === "team_leader" || role === "admin"
      ? `<header class="mb-2"><h1 class="text-3xl font-bold">Panel de Administración</h1><p class="text-gray-500">Retos desde la base de datos</p></header>`
      : `<div><h1 class="text-2xl md:text-3xl font-bold">¡Hola, ${userStore.name()}! 👋</h1><p class="text-gray-500">Estos son los retos disponibles</p></div>`;

  return `
    <section class="space-y-6">
      ${header}
      <div class="bg-white border rounded-xl p-5 shadow-sm">
        <h3 class="font-semibold mb-4">Retos</h3>
        <div id="challenges-list" class="grid gap-6 md:grid-cols-2 xl:grid-cols-3"></div>
      </div>
    </section>
  `;
}

/* ===== Helpers UI ===== */
function difficultyLabel(diff) {
  switch ((diff || "").toLowerCase()) {
    case "beginner": return { text: "Básico",   cls: "bg-green-100 text-green-700" };
    case "intermediate": return { text: "Intermedio", cls: "bg-yellow-100 text-yellow-700" };
    case "advanced": return { text: "Avanzado", cls: "bg-orange-100 text-orange-700" };
    default: return { text: "Sin nivel", cls: "bg-gray-100 text-gray-700" };
  }
}

function challengeCard(ch) {
  debugger
  const { text, cls } = difficultyLabel(ch.difficulty);
  const title = escapeHtml(ch.title);
  const desc = escapeHtml(ch.challenge_desc || "Sin descripción");
  return `
    <article class="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition">
      <div class="flex items-start justify-between">
        <h3 class="text-lg font-semibold truncate">${title}</h3>
        <span class="text-xs px-2 py-0.5 rounded ${cls}">${text}</span>
      </div>
      <p class="text-gray-600 mt-2 line-clamp-3">${desc}</p>
      <div class="flex items-center justify-between mt-4">
        <span class="text-purple-700 font-semibold">XP</span>
        <button class="px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700">
          Ver Reto
        </button>
      </div>
    </article>
  `;
}

function escapeHtml(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
