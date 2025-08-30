// src/main.js
import LoginView, { initLoginEvents } from "./pages/login.js";
import Dashboard, { initDashboardEvents } from "./pages/dashboard.js";
import Retos, { initRetosEvents, initTLRetosEvents } from "./pages/retos.js";
import Clan, { initClanEvents } from "./pages/clan.js";
import Perfil, { initPerfilEvents } from "./pages/perfil.js";
import Mentoria, { Coder_GestionMentoringController, TeamLeader_GestionMentoringController }  from "./pages/mentoria.js";
import Galeria, { initGaleriaEvents } from "./pages/galeria.js";
import HackathonList, { initHackathonListEvents } from "./pages/hackatonList.js";

import Sidebar, { initSidebarEvents } from "./components/sidebar.js";
import { userStore } from "./utils/userStore.js";

// 🔁 Navegación que SIEMPRE asegura un render
function navigate(hash) {
  if (window.location.hash !== hash) {
    window.location.hash = hash; // dispara hashchange
  } else {
    window.dispatchEvent(new HashChangeEvent("hashchange")); // fuerza render
  }
}

function renderLayout(activeHash, innerHtml) {
  const app = document.getElementById("app");
  app.innerHTML = `
    <div class="flex h-screen">
      ${Sidebar(activeHash)}
      <main class="flex-1 overflow-y-auto p-6">
        ${innerHtml}
      </main>
    </div>
  `;
  initSidebarEvents?.(); // inicializa eventos del menú lateral
}

const routes = {
  "#/login": () => {
    loginRoute(); // login se maneja solito (sin sidebar)
  },
  "#/dashboard": () => {
    renderLayout("#/dashboard", dashboardRoute());
  },
  "#/retos": () => {
    renderLayout("#/retos", RetosRoute());
  },
  "#/clan": () => {
    renderLayout("#/clan", clanRoute());
  },
  "#/perfil": () => {
    renderLayout("#/perfil", perfilRoute());
  },
  "#/mentoria": () => {
    renderLayout("#/mentoria", mentoringRoute());
  },
  "#/galeria": () => {
    renderLayout("#/galeria", GaleriaRoute());
  },
  "#/hackathon": (hash = "#/hackathon") => {
    renderLayout("#/hackathon", hackathonRoute(hash));
  },
};

function normalizeHash(h) {
  if (!h || h === "#" || h === "#/") return "#/dashboard";
  return h.startsWith("#/") ? h : "#/" + h.slice(1);
}

function render() {
  let hash = normalizeHash(window.location.hash);
  const isLogged = !!userStore.get();

  console.log("[router] hash=", hash, " isLogged=", isLogged);

  if (!isLogged && hash !== "#/login") {
    console.log("[router] no logueado → login");
    navigate("#/login");
    return;
  }
  if (isLogged && hash === "#/login") {
    console.log("[router] ya logueado en /login → dashboard");
    navigate("#/dashboard");
    return;
  }

  // 👇 manejar hackathon con hash dinámico
  if (hash.startsWith("#/hackathon")) {
    routes["#/hackathon"](hash);
    return;
  }

  const route = routes[hash] || routes["#/dashboard"];
  try {
    route();
  } catch (err) {
    console.error("[router] error en la ruta", hash, err);
    navigate("#/login");
  }
}

window.addEventListener("hashchange", render);
window.addEventListener("load", render);

export { navigate };
