// main.js

// 👇 ahora importas de routes (no de pages)
import RetosRoute from "./src/routes/retosRoutes.js"; // antes ChallengesView -> ahora retos
import hackathonRoute from "./src/routes/hackathonRoutes.js"; // combina list + detail

import { AuthAPI } from "./src/utils/api.js"; // esto queda igual ✅

// Definición de rutas
const routes = {
  "/challenges": RetosRoute,     // ahora se llama retos
  "/hackathon": hackathonRoute,   // ruta principal
  "/hackathon/:id": hackathonRoute, // misma función, pero con params
};

// 👇 bootstrap del rol desde el backend
async function bootstrapRole() {
  try {
    const me = await AuthAPI.me();
    if (me?.role) {
      localStorage.setItem("role", me.role);
    } else {
      localStorage.setItem("role", "coder");
    }
  } catch {
    localStorage.setItem("role", "coder");
  }
}

function router() {
  const path = window.location.pathname;
  let view = routes[path];

  // --- Soporte para rutas dinámicas ---
  if (!view) {
    const hackathonRegex = /^\/hackathon\/([^/]+)$/; 
    const match = path.match(hackathonRegex);
    if (match) {
      view = routes["/hackathon/:id"];
      const params = { id: match[1] };
      document.getElementById("app").innerHTML = view(params); // 👈 ejecuta el route
    } else {
      document.getElementById("app").innerHTML = "<h1>404 - Page Not Found</h1>";
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

// 👇 bootstrap de rol antes de renderizar
window.addEventListener("DOMContentLoaded", async () => {
  await bootstrapRole();
  router();
});
