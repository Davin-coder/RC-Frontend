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
  "#/galeria": Galeria
};

function getCurrentRole() {
  return localStorage.getItem("role") || "team_leader"; 
}


// Rutas protegidas por rol
const PROTECTED = {
  "#/teamleader": ["team_leader", "admin"],
};

// ✅ helper
function isAllowed(hash) {
  const roles = PROTECTED[hash];
  if (!roles) return true;              // no protegida
  return roles.includes(getCurrentRole());
}

// ✅ Normaliza cualquier hash tipo "#", "#/", "#retos" → "#/dashboard" o "#/retos"
function normalizeHash(h) {
  if (!h || h === "#" || h === "#/") return "#/dashboard";
  return h.startsWith("#/") ? h : "#/" + h.slice(1);
}

// ✅ Si el path es raro ("/", "//", "///") o el hash vacío, corrige a /#/dashboard
function ensureCanonicalUrl() {
  const { pathname, hash } = window.location;
  if (/^\/{2,}$/.test(pathname)) {
    history.replaceState(null, "", "/");
  }
  if (!hash || hash === "#" || hash === "#/") {
    history.replaceState(null, "", "/#/dashboard");
  }
}

function render() {
  ensureCanonicalUrl();

  if (window.location.hash && !window.location.hash.startsWith("#/")) {
    const fixed = "#/" + window.location.hash.slice(1);
    history.replaceState(null, "", fixed);
  }

  let hash = normalizeHash(window.location.hash);

  // 🔒 GUARD POR ROL (NUEVO)
  if (!isAllowed(hash)) {
    history.replaceState(null, "", "#/dashboard");
    hash = "#/dashboard";
  }

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


  // Bloquea clics a rutas protegidas si el rol no alcanza (opcional, UX)
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener("click", (e) => {
      const href = a.getAttribute("href");
      const target = href && (href.startsWith("#/") ? href : "#/" + href.slice(1));
      if (target && !isAllowed(target)) {
        e.preventDefault();
        history.replaceState(null, "", "#/dashboard");
        window.dispatchEvent(new HashChangeEvent("hashchange"));
        return;
      }
      if (href && !href.startsWith("#/")) {
        e.preventDefault();
        window.location.hash = "#/" + href.slice(1);
      }
    });
  });
}

window.addEventListener("hashchange", render);
window.addEventListener("load", render);

