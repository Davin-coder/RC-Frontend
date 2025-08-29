import { ChallengesAPI } from "../utils/api.js";     // <- usa tu wrapper fetch
import { userStore } from "../utils/userStore.js";

/* =========
   Vista principal
   ========= */
export default function Retos() {
  const role = userStore.role();
  return (role === "team_leader" || role === "admin")
    ? TL_RetosView()
    : Student_RetosView();
}

/* =========
   Estudiante: Mis Retos (desde backend)
   ========= */
function Student_RetosView() {
  return `
    <section class="space-y-6">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl md:text-3xl font-bold">Mis Retos</h1>
          <p class="text-gray-500">Explora y completa desafíos para mejorar tus habilidades</p>
        </div>
      </div>

      <!-- Buscador -->
      <div class="grid gap-4 md:grid-cols-2">
        <div class="relative">
          <input id="search-retos"
                 class="w-full rounded-lg border border-gray-200 pl-10 pr-4 py-2 focus:ring-2 focus:ring-purple-500"
                 placeholder="Buscar retos..."/>
          <span class="absolute left-3 top-2.5 text-gray-400">🔎</span>
        </div>
      </div>

      <!-- Grid de retos -->
      <div id="retos-grid" class="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <p class="text-gray-500">Cargando retos...</p>
      </div>
    </section>
  `;
}

export async function initRetosEvents() {
  const grid = document.getElementById("retos-grid");
  const search = document.getElementById("search-retos");
  if (!grid) return;

  let retos = [];
  try {
    retos = await ChallengesAPI.list();   // <- ahora sí
  } catch (err) {
    console.error("Error cargando retos", err);
  }

  const render = (items) => {
    if (!items?.length) {
      grid.innerHTML = `<p class="text-gray-500">No hay retos disponibles.</p>`;
      return;
    }
    grid.innerHTML = items.map(r => cardReto({
      title: r.title,
      desc: r.challenge_desc,
      badges: [r.difficulty ?? "—"],
      meta: "— · —",
      stack: ["JS"],     // placeholder hasta que el backend lo soporte
      xp: "— XP",
      rating: "—",
      cta: "Comenzar"
    })).join("");
  };

  render(retos);

  // filtro simple por título/descripcion/dificultad
  const doFilter = () => {
    const q = (search?.value || "").toLowerCase().trim();
    if (!q) return render(retos);
    const filtered = retos.filter(r =>
      (r.title || "").toLowerCase().includes(q) ||
      (r.challenge_desc || "").toLowerCase().includes(q) ||
      (r.difficulty || "").toLowerCase().includes(q)
    );
    render(filtered);
  };

  // debounce suave
  let t;
  search?.addEventListener("input", () => {
    clearTimeout(t);
    t = setTimeout(doFilter, 180);
  });
}

/* =========
   Team Leader: Gestión de Retos (desde backend)
   ========= */
function TL_RetosView() {
  return `
    <section class="space-y-6">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl md:text-3xl font-bold">Gestión de Retos</h1>
          <p class="text-gray-500">Crea, edita y administra los retos del bootcamp</p>
        </div>
        <button class="px-3 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700">+ Crear Reto</button>
      </div>

      <div class="rounded-xl border overflow-hidden bg-white">
        <table class="w-full text-sm">
          <thead class="bg-gray-50 text-gray-600">
            <tr>
              <th class="text-left px-4 py-2">Título</th>
              <th class="text-left px-4 py-2">Descripción</th>
              <th class="text-left px-4 py-2">Dificultad</th>
            </tr>
          </thead>
          <tbody id="retos-tbody">
            <tr><td class="px-4 py-2" colspan="3">Cargando retos...</td></tr>
          </tbody>
        </table>
      </div>
    </section>
  `;
}

export async function initTLRetosEvents() {
  const tbody = document.getElementById("retos-tbody");
  if (!tbody) return;

  try {
    const retos = await ChallengesAPI.list();
    if (!retos.length) {
      tbody.innerHTML = `<tr><td class="px-4 py-2" colspan="3">No hay retos disponibles</td></tr>`;
      return;
    }
    tbody.innerHTML = retos.map(r => `
      <tr class="border-t">
        <td class="px-4 py-2">${r.title}</td>
        <td class="px-4 py-2">${r.challenge_desc ?? ""}</td>
        <td class="px-4 py-2">${r.difficulty ?? ""}</td>
      </tr>
    `).join("");
  } catch (err) {
    console.error("Error cargando retos", err);
    tbody.innerHTML = `<tr><td class="px-4 py-2 text-red-600" colspan="3">Error al cargar</td></tr>`;
  }
}

/* =========
   Helpers
   ========= */
function badge(text){
  return `<span class="text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-700">${text}</span>`;
}
function tag(text){
  return `<span class="text-xs px-2 py-1 rounded bg-orange-100 text-orange-700">${text}</span>`;
}
function cardReto({title,desc,badges,meta,stack,xp,rating,cta}){
  return `
    <article class="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition">
      <div class="flex items-start justify-between">
        <h3 class="text-lg font-semibold">${title}</h3>
      </div>
      <p class="text-gray-600 mt-1">${desc ?? ""}</p>
      <div class="flex gap-2 mt-2">
        ${badges.map(badge).join("")}
      </div>
      <div class="flex items-center gap-4 text-sm text-gray-500 mt-3">
        <span>${meta}</span>
      </div>
      <div class="flex flex-wrap gap-2 mt-3">
        ${stack.map(tag).join("")}
      </div>
      <div class="flex items-center justify-between mt-4">
        <span class="text-purple-700 font-semibold">${xp}</span>
        <button class="px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700">${cta}</button>
      </div>
    </article>
  `;
}
