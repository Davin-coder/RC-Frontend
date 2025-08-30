import { hackathons, calcularDiasRestantes } from "../controllers/hackathonControllers.js";

/* ========== Vista CODER ========== */
export function HackathonListCoder() {
  return `
    <div class="p-6 space-y-6">
      <h1 class="text-2xl font-bold">Hackathons Disponibles</h1>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        ${hackathons.map(h => {
          let estadoBadge = '';
          if (h.estado === 'activo') {
            estadoBadge = `<span class="bg-green-100 text-green-800 text-xs px-2.5 py-0.5 rounded absolute top-3 right-3">Activo</span>`;
          } else if (h.estado.startsWith('en-')) {
            const dias = h.estado.split('-')[1];
            estadoBadge = `<span class="bg-orange-100 text-orange-800 text-xs px-2.5 py-0.5 rounded absolute top-3 right-3">En ${dias} días</span>`;
          } else {
            estadoBadge = `<span class="bg-blue-100 text-blue-800 text-xs px-2.5 py-0.5 rounded absolute top-3 right-3">Próximamente</span>`;
          }

          return `
            <div class="bg-white shadow-md rounded-xl p-4 relative hover:shadow-lg transition">
              ${estadoBadge}
              <h2 class="text-xl font-bold mt-2">${h.titulo}</h2>
              <p class="text-indigo-500 font-semibold">${h.categoria}</p>
              <div class="my-3 border-t"></div>
              <p class="text-gray-600">📅 ${h.fecha}</p>
              <p class="text-gray-600">📍 ${h.lugar}</p>
              <p class="text-gray-600">👥 ${h.participantes}</p>
              <p class="font-bold text-purple-700 mt-2">${h.premio}</p>
              <button onclick="window.location.hash = '#/hackathon/${h.id}'"
                class="mt-4 w-full bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition">
                Saber más
              </button>
            </div>
          `;
        }).join("")}
      </div>
    </div>
  `;
}

/* ========== Vista ADMIN ========== */
export function HackathonListAdmin() {
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

/* ========== Vista DETALLE ========== */
export function HackathonDetail(params) {
  const hackathon = hackathons.find(h => h.id === params.id);
  if (!hackathon) return `<p>No se encontró el hackathon</p>`;
  const diasRestantes = calcularDiasRestantes(hackathon.fechaInicio);
  const inscripcionesAbiertas = diasRestantes <= 5;

  return `
    <section class="p-6">
      <a href="#/hackathon" class="text-indigo-600 hover:underline">⬅ Volver</a>
      <h1 class="text-3xl font-bold mt-4">${hackathon.titulo}</h1>
      <p class="italic">${hackathon.categoria}</p>
      <p class="mt-2">${hackathon.descripcion || "Sin descripción"}</p>
      <p class="text-sm text-gray-600">Duración: ${hackathon.duracion || "48 horas"}</p>
      <p class="text-sm text-gray-600">Lenguajes: ${hackathon.lenguajes || "No especificados"}</p>
      <div class="mt-4">
        ${inscripcionesAbiertas 
          ? `<button class="bg-green-600 text-white px-4 py-2 rounded">Inscribirse</button>` 
          : `<p class="text-blue-600">Inscripciones próximamente</p>`}
      </div>
    </section>
  `;
}
