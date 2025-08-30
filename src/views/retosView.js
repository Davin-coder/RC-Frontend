/* ===== Vista Retos ===== */
function RetosView({ title, subtitle, placeholderSearch, showButton = true }) {
  return `
    <section class="space-y-6">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl md:text-3xl font-bold">${title}</h1>
          <p class="text-gray-500">${subtitle}</p>
        </div>
      </div>

      <div class="grid gap-4 md:grid-cols-2">
        <div class="relative">
          <input id="search-retos" class="w-full rounded-lg border border-gray-200 pl-10 pr-4 py-2 focus:ring-2 focus:ring-purple-500" placeholder="${placeholderSearch}"/>
          <span class="absolute left-3 top-2.5 text-gray-400">🔎</span>
        </div>
      </div>

      <div id="retos-grid" class="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <p class="text-gray-500">Loading challenges...</p>
      </div>
    </section>
  `;
}

/* ===== Exportación según rol ===== */
export function Student_RetosView() {
  return RetosView({
    title: "Challenges",
    subtitle: "Explore and complete challenges to enhance your abilities.",
    placeholderSearch: "Search challenges...",
    showButton: true
  });
}

export function TL_RetosView() {
  return `
  <section class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl md:text-3xl font-bold">Mis Retos (TL)</h1>
        <p class="text-gray-500">Manage and monitor challenges for your team.</p>
      </div>
      <!-- Botón único Crear reto arriba -->
      <button id="btn-crear-reto" class="px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700">
        Crear reto
      </button>
    </div>

    <div class="grid gap-4 md:grid-cols-2">
      <div class="relative w-full">
        <input id="search-retos" class="w-full rounded-lg border border-gray-200 pl-10 pr-4 py-2 focus:ring-2 focus:ring-purple-500" placeholder="Buscar retos..."/>
        <span class="absolute left-3 top-2.5 text-gray-400">🔎</span>
      </div>
    </div>

    <div id="retos-grid" class="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      <p class="text-gray-500">Loading challenges...</p>
    </div>

    <!-- Contenedor para formulario -->
    <div id="form-container" class="mt-6"></div>
  </section>
  `;
}
