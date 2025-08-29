// main.js
import Dashboard, { initDashboardEvents } from "./pages/dashboard.js";
import Retos from "./pages/retos.js";
import Clan from "./pages/clan.js";
import Perfil from "./pages/perfil.js";
import Leaderboard from "./pages/leaderboard.js";
import Galeria from "./pages/galeria.js";
import HackathonDetail from "./pages/hackatonDetail.js";
import HackathonList from "./pages/hackatonList.js";

import Sidebar from "./components/sidebar.js";
import Navbar, { initNavbarEvents } from "./components/navbar.js";

import LoginView, { initLoginEvents } from "./pages/login.js";
import { AuthAPI } from "./utils/api.js";
import { userStore } from "./utils/userStore.js";

/* =================
   Rutas de la SPA
================= */
const routes = {
  "#/dashboard": Dashboard,
  "#/retos": Retos,
  "#/clan": Clan,
  "#/perfil": Perfil,
  "#/leaderboard": Leaderboard,
  "#/galeria": Galeria,
  "#/HackathonList": HackathonList,
  "#/login": LoginView, // pública
};

/* =================
   Auth helpers
================= */
function isAuthenticated() {
  // true si hay user en el store (lo setea login o /users/me)
  return !!userStore.role();
}

// Si en el futuro quieres proteger rutas por rol, agrégalas aquí
const PROTECTED = {
  // "#/teamleader": ["team_leader", "admin"],
};
function isAllowed(hash) {
  const roles = PROTECTED[hash];
  if (!roles) return true;
  return roles.includes(userStore.role());
}

/* ===========================
   Bootstrap del usuario (1 vez)
=========================== */
let bootstrapped = false;
async function bootstrapUser() {
  try {
    const me = await AuthAPI.me(); // { ok, id, email, name, role }
    if (me?.ok) {
      userStore.set({ id: me.id, email: me.email, name: me.name, role: me.role });
    } else {
      userStore.clear();
    }
  } catch {
    userStore.clear();
  } finally {
    bootstrapped = true;
  }
}

/* =================
   Helpers de hash
================= */
function normalizeHash(h) {
  if (!h || h === "#" || h === "#/") return "#/dashboard";
  return h.startsWith("#/") ? h : "#/" + h.slice(1);
}

/* =================
   Render principal
================= */
async function render() {
  // Normaliza "#retos" -> "#/retos"
  if (window.location.hash && !window.location.hash.startsWith("#/")) {
    const fixed = "#/" + window.location.hash.slice(1);
    history.replaceState(null, "", fixed);
  }

  // Bootstrap de sesión (solo primera carga de la SPA)
  if (!bootstrapped) {
    const root = document.getElementById("app");
    if (root) root.innerHTML = `<div class="p-6 text-gray-500">Cargando…</div>`;
    await bootstrapUser();
  }

  let hash = normalizeHash(window.location.hash);
  let params = {};

  // ===== Guard de autenticación
  if (!isAuthenticated() && hash !== "#/login") {
    history.replaceState(null, "", "#/login");
    document.getElementById("app").innerHTML = LoginView();
    initLoginEvents?.(); // aquí, tras login correcto, haz userStore.set(data.user) y navega a #/dashboard
    return;
  }
  // Si ya está autenticado y va a /login, mándalo al dashboard
  if (isAuthenticated() && hash === "#/login") {
    history.replaceState(null, "", "#/dashboard");
    hash = "#/dashboard";
  }

  // ===== Guard por rol (si agregaste PROTECTED)
  if (!isAllowed(hash)) {
    history.replaceState(null, "", "#/dashboard");
    hash = "#/dashboard";
  }

  // ===== Resolver vista según hash
  let View = routes[hash];

  // Ruta dinámica: #/HackathonDetail/:id
  if (hash.startsWith("#/HackathonDetail/")) {
    View = HackathonDetail;
    params.id = hash.split("/")[2]; // ej. "#/HackathonDetail/riwi2025"
  }

  if (!View) View = Dashboard;

  // ===== Pintar
  const isLogin = hash === "#/login";
  if (isLogin) {
    document.getElementById("app").innerHTML = LoginView();
    initLoginEvents?.();
  } else {
    document.getElementById("app").innerHTML = `
      <div class="flex h-screen">
        ${Sidebar(hash)}
        <div class="flex-1 flex flex-col min-w-0">
          ${Navbar()}
          <main class="flex-1 overflow-y-auto p-6">${View(params)}</main>
        </div>
      </div>
    `;
    // Eventos de UI que dependen del DOM ya pintado
    initNavbarEvents?.();
    if (hash === "#/dashboard") initDashboardEvents?.();
  }

  // ===== Enlaces internos (normalización + guards en clic)
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener("click", (e) => {
      const href = a.getAttribute("href");
      const target = href && (href.startsWith("#/") ? href : "#/" + href.slice(1));

      // Auth guard en clicks
      if (!isAuthenticated() && target !== "#/login") {
        e.preventDefault();
        history.replaceState(null, "", "#/login");
        window.dispatchEvent(new HashChangeEvent("hashchange"));
        return;
      }

      // Guard por rol
      if (target && !isAllowed(target)) {
        e.preventDefault();
        history.replaceState(null, "", "#/dashboard");
        window.dispatchEvent(new HashChangeEvent("hashchange"));
        return;
      }

      // Normaliza "#retos" -> "#/retos"
      if (href && !href.startsWith("#/")) {
        e.preventDefault();
        window.location.hash = "#/" + href.slice(1);
      }
    });
  });
}

/* =================
   Listeners globales
================= */
window.addEventListener("hashchange", render);
window.addEventListener("load", render);
