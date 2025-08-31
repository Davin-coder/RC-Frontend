// src/views/coder/Coder_ClanView.js
export function Coder_ClanView() {
  return `
    <section class="space-y-8">
      <!-- Mi clan -->
      <div>
        <h1 class="text-2xl md:text-3xl font-bold mb-4">Mi clan</h1>
        <div id="my-group-card" class="rounded-xl border bg-white p-4 shadow-sm">
          <div class="text-sm text-gray-500">Cargando tu clan…</div>
        </div>
      </div>

      <!-- Explorar clanes -->
      <div id="explore-wrap" class="space-y-4">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div class="relative max-w-md w-full">
            <input
              id="groups-search"
              type="search"
              placeholder="Buscar clanes por nombre o descripción…"
              class="w-full border rounded-lg pl-10 pr-3 py-2 text-sm focus:outline-none focus:ring"
            />
            <span class="absolute left-3 top-2.5 text-gray-400">🔎</span>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" id="groups-list">
          <!-- Lista de clanes (rellena el controlador) -->
        </div>

        <div class="flex items-center justify-center mt-2" id="groups-pagination">
          <!-- Paginación -->
        </div>
      </div>
    </section>
  `;
}
