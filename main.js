// main.js
import HomeView from "./src/pages/home.js";
import ChallengesView from "./src/pages/challenges.js";
import HackathonList from "./pages/HackathonList.js";
import HackathonDetail from "./pages/HackathonDetail.js";
import { AuthAPI } from "./src/utils/api.js"; // 👈 nuevo

const routes = {
  "/": HomeView,
  "/challenges": ChallengesView,
  "/hackathon": HackathonList,
  "/hackathon/:id": HackathonDetail,
};

// 👇 NUEVO: bootstrap del rol desde el backend
async function bootstrapRole() {
  try {
    const me = await AuthAPI.me(); // backend debe responder { role: "team_leader" | "coder" | "admin", ... }
    if (me?.role) {
      localStorage.setItem("role", me.role);
    } else {
      localStorage.setItem("role", "coder");
    }
  } catch {
    // Si no hay sesión, dejamos rol por defecto
    localStorage.setItem("role", "coder");
  }
}

function router() {
  const path = window.location.pathname;
  let view = routes[path];

  // --- Soporte para rutas dinámicas ---
  if (!view) {
    const hackathonRegex = /^\/hackathon\/([^/]+)$/; // ej: /hackathon/riwi2024
    const match = path.match(hackathonRegex);
    if (match) {
      view = routes["/hackathon/:id"];
      const params = { id: match[1] };
      document.getElementById("app").innerHTML = view(params);
    } else {
      document.getElementById("app").innerHTML = "<h1>404 - Página no encontrada</h1>";
    }
    return;
  }

  // --- Rutas normales ---
  document.getElementById("app").innerHTML = view();

  // Volver a enlazar los links con data-link
  document.querySelectorAll("[data-link]").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const href = link.getAttribute("href");
      history.pushState({}, "", href);
      router();
    });
  });
}

// Manejar la navegación con botones del navegador
window.addEventListener("popstate", router);

// 👇 NUEVO: primera carga con bootstrap de rol antes de renderizar
window.addEventListener("DOMContentLoaded", async () => {
  await bootstrapRole();
  router();
});