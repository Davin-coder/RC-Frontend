/* ========== Datos de ejemplo ========== */
const exampleRetos = [
  { title: "Python Calculator", challenge_desc: "Create a calculator with Python", difficulty: "beginner", startDate: "2025-09-01" },
  { title: "Web Portfolio", challenge_desc: "Build a personal portfolio website", difficulty: "intermediate", startDate: "2025-08-29" },
  { title: "JS Game", challenge_desc: "Create a small game using JavaScript", difficulty: "intermediate", startDate: "2025-09-05" },
  { title: "API Integration", challenge_desc: "Consume a REST API and display data", difficulty: "advanced", startDate: "2025-08-31" },
  { title: "CSS Animations", challenge_desc: "Animate a webpage using CSS", difficulty: "beginner", startDate: "2025-09-02" },
  { title: "Data Visualization", challenge_desc: "Visualize data using charts in JS", difficulty: "advanced", startDate: "2025-09-03" },
];

/* ========== Funciones auxiliares ========== */
function isAvailable(startDate) {
  const now = new Date();
  const start = new Date(startDate);
  const diffTime = start - now;
  const diffDays = diffTime / (1000 * 60 * 60 * 24);
  return diffDays <= 2; // disponible si faltan 2 días o menos
}

function cardReto({ title, desc, badges, meta, stack, xp, cta, startDate, isTL = false }) {
  const available = isAvailable(startDate);
  return `
    <article class="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition">
      <div class="flex items-start justify-between">
        <h3 class="text-lg font-semibold">${title}</h3>
      </div>
      <p class="text-gray-600 mt-1">${desc ?? ""}</p>
      <div class="flex gap-2 mt-2">
        ${badges.map(b => `<span class="px-2 py-1 rounded bg-gray-200 text-gray-700 text-xs">${b}</span>`).join("")}
      </div>
      <div class="flex items-center gap-4 text-sm text-gray-500 mt-3">
        <span>${meta}</span>
      </div>
      <div class="flex flex-wrap gap-2 mt-3">
        ${stack.map(s => `<span class="px-2 py-1 rounded bg-gray-100 text-gray-500 text-xs">${s}</span>`).join("")}
      </div>
      <div class="flex items-center justify-between mt-4">
        <span class="text-purple-700 font-semibold">${xp}</span>
        ${
          isTL
            ? `<button id="btn-crear-reto" class="px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700">Crear reto</button>`
            : `<button class="px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700" ${available ? "" : "disabled"}>
                ${available ? cta : "Próximamente"}
               </button>`
        }
      </div>
    </article>
  `;
}

/* ========== Función renderizada común ========== */
function renderRetos(grid, items, isTL = false) {
  if (!items?.length) {
    grid.innerHTML = `<p class="text-gray-500">No hay retos disponibles.</p>`;
    return;
  }

  grid.innerHTML = items.map(r => cardReto({
    title: r.title,
    desc: r.challenge_desc,
    badges: [r.difficulty ?? "—"],
    meta: "— · —",
    stack: ["JS"],
    xp: "— XP",
    cta: "Comenzar",
    startDate: r.startDate,
    isTL
  })).join("");

  // Evento para TL: abrir formulario al hacer clic en "Crear reto"
  if (isTL) {
    const btnCrear = document.getElementById("btn-crear-reto");
    if (btnCrear) {
      btnCrear.addEventListener("click", () => {
        alert("Aquí se desplegaría el formulario de creación de reto"); 
        // Aquí podrías llamar a una función que renderice tu formulario
      });
    }
  }
}

/* ========== Controlador Estudiante ========== */
export async function Student_RetosController() {
  const grid = document.getElementById("retos-grid");
  const search = document.getElementById("search-retos");
  if (!grid) return;

  const retos = [...exampleRetos];

  const render = (items) => renderRetos(grid, items, false);
  render(retos);

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

  let t;
  search?.addEventListener("input", () => {
    clearTimeout(t);
    t = setTimeout(doFilter, 180);
  });
}

export async function TL_RetosController() {
  const grid = document.getElementById("retos-grid");
  const search = document.getElementById("search-retos");
  const formContainer = document.getElementById("form-container");
  const btnCrear = document.getElementById("btn-crear-reto");

  if (!grid) return;

  const retos = [...exampleRetos];

  const render = (items) => {
    if (!items?.length) {
      grid.innerHTML = `<p class="text-gray-500">No hay retos disponibles.</p>`;
      return;
    }

    // Renderizar solo las tarjetas, sin botón en cada tarjeta
    grid.innerHTML = items.map(r => `
      <article class="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition">
        <div class="flex items-start justify-between">
          <h3 class="text-lg font-semibold">${r.title}</h3>
        </div>
        <p class="text-gray-600 mt-1">${r.challenge_desc ?? ""}</p>
        <div class="flex gap-2 mt-2">
          <span class="px-2 py-1 rounded bg-gray-200 text-gray-700 text-xs">${r.difficulty ?? "—"}</span>
        </div>
        <div class="flex items-center gap-4 text-sm text-gray-500 mt-3">
          <span>— · —</span>
        </div>
        <div class="flex flex-wrap gap-2 mt-3">
          <span class="px-2 py-1 rounded bg-gray-100 text-gray-500 text-xs">JS</span>
        </div>
        <div class="flex items-center justify-between mt-4">
          <span class="text-purple-700 font-semibold">— XP</span>
        </div>
      </article>
    `).join("");
  };

  render(retos);

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

  let t;
  search?.addEventListener("input", () => {
    clearTimeout(t);
    t = setTimeout(doFilter, 180);
  });

  // Evento para mostrar formulario al pulsar botón Crear reto
  btnCrear?.addEventListener("click", () => {
    formContainer.innerHTML = `
      <form class="bg-white border p-5 rounded-xl shadow-md space-y-4">
        <h2 class="text-lg font-semibold">Crear nuevo reto</h2>
        <input type="text" placeholder="Título del reto" class="w-full border px-3 py-2 rounded"/>
        <textarea placeholder="Descripción" class="w-full border px-3 py-2 rounded"></textarea>
        <input type="text" placeholder="Dificultad (beginner/intermediate/advanced)" class="w-full border px-3 py-2 rounded"/>
        <input type="date" class="w-full border px-3 py-2 rounded"/>
        <button type="submit" class="px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700">Guardar</button>
      </form>
    `;
  });
}
