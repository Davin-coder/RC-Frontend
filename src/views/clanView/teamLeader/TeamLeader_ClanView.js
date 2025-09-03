// src/views/tl/TeamLeader_ClanView.js
export function TeamLeader_ClanView() {
  return `
    <section class="space-y-6">
      <!-- Header -->
      <header class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h1 class="text-2xl md:text-3xl font-bold">Ver total grupos</h1>
        <button id="tl-btn-open-create"
          class="inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm bg-black text-white hover:opacity-90">
          + Crear grupo
        </button>
      </header>

      <!-- Toolbar -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div class="relative max-w-md w-full">
          <input id="tl-groups-search" type="search"
            placeholder="Buscar por nombre, creador…"
            class="w-full border rounded-lg pl-10 pr-3 py-2 text-sm focus:outline-none focus: ng" />
          <span class="absolute left-3 top-2.5 text-gray-400">🔎</span>
        </div>
        <div class="flex items-center gap-2 text-sm">
          <label class="text-gray-600">Orden:</label>
          <select id="tl-sort"
            class="border rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring">
            <option value="created_at:desc">Más recientes</option>
            <option value="created_at:asc">Más antiguos</option>
            <option value="name:asc">Nombre A–Z</option>
            <option value="name:desc">Nombre Z–A</option>
            <option value="members_count:desc">Más miembros</option>
          </select>
        </div>
      </div>

      <!-- Tabla de grupos -->
      <div class="overflow-x-auto rounded-xl border bg-white">
        <table class="w-full text-sm">
          <thead class="bg-gray-50 text-gray-600">
            <tr>
              <th class="text-left font-medium px-4 py-3">Nombre</th>
              <th class="text-left font-medium px-4 py-3">Creador</th>
              <th class="text-left font-medium px-4 py-3">Miembros</th>
              <th class="text-left font-medium px-4 py-3">Creado</th>
              <th class="text-right font-medium px-4 py-3">Acciones</th>
            </tr>
          </thead>
          <tbody id="tl-groups-table">
            <tr>
              <td colspan="5" class="px-4 py-6 text-center text-gray-500">
                Cargando grupos…
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Paginación -->
      <div id="tl-groups-pagination" class="flex items-center justify-center"></div>

      <!-- Drawer detalle grupo -->
      <aside id="tl-group-detail" class="hidden fixed inset-y-0 right-0 w-full sm:w-[440px] bg-white shadow-xl border-l z-40">
        <div class="flex items-center justify-between px-4 py-3 border-b">
          <h3 class="text-base font-semibold">Detalle del grupo</h3>
          <button id="tl-detail-close" class="text-sm text-gray-500 hover:text-gray-800">Cerrar ✕</button>
        </div>
        <div class="p-4 space-y-4">
          <div>
            <h4 class="text-lg font-semibold" id="tl-detail-name">—</h4>
            <p class="text-sm text-gray-600" id="tl-detail-desc">—</p>
            <p class="text-xs text-gray-500 mt-1">
              Creado: <span id="tl-detail-created">—</span>
            </p>
            <p class="text-sm mt-2">
              Creador: <span id="tl-detail-creator" class="font-medium">—</span>
            </p>
          </div>
          <div>
            <h5 class="text-sm font-medium mb-2">Miembros (<span id="tl-detail-members-count">0</span>)</h5>
            <ul id="tl-members-list" class="space-y-1 text-sm text-gray-800"></ul>
          </div>
        </div>
      </aside>

      <!-- Modal Crear/Editar -->
      <div id="tl-group-modal" class="hidden fixed inset-0 z-50">
        <div class="absolute inset-0 bg-black/30"></div>
        <div class="relative mx-auto mt-24 w-[95%] max-w-lg rounded-xl bg-white shadow-xl border">
          <div class="flex items-center justify-between px-4 py-3 border-b">
            <h3 id="tl-modal-title" class="text-base font-semibold">Crear grupo</h3>
            <button id="tl-modal-close" class="text-sm text-gray-500 hover:text-gray-800">✕</button>
          </div>
          <form id="tl-form-group" class="p-4 space-y-3">
            <input type="hidden" name="id_group" />
            <label class="block">
              <span class="text-sm font-medium">Nombre</span>
              <input name="group_name" required maxlength="60"
                class="mt-1 w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring"
                placeholder="Ej. Backend Wizards" />
            </label>
            <label class="block">
              <span class="text-sm font-medium">Descripción</span>
              <textarea name="description" rows="3" maxlength="300"
                class="mt-1 w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring"
                placeholder="Descripción del grupo…"></textarea>
            </label>
            <label class="block">
              <span class="text-sm font-medium">Creador (ID de usuario)</span>
              <input name="id_creator" type="number" min="1"
                class="mt-1 w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring"
                placeholder="Ej. 5" />
            </label>

            <div class="text-xs text-red-600 min-h-[1rem]" id="tl-form-error"></div>
            <div class="text-xs text-green-600 min-h-[1rem]" id="tl-form-ok"></div>

            <div class="flex items-center justify-end gap-2">
              <button type="button" id="tl-modal-cancel"
                class="border rounded-lg px-3 py-2 text-sm hover:bg-gray-50">Cancelar</button>
              <button type="submit" id="tl-modal-submit"
                class="border rounded-lg px-3 py-2 text-sm bg-black text-white hover:opacity-90">
                Guardar
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Modal Eliminar -->
      <div id="tl-delete-modal" class="hidden fixed inset-0 z-50">
        <div class="absolute inset-0 bg-black/30"></div>
        <div class="relative mx-auto mt-32 w-[95%] max-w-md rounded-xl bg-white shadow-xl border p-5">
          <h3 class="text-base font-semibold mb-2">Eliminar grupo</h3>
          <p class="text-sm text-gray-600">¿Seguro que deseas eliminar este grupo? Esta acción no se puede deshacer.</p>
          <div class="flex items-center justify-end gap-2 mt-4">
            <button id="tl-delete-cancel" class="border rounded-lg px-3 py-2 text-sm hover:bg-gray-50">Cancelar</button>
            <button id="tl-delete-confirm" class="border rounded-lg px-3 py-2 text-sm bg-red-600 text-white hover:opacity-90">
              Eliminar
            </button>
          </div>
        </div>
      </div>
    </section>
  `;
}
