// src/views/clanView.js
import { titleByRole, subtitleByRole } from "../utils/role.js";

export function ClanView() {
  const title = titleByRole("Mi Clan", "Gestión de Clanes");
  const sub   = subtitleByRole("Información y miembros de tu clan", "Visualiza y administra los clanes");

  return `
    <section class="space-y-6">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl md:text-3xl font-bold">${title}</h1>
          <p class="text-gray-500">${sub}</p>
        </div>
        <div id="clan-actions" class="flex gap-2"></div>
      </div>

      <div id="clan-root" class="space-y-6">
        <p class="text-gray-500">Cargando información del clan…</p>
      </div>

      <!-- Modales -->
      <div id="clan-modal" class="hidden fixed inset-0 z-50">
        <div class="absolute inset-0 bg-black/40"></div>
        <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                    w-[95%] max-w-lg bg-white border rounded-2xl p-5">
          <div class="flex items-center justify-between">
            <h3 id="clan-modal-title" class="text-lg font-semibold">Modal</h3>
            <button id="clan-modal-close" class="h-9 w-9 grid place-content-center rounded-lg hover:bg-gray-100">✕</button>
          </div>
          <div id="clan-modal-body" class="mt-3"></div>
          <div class="mt-5 flex justify-end gap-2">
            <button id="clan-modal-cancel" class="px-3 py-2 rounded-lg border">Cancelar</button>
            <button id="clan-modal-submit" class="px-3 py-2 rounded-lg bg-purple-600 text-white">Guardar</button>
          </div>
        </div>
      </div>
    </section>
  `;
}
