// src/views/profileView.js
import { userStore } from "../utils/userStore.js";

/* ==========================
   Vista Estudiante
   ========================== */
export function Student_ProfileView() {
  const u = userStore.get() || {};
  const initialsText = initials(u.first_name || u.name || u.email || u.id_clan || "U");

  const rolesFromStore = collectRolesFromStore(u);
  const skillsFromStore = collectSkillsFromStore(u);

  return `
    <section class="space-y-6">
      <h1 class="text-2xl md:text-3xl font-bold">Mi Perfil</h1>
      <p class="text-gray-500">Gestiona tu información personal y progreso</p>

      <div class="grid gap-6 lg:grid-cols-3">
        <!-- Resumen -->
        <div class="bg-white border rounded-xl p-5 shadow-sm">
          <div class="flex flex-col items-center text-center">
            <div class="h-20 w-20 rounded-full bg-purple-100 text-purple-700 grid place-content-center text-2xl font-bold">
              ${initialsText}
            </div>
            <h3 class="mt-3 text-lg font-semibold">${u.first_name || u.name || u.email || "Usuario"}</h3>

            <div class="flex flex-wrap gap-2 mt-2">
              ${rolesFromStore.length
                ? rolesFromStore.map(r => roleBadge(r)).join("")
                : `<span class="text-xs text-gray-500">Sin rol</span>`}
            </div>
          </div>

          <div class="mt-5 grid gap-3">
            ${row("Email", u.email )}
            ${row("Clan", u.id_clan)}
          </div>
        </div>

        <!-- Formulario -->
        <div class="bg-white border rounded-xl p-5 shadow-sm lg:col-span-2">
          <h3 class="font-semibold mb-4">Editar Perfil</h3>
          <form id="profile-form" class="grid gap-4 md:grid-cols-2">
            ${input("Nombre", u.first_name || u.name || "", "first_name")}
            ${input("Apellido", u.last_name || "", "last_name")}
            ${input("Email", u.email || "", "email", "email")}
            <div class="md:col-span-2">
              <label class="text-sm text-gray-600">Biografía</label>
              <textarea name="bio" class="w-full mt-1 rounded-lg border border-gray-200 p-2 focus:ring-2 focus:ring-purple-500" rows="4">${
                u.bio || ""
              }</textarea>
            </div>
            <div class="md:col-span-2 flex items-center gap-3">
              <button type="submit" class="px-5 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700">Guardar Cambios</button>
              <span id="profile-msg" class="text-sm text-gray-500"></span>
            </div>
          </form>
        </div>
      </div>

      <!-- Skills -->
      <div class="bg-white border rounded-xl p-5 shadow-sm">
        <div class="flex items-center justify-between">
          <h3 class="font-semibold">Habilidades</h3>
          <button id="btn-add-skill" class="px-3 py-1.5 rounded-lg border text-sm">Añadir skill</button>
        </div>
        <div id="skills-list" class="mt-4">
          ${skillsFromStore.length
            ? skillsFromStore.map(s => skillRow(s.name, s.level)).join("")
            : `<p class="text-gray-500 text-sm">Aún no tienes habilidades registradas.</p>`}
        </div>
      </div>
    </section>

    <!-- Modal skills -->
    <div id="skill-modal" class="hidden fixed inset-0 z-50">
      <div class="absolute inset-0 bg-black/40"></div>
      <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                  w-[95%] max-w-md bg-white border rounded-2xl p-5">
        <div class="flex items-center justify-between">
          <h3 id="skill-modal-title" class="text-lg font-semibold">Skill</h3>
          <button id="skill-modal-close" class="h-9 w-9 grid place-content-center rounded-lg hover:bg-gray-100">✕</button>
        </div>
        <div class="mt-3 space-y-3">
          <div>
            <label class="text-sm text-gray-600">Nombre</label>
            <input id="skill-name" class="w-full border rounded-lg px-3 py-2" />
          </div>
          <div>
            <label class="text-sm text-gray-600">Nivel (1 a 5)</label>
            <input id="skill-level" type="number" min="1" max="5" class="w-full border rounded-lg px-3 py-2" />
          </div>
        </div>
        <div class="mt-5 flex justify-end gap-2">
          <button id="skill-cancel" class="px-3 py-2 rounded-lg border">Cancelar</button>
          <button id="skill-save" class="px-3 py-2 rounded-lg bg-purple-600 text-white">Guardar</button>
        </div>
      </div>
    </div>
  `;
}

/* ==========================
   Vista TL/Admin (Analíticas)
   ========================== */
export function TL_AnalyticsView() {
  return `
    <section class="space-y-6">
      <h1 class="text-2xl md:text-3xl font-bold">Analíticas</h1>
      <p class="text-gray-500">Monitorea el rendimiento general de estudiantes y clanes</p>
      <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        ${statCard("Estudiantes Activos","124","+12% desde el mes pasado")}
        ${statCard("Retos Completados","1,847","+23% desde el mes pasado")}
        ${statCard("Insignias Otorgadas","342","+8% desde el mes pasado")}
        ${statCard("Tasa de Finalización","87%","+5% este mes")}
      </div>
      <div class="grid gap-6 lg:grid-cols-2">
        <div class="bg-white border rounded-xl p-5 shadow-sm"><h3 class="font-semibold mb-4">Retos por Módulo</h3><div class="h-48 grid place-content-center text-gray-400">📊</div></div>
        <div class="bg-white border rounded-xl p-5 shadow-sm"><h3 class="font-semibold mb-4">Actividad Semanal</h3><div class="h-48 grid place-content-center text-gray-400">📈</div></div>
      </div>
    </section>
  `;
}

/* ==========
   Helpers
   ========== */
function collectRolesFromStore(u) {
  const items = []
    .concat(u.role ? [u.role] : [])
    .concat(Array.isArray(u.roles) ? u.roles : []);
  return items.map(normalizeRoleName).filter(Boolean);
}
function collectSkillsFromStore(u) {
  const arr = Array.isArray(u.skills) ? u.skills : [];
  return arr.map(s => ({
    name: typeof s === "string" ? s : (s.name || s.skill_name || "Skill"),
    level: Number(s.level ?? s.user_level ?? 0) || 1,
  }));
}
function roleBadge(name) {
  return `<span class="text-xs px-2 py-0.5 rounded bg-purple-100 text-purple-700 border border-purple-200">${name}</span>`;
}
function normalizeRoleName(raw) {
  const t = (typeof raw === "string" ? raw : (raw?.role_name || raw?.name || raw?.role || "")).toString().toLowerCase();
  if (!t) return null;
  if (["tl","team_leader","team-leader","leader"].includes(t)) return "Team Leader";
  if (["admin","administrator"].includes(t)) return "Admin";
  if (["coder","student","estudiante"].includes(t)) return "Coder";
  return t.charAt(0).toUpperCase() + t.slice(1);
}
function row(label,value){ 
  return `<div class="flex items-center justify-between border rounded-lg px-3 py-2">
    <span class="text-gray-600">${label}</span><span class="font-semibold">${value}</span>
  </div>`;
}
function input(label, value="", name="field", type="text"){ 
  return `<div>
    <label class="text-sm text-gray-600">${label}</label>
    <input name="${name}" type="${type}" value="${value}"
           class="w-full mt-1 rounded-lg border border-gray-200 p-2 focus:ring-2 focus:ring-purple-500"/>
  </div>`;
}
function skillRow(name, level) {
  return `<div class="mb-3 cursor-pointer select-none" data-skill="${name}" data-level="${level}">
    <div class="flex justify-between text-sm mb-1"><span>${name}</span><span>${level}/5</span></div>
    <div class="h-2 bg-gray-100 rounded-full overflow-hidden">
      <div class="h-full bg-purple-500" style="width:${(Math.max(1, Math.min(5, level)) / 5) * 100}%"></div>
    </div>
  </div>`;
}
function initials(name) { return name.split(/\s+/).map(n => n[0]).join("").slice(0, 2).toUpperCase(); }
function statCard(title,value,sub){
  return `<div class="bg-white border rounded-xl p-5 shadow-sm">
    <p class="text-sm text-gray-500">${title}</p>
    <p class="text-2xl font-bold mt-2">${value}</p>
    <p class="text-xs text-green-600 mt-1">${sub}</p>
  </div>`;
}
