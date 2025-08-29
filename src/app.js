// src/main.js
import LoginView, { initLoginEvents } from "./pages/login.js";
import Dashboard, { initDashboardEvents } from "./pages/dashboard.js";
import Retos, { initRetosEvents, initTLRetosEvents } from "./pages/retos.js";
import Clan, { initClanEvents } from "./pages/clan.js";
import Perfil, { initPerfilEvents } from "./pages/perfil.js";
import Leaderboard, { initLeaderboardEvents } from "./pages/leaderboard.js";
import Galeria, { initGaleriaEvents } from "./pages/galeria.js";
import HackathonList, { initHackathonListEvents } from "./pages/hackatonList.js";

import Sidebar, { initSidebarEvents } from "./components/sidebar.js";
import Navbar from "./components/navbar.js";
import { userStore } from "./utils/userStore.js";

/* =================
   Helper de layout
================= */
function renderLayout(activeHash, innerHtml) {
  const app = document.getElementById("app");
  app.innerHTML = `
    <div class="flex h-screen">
      ${Sidebar(activeHash)}
      <div class="flex-1 flex flex-col min-w-0">
        ${Navbar()}
        <main class="flex-1 overflow-y-auto p-6">
          ${innerHtml}
        </main>
      </div>
    </div>
  `;
  initSidebarEvents?.();
}

/* =================
   Rutas disponibles
================= */
const routes = {
  "#/login": () => {
    const app = document.getElementById("app");
    app.innerHTML = LoginView();
    initLoginEvents?.();
  },

  "#/dashboard": () => {
    renderLayout("#/dashboard", Dashboard());
    initDashboardEvents?.();
  },

  "#/retos": () => {
    renderLayout("#/retos", Retos());
    const role = userStore.role();
    (role === "team_leader" || role === "admin")
      ? initTLRetosEvents?.()
      : initRetosEvents?.();
  },

  "#/clan": () => {
    renderLayout("#/clan", Clan());
    initClanEvents?.();
  },

  "#/perfil" : () => {
  renderLayout("#/perfil", Perfil());
  initPerfilEvents?.();
  },

  "#/leaderboard" : () => {
  renderLayout("#/leaderboard", Leaderboard());
  initLeaderboardEvents?.();
  },

  "#/galeria": () => {
  renderLayout("#/galeria", Galeria());
  initGaleriaEvents?.();
  },
  "#/HackathonList": () => {
  renderLayout("#/HackathonList", HackathonList());
  initHackathonListEvents?.();
}
};

/* =================
   Normalizador hash
================= */
function normalizeHash(h) {
  if (!h || h === "#" || h === "#/") return "#/dashboard";
  return h.startsWith("#/") ? h : "#/" + h.slice(1);
}

/* =================
   Render principal
================= */
function render() {
  let hash = normalizeHash(window.location.hash);

  // 🚦 Guard con localStorage (sin /me)
  const isLogged = !!userStore.get();
  if (!isLogged && hash !== "#/login") {
    hash = "#/login";
    history.replaceState(null, "", hash);
  }
  if (isLogged && hash === "#/login") {
    hash = "#/dashboard";
    history.replaceState(null, "", hash);
  }

  const route = routes[hash] || routes["#/dashboard"];
  route();
}

/* =================
   Listeners globales
================= */
window.addEventListener("hashchange", render);
window.addEventListener("load", render);
