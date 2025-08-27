// main.js
import Dashboard from "./pages/dashboard.js";
import Retos from "./pages/retos.js";
import Clan from "./pages/clan.js";
import Perfil from "./pages/perfil.js";
import Leaderboard from "./pages/leaderboard.js";
import Galeria from "./pages/galeria.js";
import HackathonDetail from "./pages/hackatonDetail.js";
import HackathonList from "./pages/hackatonList.js";
import Sidebar from "./components/sidebar.js";
import Navbar from "./components/navbar.js";

const routes = {
  "#/dashboard": Dashboard,
  "#/retos": Retos,
  "#/clan": Clan,
  "#/perfil": Perfil,
  "#/leaderboard": Leaderboard,
  "#/galeria": Galeria,
  "#/HackathonList": HackathonList,
};

// ✅ Normaliza cualquier hash tipo "#", "#/", "#retos" → "#/dashboard" o "#/retos"
function normalizeHash(h) {
  if (!h || h === "#" || h === "#/") return "#/dashboard";
  return h.startsWith("#/") ? h : "#/" + h.slice(1);
}

// ✅ Si el path es raro ("/", "//", "///") o el hash vacío, corrige a /#/dashboard
function ensureCanonicalUrl() {
  const { pathname, hash } = window.location;

  // Si el path tiene más de una barra (//, ///)
  if (/^\/{2,}$/.test(pathname)) {
    history.replaceState(null, "", "/");
  }

  // Si no hay hash o es "#"/"#/", fuerza dashboard
  if (!hash || hash === "#" || hash === "#/") {
    history.replaceState(null, "", "/#/dashboard");
  }
}

function render() {
  // (opcional) si la URL llegó como "#retos", corrige la barra en la barra de direcciones
  if (window.location.hash && !window.location.hash.startsWith("#/")) {
    const fixed = "#/" + window.location.hash.slice(1);
    history.replaceState(null, "", fixed);
  }

  const hash = normalizeHash(window.location.hash);

  let View = routes[hash];
  let params = {};

  // 👉 Detectamos HackathonDetail con id
  if (hash.startsWith("#/HackathonDetail/")) {
    View = HackathonDetail;
    params.id = hash.split("/")[2]; // ej: "riwi2024"
  }

  if (!View) View = Dashboard;

  document.getElementById("app").innerHTML = `
    <div class="flex h-screen">
      ${Sidebar(hash)}
      <div class="flex-1 flex flex-col min-w-0">
        ${Navbar()}
        <main class="flex-1 overflow-y-auto p-6">${View(params)}</main>
      </div>
    </div>
  `;

  // Si usas enlaces como <a href="#retos">, los normalizamos al hacer clic
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener("click", (e) => {
      const href = a.getAttribute("href");
      if (href && !href.startsWith("#/")) {
        e.preventDefault();
        window.location.hash = "#/" + href.slice(1);
      }
    });
  });
}

window.addEventListener("hashchange", render);
window.addEventListener("load", render);
