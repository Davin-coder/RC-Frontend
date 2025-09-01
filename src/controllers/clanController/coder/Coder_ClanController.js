// src/controllers/groupController/coder/Coder_GroupsController.js
import { GroupsAPI } from "../../../utils/api.js";
import { userStore } from "../../../utils/userStore.js";

export async function Coder_ClanController() {
  console.log("Hello from CODER CONTROLLER");

  const myCard = document.getElementById("my-group-card");
  const listEl = document.getElementById("groups-list");
  const pagerEl = document.getElementById("groups-pagination");
  const searchEl = document.getElementById("groups-search");
  const exploreWrap = document.getElementById("explore-wrap");

  // userStore.get() suele no recibir args; mantenemos compatibilidad por si tuvieras una variante
  const currentUser =
    (userStore?.get?.("user") ?? userStore?.get?.() ?? null) || null;
  const role = String(currentUser?.role || "").toLowerCase();

  // visible solo para 'coder'
  if (role !== "coder") {
    if (myCard) {
      myCard.innerHTML = `<div class="text-sm text-gray-500">Sección solo para el rol <span class="font-medium">coder</span>.</div>`;
    }
    exploreWrap?.classList.add("hidden");
    return;
  }

  const state = {
    all: [],
    mine: null,
    others: [],
    search: "",
    page: 1,
    pageSize: 12,
    creating: false,
  };

  /* ================== Eventos ================== */
  searchEl?.addEventListener(
    "input",
    debounce((e) => {
      state.search = e.target.value.trim();
      state.page = 1;
      renderList();
    }, 250)
  );

  pagerEl?.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-page]");
    if (!btn) return;
    const p = Number(btn.dataset.page);
    if (!Number.isFinite(p) || p < 1) return;
    state.page = p;
    renderList();
  });

  myCard?.addEventListener("click", (e) => {
    const open = e.target.closest("#btn-open-create");
    const cancel = e.target.closest("#btn-cancel-create");
    if (open) {
      state.creating = true;
      renderMyCard();
    }
    if (cancel) {
      state.creating = false;
      renderMyCard();
    }
  });

  myCard?.addEventListener("submit", onCreateSubmit);

  /* ================== Carga inicial ================== */
  await loadGroups();

  /* ================== Funciones ================== */
  async function loadGroups() {
    // si no hay nodos, simplemente no hacemos nada
    if (!myCard || !listEl || !pagerEl) return;

    myCard.innerHTML = `<div class="text-gray-500 text-sm">Cargando tu clan…</div>`;
    renderListSkeleton(listEl);

    try {
      const res = (await GroupsAPI?.list?.()) ?? null;

      // Soporta múltiples shapes
      const rawArr =
        (Array.isArray(res) && res) ||
        res?.groups ||
        res?.data ||
        res?.rows ||
        res?.items ||
        [];

      // Normaliza formato
      state.all = rawArr.map(normalizeGroup);

      // Detecta si el usuario ya pertenece a un grupo (group_id)
      const myGroupId = toInt(currentUser?.group_id);
      state.mine =
        myGroupId != null
          ? state.all.find((g) => eqId(g.id_group, myGroupId)) ?? null
          : null;

      const myId = state.mine?.id_group ?? null;
      state.others = myId
        ? state.all.filter((g) => !eqId(g.id_group, myId))
        : state.all.slice();

      renderMyCard();
      renderList();
    } catch (err) {
      console.error("Error cargando clanes:", err);
      myCard.innerHTML = `<div class="text-red-600 text-sm">No se pudo cargar tu clan.</div>`;
      listEl.innerHTML = `<div class="col-span-full text-sm text-red-600">No se pudieron cargar los clanes.</div>`;
      pagerEl.innerHTML = "";
    }
  }

  function renderMyCard() {
    if (!myCard) return;
    if (state.mine) {
      myCard.innerHTML = myClanCard(state.mine);
      exploreWrap?.classList.add("hidden");
    } else {
      exploreWrap?.classList.remove("hidden");
      myCard.innerHTML = emptyMyClanWithCreate();
    }
  }

  function renderList() {
    if (!listEl || !pagerEl) return;

    const q = state.search.toLowerCase();
    let filtered = state.others;

    if (q) {
      filtered = filtered.filter((g) => {
        const name = String(g.name || "").toLowerCase();
        const desc = String(g.description || "").toLowerCase();
        return name.includes(q) || desc.includes(q);
      });
    }

    const total = filtered.length;
    const pages = Math.max(1, Math.ceil(total / state.pageSize));
    state.page = clamp(state.page, 1, pages);

    const start = (state.page - 1) * state.pageSize;
    const items = filtered.slice(start, start + state.pageSize);

    listEl.innerHTML = items.length
      ? items.map(clanCard).join("")
      : `<div class="col-span-full text-sm text-gray-500">No hay clanes para mostrar.</div>`;

    pagerEl.innerHTML = renderPagination({ page: state.page, pages });
  }

  async function onCreateSubmit(e) {
    const form = e.target.closest("#form-create-clan");
    if (!form) return;
    e.preventDefault();

    const name =
      form.querySelector("input[name=name]")?.value?.trim() || "";
    const description =
      form.querySelector("textarea[name=description]")?.value?.trim() || "";
    const errorEl = form.querySelector("#create-error");
    const okEl = form.querySelector("#create-ok");
    const submitBtn = form.querySelector("button[type=submit]");

    if (errorEl) errorEl.textContent = "";
    if (okEl) okEl.textContent = "";

    if (name.length < 3) {
      if (errorEl)
        errorEl.textContent = "El nombre debe tener al menos 3 caracteres.";
      return;
    }

    submitBtn?.setAttribute("disabled", "true");
    submitBtn?.classList.add("opacity-60", "cursor-not-allowed");

    try {
      const created = await createGroupSafe({ name, description });
      if (!created || !(created.id_group ?? created.id))
        throw new Error("No se pudo crear el clan.");

      if (okEl) okEl.textContent = "¡Clan creado con éxito!";
      const gid = created.id_group ?? created.id;

      // actualiza userStore para que se refleje como "mi clan"
      const u = (userStore?.get?.("user") ?? userStore?.get?.()) || null;
      if (u && userStore?.set) userStore.set({ ...u, group_id: gid });

      await loadGroups();
    } catch (err) {
      console.error("Crear clan error:", err);
      if (errorEl)
        errorEl.textContent = err?.message || "Error al crear el clan.";
    } finally {
      submitBtn?.removeAttribute("disabled");
      submitBtn?.classList.remove("opacity-60", "cursor-not-allowed");
    }
  }
}

/* ================== Normalizador clave ================== */
function normalizeGroup(g) {
  // Retorna una forma estable para la UI:
  // { id_group, name, description, members_count, challenges_count, members?[] }
  const id_group = g.id_group ?? g.id ?? null;

  const name = g.name ?? g.group_name ?? g.title ?? "Sin nombre";
  const description =
    g.description ?? g.group_desc ?? g.desc ?? "";

  const members_count =
    toInt(g.members_count) ??
    toInt(g.member_count) ??
    (Array.isArray(g.members) ? g.members.length : null) ??
    0;

  const challenges_count =
    toInt(g.challenges_count) ?? toInt(g.challenge_count) ?? 0;

  return {
    id_group,
    name,
    description,
    members_count,
    challenges_count,
    members: Array.isArray(g.members) ? g.members : undefined,
    _raw: g,
  };
}

/* ================== UI helpers ================== */
function myClanCard(g) {
  const name = escapeHtml(g.name);
  const desc = escapeHtml(g.description || "Sin descripción");
  const membersCount = toInt(g.members_count) ?? 0;
  const challengesCount = toInt(g.challenges_count) ?? 0;

  const membersList =
    Array.isArray(g.members) && g.members.length
      ? g.members
          .slice(0, 6)
          .map(
            (m) =>
              `<li>• ${escapeHtml(
                m.name || m.email || "Miembro"
              )}</li>`
          )
          .join("")
      : `<li class="text-gray-500">Miembros no disponibles</li>`;

  return `
    <article class="rounded-xl border p-4 bg-white shadow-sm" data-group-id="${g.id_group}">
      <div class="flex items-start justify-between gap-3">
        <div>
          <h3 class="text-lg font-semibold">${name}</h3>
          <p class="text-sm text-gray-600 mt-1">${desc}</p>
          <div class="flex flex-wrap gap-3 mt-3 text-sm text-gray-700">
            <span><strong>${challengesCount}</strong> retos</span>
            <span><strong>${membersCount}</strong> miembros</span>
          </div>
        </div>
      </div>
      <div class="mt-4">
        <h4 class="text-sm font-medium mb-2">Miembros</h4>
        <ul class="grid sm:grid-cols-2 gap-1 text-sm text-gray-700">
          ${membersList}
        </ul>
      </div>
    </article>
  `;
}

function emptyMyClanWithCreate() {
  return `
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      <p class="text-sm text-gray-600">Aún no perteneces a un clan.</p>
      <div class="flex items-center gap-2">
        <a href="#/clanes" class="inline-flex items-center justify-center border rounded-lg px-3 py-2 text-sm hover:bg-gray-50">
          Explorar clanes
        </a>
        <button id="btn-open-create" class="inline-flex items-center justify-center border rounded-lg px-3 py-2 text-sm bg-black text-white hover:opacity-90">
          Crear clan
        </button>
      </div>
    </div>
  `;
}

function clanCard(g) {
  const name = escapeHtml(g.name);
  const desc = escapeHtml(g.description || "Sin descripción");
  const membersCount = toInt(g.members_count) ?? 0;

  return `
    <article class="border rounded-xl p-4 bg-white shadow-sm">
      <h3 class="text-base font-semibold">${name}</h3>
      <p class="text-sm text-gray-600 mt-1 line-clamp-2">${desc}</p>
      <div class="flex items-center justify-between mt-3 text-sm text-gray-700">
        <span>${membersCount} miembros</span>
      </div>
    </article>
  `;
}

/* ================== UI skeleton & pagination (¡FIX!) ================== */
function renderListSkeleton(target, n = 6) {
  if (!target) return;
  const item = () => `
    <article class="border rounded-xl p-4 bg-white shadow-sm animate-pulse">
      <div class="h-5 w-40 bg-gray-200 rounded mb-3"></div>
      <div class="h-3 w-full bg-gray-100 rounded mb-1"></div>
      <div class="h-3 w-2/3 bg-gray-100 rounded"></div>
      <div class="flex items-center gap-3 mt-4">
        <span class="h-4 w-16 bg-gray-100 rounded"></span>
      </div>
    </article>
  `;
  target.innerHTML = Array.from({ length: n }).map(item).join("");
}

function renderPagination({ page = 1, pages = 1, window = 5 }) {
  if (pages <= 1) return "";

  const half = Math.floor(window / 2);
  let start = Math.max(1, page - half);
  let end = Math.min(pages, start + window - 1);
  start = Math.max(1, end - window + 1);

  const btn = (p, label = p, extra = "") =>
    `<button data-page="${p}" class="px-3 py-1.5 rounded-lg border text-sm ${extra}">${label}</button>`;

  const disabled = "opacity-50 cursor-not-allowed";
  const current = "bg-black text-white border-black";

  const parts = [];
  // Prev
  parts.push(
    page > 1
      ? btn(page - 1, "Anterior")
      : `<button class="px-3 py-1.5 rounded-lg border text-sm ${disabled}">Anterior</button>`
  );

  // Primera + elipsis
  if (start > 1) {
    parts.push(btn(1, "1"));
    if (start > 2) parts.push(`<span class="px-2 text-sm text-gray-500">…</span>`);
  }

  // Ventana
  for (let p = start; p <= end; p++) {
    parts.push(btn(p, String(p), p === page ? current : ""));
  }

  // Elipsis + última
  if (end < pages) {
    if (end < pages - 1) parts.push(`<span class="px-2 text-sm text-gray-500">…</span>`);
    parts.push(btn(pages, String(pages)));
  }

  // Next
  parts.push(
    page < pages
      ? btn(page + 1, "Siguiente")
      : `<button class="px-3 py-1.5 rounded-lg border text-sm ${disabled}">Siguiente</button>`
  );

  return `<div class="flex flex-wrap items-center gap-2">${parts.join("")}</div>`;
}

/* ================== Utils ================== */
function debounce(fn, ms = 300) {
  let t;
  return (...a) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...a), ms);
  };
}
function escapeHtml(s) {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
function clamp(x, a, b) {
  return Math.max(a, Math.min(b, x));
}
function toInt(v) {
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}
function eqId(a, b) {
  if (a == null || b == null) return false;
  return String(a) === String(b);
}

/* ================== API fallback ================== */
async function createGroupSafe({ name, description }) {
  if (GroupsAPI?.create) return await GroupsAPI.create({ name, description });

  const res = await fetch(`/groups`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ name, description }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data?.msg || `HTTP ${res.status}`);
  const g = data?.group || data;
  return {
    id_group: g.id_group ?? g.id,
    name: g.name ?? g.group_name ?? name,
    description: g.description ?? "",
  };
}
