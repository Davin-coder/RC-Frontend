// src/components/sidebar.js
import { isTL, titleByRole } from "../utils/role.js";

export default function Sidebar(active = "#/dashboard") {
  const showCfg = isTL();

  const item = (hash, icon, label) => `
    <a href="${hash}"
       class="flex items-center gap-3 px-4 py-2 rounded-lg transition
              ${active === hash ? "bg-purple-600 text-white shadow" : "text-gray-700 hover:bg-gray-100"}">
      <span class="text-lg">${icon}</span>
      <span class="font-medium">${label}</span>
    </a>
  `;

  return `
    <aside class="w-64 bg-white border-r hidden md:flex flex-col">
      <div class="h-16 flex items-center px-4 border-b">
        <div class="h-9 w-9 rounded-lg bg-purple-600 text-white grid place-content-center font-bold">R</div>
        <span class="ml-3 font-semibold text-lg">RIWI</span>
      </div>

      <nav class="p-3 flex flex-col gap-1">
        ${item("#/dashboard","🏠", titleByRole("Dashboard","Dashboard"))}
        ${item("#/retos","📝",      titleByRole("Mis Retos","Gestión de Retos"))}
        ${item("#/clan","👥",       titleByRole("Mi Clan","Gestión de Clanes"))}
        ${item("#/perfil","👤",     titleByRole("Perfil","Analíticas"))}
        ${item("#/leaderboard","🏆",titleByRole("Leaderboard","Gestión de Estudiantes"))}
        ${item("#/galeria","🖼️",   titleByRole("Galería","Gestión de Galería"))}
        ${item("#/HackathonList","🖼️",titleByRole("HackathonList","Gestion de Hackathon"))}

      </nav>

      <div class="mt-auto p-4 border-t">
        <div class="flex items-center gap-3">
          <div class="h-10 w-10 rounded-full bg-gray-200 overflow-hidden">
            <img src="https://i.pravatar.cc/100?img=12" class="h-full w-full object-cover" alt="avatar"/>
          </div>
          <div class="min-w-0">
            <p class="font-semibold truncate">Alex Rodríguez</p>
            <p class="text-xs text-gray-500 truncate">Clan: Los Debuggers</p>
          </div>
        </div>
      </div>
    </aside>
  `;
}
