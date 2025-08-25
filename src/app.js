import Dashboard from "./pages/dashboard.js";
import Retos from "./pages/retos.js";
import Clan from "./pages/clan.js";
import Perfil from "./pages/perfil.js";
import Leaderboard from "./pages/leaderboard.js";
import Galeria from "./pages/galeria.js";
import Sidebar from "./components/sidebar.js";
import Navbar from "./components/navbar.js";

const routes = {
  "#/dashboard": Dashboard,
  "#/retos": Retos,
  "#/clan": Clan,
  "#/perfil": Perfil,
  "#/leaderboard": Leaderboard,
  "#/galeria": Galeria,
};

// 🔧 Normaliza cualquier hash tipo "#retos" → "#/retos"
function normalizeHash(h) {
  if (!h || h === "#") return "#/dashboard";
  return h.startsWith("#/") ? h : "#/" + h.slice(1);
}

function render() {
  // (opcional) si la URL llegó como "#retos", corrige la barra en la barra de direcciones
  if (window.location.hash && !window.location.hash.startsWith("#/")) {
    const fixed = "#/" + window.location.hash.slice(1);
    history.replaceState(null, "", fixed);
  }

  const hash = normalizeHash(window.location.hash);
  const View = routes[hash] || Dashboard;

  document.getElementById("app").innerHTML = `
    <div class="flex h-screen">
      ${Sidebar(hash)}
      <div class="flex-1 flex flex-col min-w-0">
        ${Navbar()}
        <main class="flex-1 overflow-y-auto p-6">${View()}</main>
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
