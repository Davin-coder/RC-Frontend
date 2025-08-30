// src/views/dashboardView.js
import { userStore } from "../utils/userStore.js";

export function DashboardView() {
  const role = userStore.role() || "coder";
  const name = userStore.name();

  const header =
    role === "team_leader" || role === "admin"
      ? `<header class="mb-2">
          <h1 class="text-3xl font-bold">Panel de Administración</h1>
          <p class="text-gray-500">Retos desde la base de datos</p>
        </header>`
      : `<div>
          <h1 class="text-2xl md:text-3xl font-bold">¡Hola, ${escapeHtml(name)}! 👋</h1>
          <p class="text-gray-500">Estos son los retos disponibles</p>
        </div>`;

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

function escapeHtml(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
