/* =========
   Estudiante: Vista Mis Retos
   ========= */
export function Student_RetosView() {
  return `
    <section class="space-y-6">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl md:text-3xl font-bold">Challenges</h1>
          <p class="text-gray-500">Explore and complete challenges for enhance your habilities.</p>
        </div>
      </div>
      <div class="grid gap-4 md:grid-cols-2">
        <div class="relative">
          <input id="search-retos"
                 class="w-full rounded-lg border border-gray-200 pl-10 pr-4 py-2 focus:ring-2 focus:ring-purple-500"
                 placeholder="Search challenges..."/>
          <span class="absolute left-3 top-2.5 text-gray-400">🔎</span>
        </div>
      </div>
      <div id="retos-grid" class="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <p class="text-gray-500">Loading challenges...</p>
      </div>
    </section>
  `;
}

/* =========
   Team Leader: Vista Gestión de Retos
   ========= */
export function TL_RetosView() {
  return `
    <section class="space-y-6">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl md:text-3xl font-bold">Challenges Management</h1>
          <p class="text-gray-500">Create, edit and manage Bootcamp challenges</p>
        </div>
        <button class="px-3 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700">+ Crear Reto</button>
      </div>

      <div class="rounded-xl border overflow-hidden bg-white">
        <table class="w-full text-sm">
          <thead class="bg-gray-50 text-gray-600">
            <tr>
              <th class="text-left px-4 py-2">Title</th>
              <th class="text-left px-4 py-2">Description</th>
              <th class="text-left px-4 py-2">Difficulty</th>
            </tr>
          </thead>
          <tbody id="retos-tbody">
            <tr><td class="px-4 py-2" colspan="3">Loading challenges...</td></tr>
          </tbody>
        </table>
      </div>
    </section>
  `;
}
