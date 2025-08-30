// src/views/galeriaView.js
import { userStore } from "../utils/userStore.js";

export function GaleriaView() {
  const role = (userStore.role() || "coder").toLowerCase();
  return (role === "team_leader" || role === "admin")
    ? TL_GaleriaView()
    : Student_GaleriaView();
}

/* =========
   Estudiante / TL (misma UI por ahora)
   ========= */
function Student_GaleriaView() {
  return `
    <section class="space-y-6">
      <div class="flex items-center justify-between gap-3">
        <div>
          <h1 class="text-2xl md:text-3xl font-bold">Galería de Proyectos</h1>
          <p class="text-gray-500">Submissions de hackathones y plantillas</p>
        </div>
        <div class="w-full max-w-xs">
          <input id="search-projects" class="w-full rounded-lg border border-gray-200 px-3 py-2"
                 placeholder="Buscar por título, autor, grupo..." />
        </div>
      </div>

      <div id="projects-grid" class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <p class="text-gray-500">Cargando proyectos…</p>
      </div>
    </section>
  `;
}

function TL_GaleriaView() {
  // Por ahora reutilizamos la misma vista
  return Student_GaleriaView();
}
