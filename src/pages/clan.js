// src/pages/clan.js
import { isTL, titleByRole, subtitleByRole } from "../utils/role.js";

export default function Clan() {
  return isTL() ? TL_ClanesView() : Student_ClanView();
}

/* =========
   Team Leader / Admin: Gestión de Clanes
   ========= */
function TL_ClanesView() {
  // Mock de clanes creados por coders
  const clanes = [
    { id:"cl1", name:"Frontend Ninjas", createdBy:"Ana Gómez", members:12, createdAt:"2025-06-10" },
    { id:"cl2", name:"Backend Wizards", createdBy:"Luis Pérez", members:9, createdAt:"2025-07-02" },
    { id:"cl3", name:"Fullstack Avengers", createdBy:"Sara Ruiz", members:15, createdAt:"2025-05-21" },
  ];

  const title = titleByRole("Mi Clan", "Gestión de Clanes");
  const sub   = subtitleByRole("Información y miembros de tu clan", "Visualiza todos los clanes creados por coders");

  return `
    <section class="space-y-6">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl md:text-3xl font-bold">${title}</h1>
          <p class="text-gray-500">${sub}</p>
        </div>
        <div class="flex gap-2">
          <button class="px-3 py-2 rounded-lg border">Exportar</button>
          <button class="px-3 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700">+ Crear Clan</button>
        </div>
      </div>

      <div class="grid gap-2 md:grid-cols-3">
        <input class="border rounded-lg px-3 py-2" placeholder="Buscar clanes..."/>
        <input class="border rounded-lg px-3 py-2" placeholder="Filtrar por creador..."/>
        <select class="border rounded-lg px-3 py-2">
          <option>Ordenar por</option>
          <option>Más miembros</option>
          <option>Más reciente</option>
          <option>Alfabético</option>
        </select>
      </div>

      <div class="rounded-xl border overflow-hidden bg-white">
        <table class="w-full text-sm">
          <thead class="bg-gray-50 text-gray-600">
            <tr>
              <th class="text-left px-4 py-2">Clan</th>
              <th class="text-left px-4 py-2">Creador</th>
              <th class="text-left px-4 py-2">Miembros</th>
              <th class="text-left px-4 py-2">Creado</th>
              <th class="px-4 py-2"></th>
            </tr>
          </thead>
          <tbody>
            ${clanes.map(c => `
              <tr class="border-t">
                <td class="px-4 py-2 font-medium">${c.name}</td>
                <td class="px-4 py-2 text-gray-500">${c.createdBy}</td>
                <td class="px-4 py-2">${c.members}</td>
                <td class="px-4 py-2">${c.createdAt}</td>
                <td class="px-4 py-2">
                  <div class="flex gap-2">
                    <button class="px-2 py-1 text-xs rounded border">Ver</button>
                    <button class="px-2 py-1 text-xs rounded border">Editar</button>
                    <button class="px-2 py-1 text-xs rounded bg-red-100 text-red-700">Eliminar</button>
                  </div>
                </td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </section>
  `;
}

/* =========
   Estudiante: Mi Clan
   ========= */
function Student_ClanView() {
  // Mock del clan del estudiante
  const miClan = {
    name: "Los Debuggers",
    leader: "Alex Rodríguez",
    createdAt: "2025-04-12",
    description: "Clan enfocado en resolver bugs y mejorar performance.",
    members: [
      { name:"Alex Rodríguez", role:"Líder" },
      { name:"María López", role:"Miembro" },
      { name:"Carlos Díaz", role:"Miembro" },
      { name:"Laura Mejía", role:"Miembro" },
    ],
  };

  const title = titleByRole("Mi Clan", "Gestión de Clanes");
  const sub   = subtitleByRole("Información y miembros de tu clan", "Visualiza todos los clanes creados por coders");

  return `
    <section class="space-y-6">
      <div>
        <h1 class="text-2xl md:text-3xl font-bold">${title}</h1>
        <p class="text-gray-500">${sub}</p>
      </div>

      <div class="grid gap-6 lg:grid-cols-3">
        <!-- Info del clan -->
        <div class="bg-white border rounded-xl p-5 shadow-sm">
          <h3 class="font-semibold">${miClan.name}</h3>
          <p class="text-sm text-gray-500 mt-1">Líder: ${miClan.leader}</p>
          <p class="text-sm text-gray-500">Creado: ${miClan.createdAt}</p>
          <p class="text-gray-600 mt-3">${miClan.description}</p>

          <div class="mt-4 flex gap-2">
            <button class="px-3 py-2 rounded-lg border">Invitar</button>
            <button class="px-3 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700">Crear reto interno</button>
          </div>
        </div>

        <!-- Miembros -->
        <div class="bg-white border rounded-xl p-5 shadow-sm lg:col-span-2">
          <h3 class="font-semibold mb-4">Miembros</h3>
          <div class="space-y-3">
            ${miClan.members.map(m => `
              <div class="flex items-center justify-between border rounded-lg p-3">
                <div class="flex items-center gap-3">
                  <span class="h-8 w-8 rounded-full bg-gray-100 grid place-content-center font-semibold">
                    ${initials(m.name)}
                  </span>
                  <div>
                    <p class="font-medium">${m.name}</p>
                    <p class="text-xs text-gray-500">${m.role}</p>
                  </div>
                </div>
                <button class="px-3 py-1 rounded-lg border text-sm">Ver perfil</button>
              </div>
            `).join("")}
          </div>
        </div>
      </div>
    </section>
  `;
}

/* =========
   Helpers
   ========= */
function initials(name) {
  return name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();
}
