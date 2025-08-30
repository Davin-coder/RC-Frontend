import { ChallengesAPI } from "../utils/api.js";

/* =========
   Estudiante: Controller
   ========= */
export async function Student_RetosController() {
  const grid = document.getElementById("retos-grid");
  const search = document.getElementById("search-retos");
  if (!grid) return;

  let retos = [];
  try {
    retos = await ChallengesAPI.list();
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
      stack: ["JS"], // placeholder
      xp: "— XP",
      rating: "—",
      cta: "Comenzar"
    })).join("");
  };

  render(retos);

  // filtro
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

  // debounce
  let t;
  search?.addEventListener("input", () => {
    clearTimeout(t);
    t = setTimeout(doFilter, 180);
  });
}

/* =========
   Team Leader: Controller
   ========= */
export async function TL_RetosController() {
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
   Helpers UI
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
