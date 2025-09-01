import { userStore } from "../../../utils/userStore";

// src/views/dashboardView/coder/Coder_dashboardView.js
function escapeHTML(str = "") {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export function TeamLeader_dashboardView() {
  const userName = userStore.name();
  const safeName = escapeHTML(userName);
  return `
    <section class="space-y-6">
      <header class="bg-card border rounded-xl p-5 shadow-sm">
        <h1 class="text-2xl md:text-3xl font-bold">
          Hola, <span id="dash-user-name" class="text-purple-700">${safeName}</span>👋
        </h1>
        <p class="text-gray-600 mt-1">Welcome to your Admin panel.</p>
      </header>
    </section>
  `;
}