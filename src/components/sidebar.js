import { isTL, titleByRole } from "../utils/role.js";
import { userStore } from "../utils/userStore.js";
import { AuthAPI } from "../utils/api.js"; // o ../utils/auth.js si ese es tu archivo

export default function Sidebar(active = "#/dashboard") {
  const name = userStore.name();

  const item = (hash, icon, label) => `
    <a href="${hash}"
       class="flex items-center gap-3 px-4 py-2 rounded-lg transition
              ${active === hash ? "bg-purple-600 text-white shadow" : "text-gray-700 hover:bg-gray-100"}">
      <span class="text-lg">${icon}</span>
      <span class="font-medium">${label}</span>
    </a>
  `;

  const menuInner = `
    <!-- Logo -->
    <div class="h-16 flex items-center px-4 border-b">
      <div class="h-9 w-9 rounded-lg bg-purple-600 text-white grid place-content-center font-bold">R</div>
      <span class="ml-3 font-semibold text-lg">RIWI</span>
    </div>

    <!-- Links -->
    <nav class="p-3 flex flex-col gap-1 flex-1">
      ${item("#/dashboard","🏠", titleByRole("Dashboard","Dashboard"))}
      ${item("#/retos","📝",      titleByRole("Mis Retos","Gestión de Retos"))}
      ${item("#/clan","👥",       titleByRole("Mi Clan","Gestión de Clanes"))}
      ${item("#/perfil","👤",     titleByRole("Perfil","Analíticas"))}
      ${item("#/leaderboard","🏆",titleByRole("Leaderboard","Gestión de Estudiantes"))}
      ${item("#/galeria","🖼️",   titleByRole("Galería","Gestión de Galería"))}
      ${item("#/HackathonList","🚀",titleByRole("Hackathons","Gestión de Hackathons"))}
    </nav>

    <!-- Usuario + logout -->
    <div class="border-t p-4 flex items-center justify-between">
      <span class="text-sm font-medium truncate">${name}</span>
      <button id="sidebar-logout" class="px-3 py-1.5 text-sm rounded-lg border hover:bg-gray-50">Cerrar sesión</button>
    </div>
  `;

  return `
    <!-- Botón hamburguesa (solo móvil) -->
    <button id="menu-open"
            class="md:hidden fixed top-4 left-4 z-40 inline-flex items-center justify-center
                   h-10 w-10 rounded-lg border bg-white/90 backdrop-blur hover:bg-gray-50">
      ☰
    </button>

    <!-- Sidebar escritorio -->
    <aside class="w-64 bg-white border-r hidden md:flex flex-col">
      ${menuInner}
    </aside>

    <!-- Drawer móvil -->
    <div id="mobile-drawer" class="md:hidden fixed inset-0 z-50 hidden">
      <!-- Backdrop -->
      <div id="mobile-backdrop" class="absolute inset-0 bg-black/40 opacity-0 transition-opacity"></div>
      <!-- Panel -->
      <div id="mobile-panel"
           class="absolute left-0 top-0 h-full w-[80%] max-w-72 bg-white border-r
                  -translate-x-full transition-transform will-change-transform">
        <div class="h-16 flex items-center justify-between px-4 border-b">
          <div class="flex items-center">
            <div class="h-9 w-9 rounded-lg bg-purple-600 text-white grid place-content-center font-bold">R</div>
            <span class="ml-3 font-semibold text-lg">RIWI</span>
          </div>
          <button id="menu-close" class="h-9 w-9 grid place-content-center rounded-lg hover:bg-gray-100">✕</button>
        </div>
        ${menuInner}
      </div>
    </div>
  `;
}

export function initSidebarEvents() {
  // Logout (funciona para escritorio y móvil)
  const attachLogout = () => {
    document.querySelectorAll("#sidebar-logout").forEach(btn => {
      btn.onclick = async () => {
        try { await AuthAPI.logout(); } catch {}
        userStore.clear();
        history.replaceState(null, "", "#/login");
        window.dispatchEvent(new HashChangeEvent("hashchange"));
      };
    });
  };

  // ----- Mobile drawer -----
  const drawer = document.getElementById("mobile-drawer");
  const panel  = document.getElementById("mobile-panel");
  const backdrop = document.getElementById("mobile-backdrop");
  const btnOpen = document.getElementById("menu-open");
  const btnClose = document.getElementById("menu-close");

  const open = () => {
    if (!drawer || !panel || !backdrop) return;
    drawer.classList.remove("hidden");
    requestAnimationFrame(() => {
      panel.classList.remove("-translate-x-full");
      backdrop.classList.remove("opacity-0");
    });
  };

  const close = () => {
    if (!drawer || !panel || !backdrop) return;
    panel.classList.add("-translate-x-full");
    backdrop.classList.add("opacity-0");
    // espera la animación (~200ms) y oculta el contenedor
    setTimeout(() => drawer.classList.add("hidden"), 200);
  };

  btnOpen && (btnOpen.onclick = open);
  btnClose && (btnClose.onclick = close);
  backdrop && (backdrop.onclick = close);

  // Cerrar con ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });

  // Cerrar al navegar (cualquier link dentro del panel)
  panel?.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener("click", () => close());
  });

  attachLogout();
}
