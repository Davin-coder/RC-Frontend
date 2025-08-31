import { hackathons } from "../../../controllers/hackathonControllers/hackathonControllers.js";

/* ========== Vista ADMIN ========== */
export function TeamLeader_HackathonView() {
  return `
    <section class="p-6 space-y-6">
      <div class="flex justify-between items-center">
        <h1 class="text-2xl font-bold">Panel de Administración</h1>
        <button id="btnCrearHackathon"
          class="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition">
          ➕ Crear Hackathon
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        ${hackathons.map(h => `
          <div class="bg-gray-100 shadow rounded-xl p-4">
            <h2 class="font-bold">${h.titulo}</h2>
            <p>${h.categoria}</p>
            <p>${h.fecha} | ${h.participantes}</p>
            <p class="text-purple-700">${h.premio || ""}</p>
          </div>
        `).join("")}
      </div>
    </section>

    <!-- Modal Crear Hackathon -->
    <div id="modalCrearHackathon" class="hidden fixed inset-0 bg-black/50 flex items-center justify-center">
      <div class="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg">
        <h2 class="text-xl font-bold mb-4">Crear nuevo Hackathon</h2>
        <form id="formCrearHackathon" class="space-y-3">
          <input type="text" id="titulo" placeholder="Título" class="w-full border p-2 rounded" required />
          <textarea id="descripcion" placeholder="Descripción" class="w-full border p-2 rounded" rows="3" required></textarea>
          <textarea id="requisitos" placeholder="Requisitos / temática" class="w-full border p-2 rounded" rows="2" required></textarea>
          <input type="number" id="duracion" placeholder="Duración (días)" class="w-full border p-2 rounded" required />
          <input type="number" id="integrantes" placeholder="Integrantes por grupo" class="w-full border p-2 rounded" min="1" max="10" required />
          <input type="text" id="lenguajes" placeholder="Lenguajes a usar" class="w-full border p-2 rounded" required />
          <button type="submit" class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full">Guardar</button>
          <button type="button" id="btnCerrarModal" class="w-full mt-2 border rounded p-2">Cancelar</button>
        </form>
      </div>
    </div>
  `;
}