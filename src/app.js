// src/app.js

import loginRoute from "./routes/loginRoutes.js";
import dashboardRoute from "./routes/dashboardRoutes/dashboardRoutes.js";
import RetosRoute from "./routes/retosRoutes/retosRoutes.js";
//GRUPOS
import clanRoute from "./routes/clanRoutes/clanRoutes.js";
import perfilRoute from "./routes/perfilRoutes.js";
import mentoringRoute from "./routes/mentoriaRoutes/mentoria.js";
import vitrinaRoutes from "./routes/vitrinaRoutes/vitrinaRoutes.js";
import hackathonRoute from "./routes/hackathonRoutes/hackathonRoutes.js";

import Sidebar, { initSidebarEvents } from "./components/sidebar.js";
import { userStore } from "./utils/userStore.js";

function navigate(hash) {
  if (window.location.hash !== hash) {
    window.location.hash = hash; 
  } else {
    window.dispatchEvent(new HashChangeEvent("hashchange")); 
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
  initSidebarEvents?.(); 
}

const routes = {
  "#/login": () => {
    loginRoute(); 
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
    renderLayout("#/galeria", vitrinaRoutes());
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

  //  manejar hackathon con hash dinámico
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
