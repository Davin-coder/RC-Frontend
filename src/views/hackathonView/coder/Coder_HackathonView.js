import { hackathons } from "../../../controllers/hackathonControllers/hackathonControllers.js";

export function Coder_HackathonView() {
  return `
    <div class="p-6 space-y-6">
      <h1 class="text-2xl font-bold">Available Hackathons</h1>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        ${hackathons.map(h => {
          let estadoBadge = '';
          if (h.estado === 'activo') {
            estadoBadge = `<span class="bg-green-100 text-green-800 text-xs px-2.5 py-0.5 rounded absolute top-3 right-3">Active</span>`;
          } else if (h.estado.startsWith('en-')) {
            const dias = h.estado.split('-')[1];
            estadoBadge = `<span class="bg-orange-100 text-orange-800 text-xs px-2.5 py-0.5 rounded absolute top-3 right-3">In ${dias} days</span>`;
          } else {
            estadoBadge = `<span class="bg-blue-100 text-blue-800 text-xs px-2.5 py-0.5 rounded absolute top-3 right-3">Coming soon</span>`;
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
                Learn more
              </button>
            </div>
          `;
        }).join("")}
      </div>
    </div>
  `;
}
