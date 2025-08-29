import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { createIcons, icons } from "lucide";
import { isTL, titleByRole } from "../utils/role.js";
import { userStore } from "../utils/userStore.js";
import { AuthAPI } from "../utils/api.js";

export default function Sidebar(active = "#/dashboard") {
  const name = userStore.name();

  // now 'icon' is a lucide icon name string, e.g. "home", "user", "trophy"
  const item = (hash, iconName, label) => {
    const isActive = active === hash;

    return `
      <a href="${hash}"
         class="group flex items-center gap-3 px-4 py-2.5 rounded-xl transition
                ${isActive
                  ? "bg-gradient-to-r from-purple-600 to-purple-500 text-white shadow-md"
                  : "text-slate-700 hover:bg-slate-50"}">
        <i data-lucide="${iconName}" class="h-5 w-5 ${isActive ? "opacity-100" : "opacity-80 group-hover:opacity-100"}"></i>
        <span class="font-medium tracking-tight">${label}</span>
        ${isActive ? `<span class="ml-auto h-2 w-2 rounded-full bg-white/90 shadow"></span>` : ""}
      </a>
    `;
  };

  const menuInner = `
    <!-- Brand -->
    <div class="h-16 flex items-center px-4 border-b border-slate-200/70">
      <div class="h-10 w-10 rounded-xl bg-purple-600 text-white grid place-content-center font-bold shadow-sm">R</div>
      <div class="ml-3">
        <div class="font-semibold text-lg leading-tight">Riwi</div>
        <div class="text-[11px] uppercase tracking-wide text-slate-400">Level up coding</div>
      </div>
    </div>

    <!-- Nav -->
    <nav class="p-3 flex flex-col gap-1.5 flex-1">
      <div class="text-[11px] font-semibold tracking-wide text-slate-400 px-3 mt-1 mb-1">Overview</div>
      ${item("#/dashboard", "home", titleByRole("Dashboard","Dashboard"))}

      <div class="text-[11px] font-semibold tracking-wide text-slate-400 px-3 mt-3 mb-1">Work</div>
      ${item("#/retos",        "file-text",  titleByRole("Mis Retos","Gestión de Retos"))}
      ${item("#/clan",         "users",      titleByRole("Mi Clan","Gestión de Clanes"))}
      ${item("#/perfil",       "user",       titleByRole("Perfil","Analíticas"))}
      ${item("#/mentoria",  "trophy",     titleByRole("Mentoria","Gestión de Estudiantes"))}
      ${item("#/galeria",      "image",      titleByRole("Galería","Gestión de Galería"))}
      ${item("#/HackathonList","rocket",     titleByRole("Hackathons","Gestión de Hackathons"))}
    </nav>

    <!-- User / Logout -->
    <div class="border-t border-slate-200/70 p-4">
      <div class="flex items-center gap-3">
        <div class="h-9 w-9 shrink-0 rounded-full bg-gradient-to-br from-purple-600 to-purple-500 text-white grid place-content-center text-sm font-semibold">
          ${(name || "U").slice(0,1).toUpperCase()}
        </div>
        <div class="min-w-0">
          <div class="text-sm font-medium truncate">${name}</div>
          <div class="text-xs text-slate-400 truncate">Welcome back</div>
        </div>
        <button id="sidebar-logout"
                class="ml-auto px-3 py-1.5 text-xs rounded-lg border border-red-500 text-red-600 
                       hover:bg-red-50 hover:text-red-700 hover:border-red-600 transition inline-flex items-center gap-2">
          <i data-lucide="log-out" class="h-4 w-4"></i>
          Cerrar sesión
        </button>
      </div>
    </div>
  `;

  return `
    <!-- Hamburger (mobile only) -->
    <button id="menu-open"
            class="md:hidden fixed top-4 left-4 z-40 inline-flex items-center justify-center
                   h-10 w-10 rounded-xl border border-slate-200 bg-white/90 backdrop-blur
                   hover:bg-white shadow-sm">
      <i data-lucide="menu" class="h-5 w-5"></i>
    </button>

    <!-- Desktop sidebar -->
    <aside class="w-68 bg-white/95 backdrop-blur border-r border-slate-200 hidden md:flex flex-col rounded-r-2xl shadow-sm">
      ${menuInner}
    </aside>

    <!-- Mobile drawer -->
    <div id="mobile-drawer" class="md:hidden fixed inset-0 z-50 hidden">
      <!-- Backdrop -->
      <div id="mobile-backdrop" class="absolute inset-0 bg-black/40 opacity-0 transition-opacity"></div>

      <!-- Panel -->
      <div id="mobile-panel"
           class="absolute left-0 top-0 h-full w-[86%] max-w-80 bg-white rounded-r-2xl border-r border-slate-200
                  -translate-x-full transition-transform will-change-transform shadow-xl">
        <div class="h-16 flex items-center justify-between px-4 border-b border-slate-200/70">
          <div class="flex items-center">
            <div class="h-10 w-10 rounded-xl bg-purple-600 text-white grid place-content-center font-bold shadow-sm">R</div>
            <span class="ml-3 font-semibold text-lg">Riwi</span>
          </div>
          <button id="menu-close"
                  class="h-9 w-9 grid place-content-center rounded-lg hover:bg-slate-100">
            <i data-lucide="x" class="h-5 w-5"></i>
          </button>
        </div>
        ${menuInner}
      </div>
    </div>
  `;
}

export function initSidebarEvents() {
  const attachLogout = () => {
    document.querySelectorAll("#sidebar-logout").forEach(btn => {
      btn.onclick = async () => {
        const result = await Swal.fire({
          title: "¿Cerrar sesión?",
          text: "Tu sesión actual se cerrará",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#d33",
          cancelButtonColor: "#6b7280",
          confirmButtonText: "Sí, salir",
          cancelButtonText: "Cancelar"
        });

        if (!result.isConfirmed) return;

        try { await AuthAPI.logout(); } catch {}
        userStore.clear();
        history.replaceState(null, "", "#/login");
        window.dispatchEvent(new HashChangeEvent("hashchange"));

        // optional: tiny toast on success
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: "Sesión cerrada",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          customClass: { popup: "rounded-xl shadow-md" },
        });
      };
    });
  };

  // Mobile drawer wiring
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
    setTimeout(() => drawer.classList.add("hidden"), 200);
  };

  btnOpen && (btnOpen.onclick = open);
  btnClose && (btnClose.onclick = close);
  backdrop && (backdrop.onclick = close);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });

  panel?.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener("click", () => close());
  });

  attachLogout();

  // 🔧 Hydrate lucide icons after the sidebar is in the DOM
  // If you re-render the sidebar later, call this again.
  createIcons({ icons });
}
