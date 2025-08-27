// src/pages/galeria.js
function getCurrentRole() {
  return localStorage.getItem("role") || "coder"; // "coder" | "team_leader" | "admin"
}

export default function Galeria() {
  const role = getCurrentRole();
  return (role === "team_leader" || role === "admin")
    ? TL_GaleriaView()
    : Student_GaleriaView();
}

/* =========
   Estudiante
   ========= */
function Student_GaleriaView() {
  const imgs = [
    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop",
  ];
  return `
    <section class="space-y-6">
      <h1 class="text-2xl md:text-3xl font-bold">Galería</h1>
      <p class="text-gray-500">Explora momentos del bootcamp</p>

      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        ${imgs.map(src => `
          <figure class="overflow-hidden rounded-xl border bg-white">
            <img src="${src}" class="h-48 w-full object-cover hover:scale-105 transition"/>
          </figure>
        `).join("")}
      </div>
    </section>
  `;
}

/* =========
   Team Leader / Admin
   ========= */
function TL_GaleriaView() {
  const imgs = [
    { id:"i1", src:"https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop" },
    { id:"i2", src:"https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1200&auto=format&fit=crop" },
    { id:"i3", src:"https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=1200&auto=format&fit=crop" },
    { id:"i4", src:"https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200&auto=format&fit=crop" },
    { id:"i5", src:"https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=1200&auto=format&fit=crop" },
    { id:"i6", src:"https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop" },
  ];
  return `
    <section class="space-y-6">
      <div class="flex items-start justify-between gap-3">
        <div>
          <h1 class="text-2xl md:text-3xl font-bold">Galería (Team Leader)</h1>
          <p class="text-gray-500">Administra y publica imágenes del bootcamp</p>
        </div>
        <div class="flex gap-2">
          <label class="px-3 py-2 rounded-lg border cursor-pointer bg-white">
            <input type="file" multiple accept="image/*" class="hidden" />
            Subir imágenes
          </label>
          <button class="px-3 py-2 rounded-lg bg-primary text-primary-foreground">Publicar seleccionadas</button>
          <button class="px-3 py-2 rounded-lg border">Eliminar seleccionadas</button>
        </div>
      </div>

      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        ${imgs.map(({ id, src }) => `
          <figure class="group overflow-hidden rounded-xl border bg-white relative">
            <img src="${src}" class="h-48 w-full object-cover group-hover:scale-105 transition"/>
            <div class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition"></div>
            <div class="absolute top-3 left-3">
              <input type="checkbox" aria-label="Seleccionar" data-id="${id}"
                class="h-4 w-4 rounded border-gray-300 accent-purple-600"/>
            </div>
            <div class="absolute bottom-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition">
              <button class="px-2 py-1 text-xs rounded border bg-white">Editar</button>
              <button class="px-2 py-1 text-xs rounded bg-destructive text-destructive-foreground">Eliminar</button>
            </div>
          </figure>
        `).join("")}
      </div>
    </section>
  `;
}
