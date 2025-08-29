// src/pages/leaderboard.js
import { LeaderboardAPI } from "../utils/api.js";
import { userStore } from "../utils/userStore.js";

/* =========
   Router entry
   ========= */
export default function Leaderboard() {
  const role = (userStore.role() || "coder").toLowerCase();
  return (role === "team_leader" || role === "admin")
    ? TL_GestionEstudiantesView()
    : Student_LeaderboardView();
}

/* =========
   Vista Estudiante: Leaderboard dinámico
   ========= */
function Student_LeaderboardView() {
  return `
    <section class="space-y-6">
      <h1 class="text-2xl md:text-3xl font-bold">Leaderboard</h1>
      <p class="text-gray-500">Compite con los mejores desarrolladores de RIWI</p>

      <!-- Top 3 -->
      <div class="bg-white border rounded-xl p-6 shadow-sm">
        <h3 class="font-semibold mb-4">🏅 Top 3 Estudiantes</h3>
        <div id="podium" class="grid gap-6 md:grid-cols-3 items-end">
          <p class="text-gray-500">Cargando…</p>
        </div>
      </div>

      <div class="grid gap-6 lg:grid-cols-3">
        <!-- Ranking individual -->
        <div class="bg-white border rounded-xl p-5 shadow-sm lg:col-span-2">
          <h3 class="font-semibold mb-4">Ranking Individual (Top 5)</h3>
          <div id="rank" class="space-y-3">
            <p class="text-gray-500">Cargando…</p>
          </div>
        </div>

        <!-- Top Clanes -->
        <div class="bg-white border rounded-xl p-5 shadow-sm">
          <h3 class="font-semibold mb-4">Top Clanes</h3>
          <div id="clans" class="space-y-3">
            <p class="text-gray-500">Cargando…</p>
          </div>
        </div>
      </div>
    </section>
  `;
}

export async function initLeaderboardEvents() {
  const podiumEl = document.getElementById("podium");
  const rankEl   = document.getElementById("rank");
  const clansEl  = document.getElementById("clans");
  if (!podiumEl || !rankEl || !clansEl) return;

  try {
    const [coders, clans] = await Promise.all([
      LeaderboardAPI.topCoders(5),
      LeaderboardAPI.topClans(3),
    ]);

    // ---- Podium (Top 3 orden: 2°,1°,3°) ----
    const top3 = (coders || []).slice(0, 3);
    if (!top3.length) {
      podiumEl.innerHTML = `<p class="text-gray-500">Sin datos</p>`;
    } else {
      // orden visual: 2º, 1º (crown), 3º
      const [first, second, third] = [top3[0], top3[1], top3[2]];
      const podiumData = [second, first, third].map((c, i) => ({
        name: c?.name || "—",
        initials: initials(c?.name || "?"),
        xp: `${(c?.xp_total ?? 0)} XP`,
        color: i === 1 ? "gold" : (i === 0 ? "silver" : "amber"),
        crown: i === 1,
      }));
      podiumEl.innerHTML = podiumData.map(p =>
        podium(p.name, p.initials, p.xp, p.color, p.crown)
      ).join("");
    }

    // ---- Ranking (Top 5) ----
    if (!coders?.length) {
      rankEl.innerHTML = `<p class="text-gray-500">Sin datos</p>`;
    } else {
      rankEl.innerHTML = coders.slice(0, 5).map((c, idx) =>
        rankRow(
          idx + 1,
          c?.name || "—",
          c?.clan || "—",
          `${c?.xp_total ?? 0} XP`,
          `${c?.days_streak ?? 0} días`
        )
      ).join("");
    }

    // ---- Clanes ----
    if (!clans?.length) {
      clansEl.innerHTML = `<p class="text-gray-500">Sin datos</p>`;
    } else {
      clansEl.innerHTML = clans.slice(0, 3).map((cl, idx) =>
        clanRow(
          idx + 1,
          cl?.name || cl?.group_name || "—",
          `${cl?.members_count ?? 0} miembros`,
          `Líder: ${cl?.leader || "—"}`,
          `${cl?.xp_total ?? 0} XP`,
          idx === 2 // ejemplo: resaltar el 3º como en tu mock
        )
      ).join("");
    }
  } catch (e) {
    console.error("Leaderboard error:", e);
    podiumEl.innerHTML = rankEl.innerHTML = clansEl.innerHTML =
      `<p class="text-red-600">No se pudo cargar el leaderboard.</p>`;
  }
}

/* =========
   Vista Team Leader: Gestión de Estudiantes (tu mock)
   ========= */
function TL_GestionEstudiantesView() {
  const estudiantes = [
    { nombre:"Ana Gómez",  email:"ana@riwi.co",  estado:"Activo",   modulo:"Frontend",  xp:1200 },
    { nombre:"Luis Pérez", email:"luis@riwi.co", estado:"En riesgo",modulo:"Backend",   xp:800  },
    { nombre:"Sara Ruiz",  email:"sara@riwi.co", estado:"Graduado", modulo:"Fullstack", xp:1500 },
  ];

  return `
    <section class="space-y-6">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl md:text-3xl font-bold">Gestión de Estudiantes</h1>
          <p class="text-gray-500">Monitorea el progreso y rendimiento de todos los estudiantes</p>
        </div>
        <button class="px-3 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700">+ Agregar Estudiante</button>
      </div>

      <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div class="bg-white border rounded-xl p-5 shadow-sm"><p class="text-gray-500">Total Estudiantes</p><p class="text-2xl font-bold mt-2">124</p></div>
        <div class="bg-white border rounded-xl p-5 shadow-sm"><p class="text-gray-500">Activos</p><p class="text-2xl font-bold mt-2">118</p></div>
        <div class="bg-white border rounded-xl p-5 shadow-sm"><p class="text-gray-500">En Riesgo</p><p class="text-2xl font-bold mt-2 text-red-600">12</p></div>
        <div class="bg-white border rounded-xl p-5 shadow-sm"><p class="text-gray-500">Graduados</p><p class="text-2xl font-bold mt-2">89</p></div>
      </div>

      <div class="rounded-xl border overflow-hidden bg-white">
        <table class="w-full text-sm">
          <thead class="bg-gray-50 text-gray-600">
            <tr>
              <th class="text-left px-4 py-2">Nombre</th>
              <th class="text-left px-4 py-2">Email</th>
              <th class="text-left px-4 py-2">Estado</th>
              <th class="text-left px-4 py-2">Módulo</th>
              <th class="text-left px-4 py-2">XP</th>
              <th class="px-4 py-2"></th>
            </tr>
          </thead>
          <tbody>
            ${estudiantes.map(e => `
              <tr class="border-t">
                <td class="px-4 py-2">${e.nombre}</td>
                <td class="px-4 py-2 text-gray-500">${e.email}</td>
                <td class="px-4 py-2">${e.estado}</td>
                <td class="px-4 py-2">${e.modulo}</td>
                <td class="px-4 py-2">${e.xp}</td>
                <td class="px-4 py-2">
                  <div class="flex gap-2">
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
   Helpers (estudiante)
   ========= */
function podium(name, initials, xp, color="gray", crown=false){
  const map = { gold:"bg-yellow-300", silver:"bg-gray-300", amber:"bg-amber-300", gray:"bg-gray-300" };
  return `
    <div class="flex flex-col items-center">
      <div class="h-24 w-24 md:h-28 md:w-28 rounded-full ${map[color]} grid place-content-center text-xl font-semibold shadow">
        ${initials}
      </div>
      <p class="mt-3 font-semibold">${name} ${crown ? "👑" : ""}</p>
      <p class="text-sm text-gray-500">${xp}</p>
    </div>
  `;
}
function rankRow(pos, name, clan, xp, days){
  return `
    <div class="flex items-center justify-between border rounded-lg p-3">
      <div class="flex items-center gap-3">
        <span class="h-7 w-7 grid place-content-center rounded bg-gray-100 text-sm font-semibold">${pos}</span>
        <div>
          <p class="font-medium">${name}</p>
          <p class="text-xs text-gray-500">${clan}</p>
        </div>
      </div>
      <div class="text-right">
        <p class="font-semibold">${xp}</p>
        <p class="text-xs text-gray-400">${days}</p>
      </div>
    </div>
  `;
}
function clanRow(pos, name, members, leader, xp, highlight=false){
  return `
    <div class="flex items-center justify-between border rounded-lg p-3 ${highlight ? "bg-purple-50 border-purple-200" : ""}">
      <div class="flex items-center gap-3 min-w-0">
        <span class="h-7 w-7 grid place-content-center rounded bg-gray-100 text-sm font-semibold">${pos}</span>
        <div class="truncate">
          <p class="font-medium truncate">${name}</p>
          <p class="text-xs text-gray-500 truncate">${members} · ${leader}</p>
        </div>
      </div>
      <span class="px-2 py-1 rounded bg-gray-100 text-gray-700 text-sm">${xp}</span>
    </div>
  `;
}
function initials(name) { return name.split(/\s+/).map(n => n[0]).join("").slice(0, 2).toUpperCase(); }
