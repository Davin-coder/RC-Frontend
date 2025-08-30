// src/controllers/dashboardController.js
import { ChallengesAPI } from "../utils/api.js";

export async function initDashboardController() {
  const container = document.getElementById("challenges-list");
  if (!container) return;

  container.innerHTML = `<div class="col-span-full text-sm text-gray-500">Loading challenges…</div>`;

  try {
    const challenges = await ChallengesAPI.list(); 
    if (!Array.isArray(challenges) || !challenges.length) {
      container.innerHTML = `<div class="col-span-full text-sm text-gray-500">There are no challenges available.</div>`;
      return;
    }
    container.innerHTML = challenges.map(challengeCard).join("");
  } catch (err) {
    console.error("Error loading challenges:", err);
    container.innerHTML = `<div class="col-span-full text-sm text-red-600">Unable to load challenges.</div>`;
  }
}

/* ===== Helpers UI ===== */
function difficultyLabel(diff) {
  switch ((diff || "").toLowerCase()) {
    case "beginner": return { text: "Begginer",   cls: "bg-green-100 text-green-700" };
    case "intermediate": return { text: "Intermediate", cls: "bg-yellow-100 text-yellow-700" };
    case "advanced": return { text: "Advanced", cls: "bg-orange-100 text-orange-700" };
    default: return { text: "Without level", cls: "bg-gray-100 text-gray-700" };
  }
}

function challengeCard(ch = {}) {
  const { text, cls } = difficultyLabel(ch.difficulty);
  const title = escapeHtml(ch.title ?? "Without title");
  const desc = escapeHtml(ch.challenge_desc ?? "Without description");
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
