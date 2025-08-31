// src/controllers/groupController/tl/TeamLeader_ClanController.js
// Controlador para la vista TL (CRUD completo de clanes / grupos sociales)
import { GroupsAPI } from "../../../utils/api.js";
import { userStore } from "../../../utils/userStore.js";

export async function TeamLeader_ClanController() {
  console.log("Hello from TL TeamLeader_ClanController");

  // --------- Elementos de la vista ---------
  const tableBody   = document.getElementById("tl-groups-table");
  const pagerEl     = document.getElementById("tl-groups-pagination");
  const searchEl    = document.getElementById("tl-groups-search");
  const sortEl      = document.getElementById("tl-sort");

  // Drawer detalle
  const drawerEl    = document.getElementById("tl-group-detail");
  const drawerClose = document.getElementById("tl-detail-close");
  const dName       = document.getElementById("tl-detail-name");
  const dDesc       = document.getElementById("tl-detail-desc");
  const dCreated    = document.getElementById("tl-detail-created");
  const dCreator    = document.getElementById("tl-detail-creator");
  const dMembersUl  = document.getElementById("tl-members-list");
  const dMembersCt  = document.getElementById("tl-detail-members-count");

  // Modal crear/editar
  const openCreateBtn = document.getElementById("tl-btn-open-create");
  const modal         = document.getElementById("tl-group-modal");
  const modalTitle    = document.getElementById("tl-modal-title");
  const modalClose    = document.getElementById("tl-modal-close");
  const modalCancel   = document.getElementById("tl-modal-cancel");
  const modalForm     = document.getElementById("tl-form-group");
  const modalError    = document.getElementById("tl-form-error");
  const modalOk       = document.getElementById("tl-form-ok");
  const modalSubmit   = document.getElementById("tl-modal-submit");

  // Modal eliminar
  const delModal      = document.getElementById("tl-delete-modal");
  const delCancel     = document.getElementById("tl-delete-cancel");
  const delConfirm    = document.getElementById("tl-delete-confirm");

  // --------- Permisos básicos (opcional) ---------
  const role = String(userStore.get?.()?.role ?? "").toLowerCase();
  // Si quieres restringir: if (role !== "team_leader") { ...return; }

  // --------- Estado ---------
  const state = {
    all: [],
    search: "",
    sort: "created_at:desc",
    page: 1,
    pageSize: 10,
    selected: null,     // grupo seleccionado para detalle
    deletingId: null,   // id en proceso de borrado
    editing: null,      // objeto en edición (o null para crear)
  };

  // --------- Eventos UI ---------
  searchEl?.addEventListener("input", debounce((e) => {
    state.search = e.target.value.trim();
    state.page = 1;
    renderTable();
  }, 250));

  sortEl?.addEventListener("change", (e) => {
    state.sort = e.target.value || "created_at:desc";
    state.page = 1;
    renderTable();
  });

  pagerEl?.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-page]");
    if (!btn) return;
    const p = Number(btn.dataset.page);
    if (!Number.isFinite(p) || p < 1) return;
    state.page = p;
    renderTable();
  });

  // Acciones por fila (delegación)
  tableBody?.addEventListener("click", async (e) => {
    const tr = e.target.closest("tr[data-id]");
    if (!tr) return;
    const id = tr.dataset.id;

    if (e.target.closest("[data-action='view']")) {
      await openDrawer(id);
    }
    if (e.target.closest("[data-action='edit']")) {
      const g = state.all.find(x => eqId(x.id_group, id));
      openModalEdit(g);
    }
    if (e.target.closest("[data-action='delete']")) {
      state.deletingId = id;
      show(delModal);
    }
  });

  // Drawer
  drawerClose?.addEventListener("click", () => hide(drawerEl));

  // Modal crear/editar
  openCreateBtn?.addEventListener("click", () => openModalCreate());
  modalClose?.addEventListener("click", () => hide(modal));
  modalCancel?.addEventListener("click", () => hide(modal));
  modalForm?.addEventListener("submit", onModalSubmit);

  // Modal eliminar
  delCancel?.addEventListener("click", () => { state.deletingId = null; hide(delModal); });
  delConfirm?.addEventListener("click", onDeleteConfirm);

  // --------- Carga inicial ---------
  await loadGroups();

  // ======================================================================
  //                               Funciones
  // ======================================================================

  async function loadGroups() {
    // Esqueleto inicial
    if (tableBody) {
      tableBody.innerHTML = `
        <tr><td colspan="5" class="px-4 py-6 text-center text-gray-500">Cargando grupos…</td></tr>
      `;
    }
    try {
      const raw = await listAllGroupsSafe();
      const arr = normalizeMany(raw);
      state.all = arr;
      state.page = 1;
      renderTable();
    } catch (err) {
      console.error("TL loadGroups error:", err);
      if (tableBody) {
        tableBody.innerHTML = `
          <tr><td colspan="5" class="px-4 py-6 text-center text-red-600">No se pudieron cargar los grupos.</td></tr>
        `;
      }
    }
  }

  function renderTable() {
    if (!tableBody || !pagerEl) return;

    // Filtro
    const q = state.search.toLowerCase();
    let rows = state.all.filter(g => {
      const name = String(g.name || "").toLowerCase();
      const creator = String(g.creator_name || g.id_creator || "").toLowerCase();
      return !q || name.includes(q) || creator.includes(q);
    });

    // Orden
    rows.sort((a, b) => compareBySort(a, b, state.sort));

    // Paginación
    const total = rows.length;
    const pages = Math.max(1, Math.ceil(total / state.pageSize));
    state.page = clamp(state.page, 1, pages);
    const start = (state.page - 1) * state.pageSize;
    const pageItems = rows.slice(start, start + state.pageSize);

    // Render filas
    tableBody.innerHTML = pageItems.length
      ? pageItems.map(trRow).join("")
      : `<tr><td colspan="5" class="px-4 py-6 text-center text-gray-500">Sin resultados.</td></tr>`;

    // Render paginación
    pagerEl.innerHTML = renderPagination({ page: state.page, pages });
  }

  async function openDrawer(id) {
    const g = state.all.find(x => eqId(x.id_group, id));
    if (!g) return;

    // Detalle básico
    dName && (dName.textContent = g.name || "Sin nombre");
    dDesc && (dDesc.textContent = g.description || "Sin descripción");
    dCreated && (dCreated.textContent = formatDate(g.created_at));
    dCreator && (dCreator.textContent = g.creator_name
      ? `${g.creator_name} (id ${g.id_creator ?? "?"})`
      : (g.id_creator ? `id ${g.id_creator}` : "—"));

    // Miembros (carga on-demand)
    dMembersUl && (dMembersUl.innerHTML = `<li class="text-gray-500">Cargando miembros…</li>`);
    show(drawerEl);

    try {
      const members = await listMembersSafe(g.id_group);
      dMembersCt && (dMembersCt.textContent = String(members.length || 0));
      dMembersUl && (dMembersUl.innerHTML = members.length
        ? members.map(m => `<li>• ${escapeHtml(m.name || m.email || `User #${m.id_user}`)}</li>`).join("")
        : `<li class="text-gray-500">No hay miembros.</li>`);
    } catch (err) {
      console.error("Cargar miembros error:", err);
      dMembersUl && (dMembersUl.innerHTML = `<li class="text-red-600">No se pudieron cargar los miembros.</li>`);
    }
  }

  function openModalCreate() {
    if (!modal || !modalForm) return;
    state.editing = null;
    modalTitle && (modalTitle.textContent = "Crear grupo");
    modalForm.reset();
    // limpia mensajes
    if (modalError) modalError.textContent = "";
    if (modalOk)    modalOk.textContent = "";
    show(modal);
  }

  function openModalEdit(g) {
    if (!modal || !modalForm || !g) return;
    state.editing = g;
    modalTitle && (modalTitle.textContent = "Editar grupo");
    modalForm.elements["id_group"].value   = g.id_group ?? "";
    modalForm.elements["group_name"].value = g.name ?? "";
    modalForm.elements["description"].value = g.description ?? "";
    if (modalForm.elements["id_creator"]) {
      modalForm.elements["id_creator"].value = g.id_creator ?? "";
    }
    if (modalError) modalError.textContent = "";
    if (modalOk)    modalOk.textContent = "";
    show(modal);
  }

  async function onModalSubmit(e) {
    e.preventDefault();
    if (!modalForm) return;

    const id_group   = modalForm.elements["id_group"]?.value || "";
    const group_name = modalForm.elements["group_name"]?.value?.trim() || "";
    const description = modalForm.elements["description"]?.value?.trim() || "";
    const id_creator = modalForm.elements["id_creator"]?.value ? Number(modalForm.elements["id_creator"].value) : undefined;

    if (group_name.length < 3) {
      modalError && (modalError.textContent = "El nombre debe tener mínimo 3 caracteres.");
      return;
    }

    modalSubmit?.setAttribute("disabled", "true");
    modalSubmit?.classList.add("opacity-60", "cursor-not-allowed");
    modalError && (modalError.textContent = "");
    modalOk && (modalOk.textContent = "");

    try {
      if (id_group) {
        // actualizar
        const updated = await updateGroupSafe({ id_group, group_name, description, id_creator });
        replaceInState(updated);
        modalOk && (modalOk.textContent = "Grupo actualizado.");
      } else {
        // crear
        const created = await createGroupSafe({ group_name, description, id_creator });
        state.all.unshift(normalizeOne(created));
        modalOk && (modalOk.textContent = "Grupo creado.");
      }
      hide(modal);
      renderTable();
    } catch (err) {
      console.error("Guardar grupo error:", err);
      modalError && (modalError.textContent = err?.message || "No se pudo guardar.");
    } finally {
      modalSubmit?.removeAttribute("disabled");
      modalSubmit?.classList.remove("opacity-60", "cursor-not-allowed");
    }
  }

  async function onDeleteConfirm() {
    if (!state.deletingId) return;
    const id = state.deletingId;
    delConfirm?.setAttribute("disabled", "true");
    try {
      await deleteGroupSafe(id);
      state.all = state.all.filter(g => !eqId(g.id_group, id));
      state.deletingId = null;
      hide(delModal);
      renderTable();
    } catch (err) {
      console.error("Eliminar grupo error:", err);
      // podrías mostrar un toast si tienes uno
      hide(delModal);
    } finally {
      delConfirm?.removeAttribute("disabled");
    }
  }

  // ======================================================================
  //                         Render helpers
  // ======================================================================

  function trRow(g) {
    const created = formatDate(g.created_at);
    const creator = g.creator_name
      ? `${escapeHtml(g.creator_name)}`
      : (g.id_creator ? `id ${g.id_creator}` : "—");
    const members = toInt(g.members_count) ?? 0;

    return `
      <tr data-id="${g.id_group}" class="border-t hover:bg-gray-50">
        <td class="px-4 py-3">${escapeHtml(g.name || "Sin nombre")}</td>
        <td class="px-4 py-3">${creator}</td>
        <td class="px-4 py-3">${members}</td>
        <td class="px-4 py-3">${created}</td>
        <td class="px-4 py-3 text-right">
          <button class="text-xs border rounded-md px-2 py-1 mr-1 hover:bg-gray-100" data-action="view">Ver</button>
          <button class="text-xs border rounded-md px-2 py-1 mr-1 hover:bg-gray-100" data-action="edit">Editar</button>
          <button class="text-xs border rounded-md px-2 py-1 hover:bg-red-50 text-red-600 border-red-200" data-action="delete">Eliminar</button>
        </td>
      </tr>
    `;
  }

  function renderPagination({ page, pages }) {
    if (pages <= 1) return "";
    const btn = (p, label = p, disabled = false, current = false) =>
      `<button data-page="${p}" ${disabled ? "disabled" : ""} 
        class="px-3 py-1 text-sm border rounded-lg ${current ? "bg-gray-100" : "hover:bg-gray-50"} ${disabled ? "opacity-40 cursor-not-allowed" : ""}">
        ${label}
      </button>`;
    const prev = btn(Math.max(1, page - 1), "‹", page === 1);
    const next = btn(Math.min(pages, page + 1), "›", page === pages);

    const parts = [];
    let last = 0;
    for (let i = 1; i <= pages; i++) {
      const show = new Set([1, 2, pages - 1, pages, page - 1, page, page + 1]);
      if (!show.has(i)) continue;
      if (i - last > 1) parts.push(`<span class="px-1">…</span>`);
      parts.push(btn(i, i, false, i === page));
      last = i;
    }
    return `<div class="inline-flex items-center gap-1 my-2">${prev}${parts.join("")}${next}</div>`;
  }

  // ======================================================================
  //                         Normalización / Orden
  // ======================================================================

  function normalizeMany(res) {
    const arr =
      (Array.isArray(res) && res) ||
      res?.groups || res?.data || res?.rows || res?.items || [];
    return arr.map(normalizeOne);
  }

  function normalizeOne(g) {
    // BD: id_group, group_name, id_creator, created_at
    // opcionales: description, members_count, creator_name
    const id_group = g.id_group ?? g.id ?? null;
    const name = g.name ?? g.group_name ?? g.title ?? "Sin nombre";
    const description = g.description ?? g.group_desc ?? g.desc ?? "";
    const members_count =
      toInt(g.members_count) ??
      toInt(g.member_count) ??
      (Array.isArray(g.members) ? g.members.length : null) ?? 0;

    return {
      id_group,
      name,
      description,
      id_creator: g.id_creator ?? null,
      creator_name: g.creator_name ?? g.creator ?? null,
      created_at: g.created_at ?? g.createdAt ?? null,
      members_count,
      members: Array.isArray(g.members) ? g.members : undefined,
      _raw: g,
    };
  }

  function compareBySort(a, b, sort) {
    const [field, dirRaw] = String(sort).split(":");
    const dir = (dirRaw || "asc").toLowerCase() === "desc" ? -1 : 1;

    switch (field) {
      case "name": {
        return dir * String(a.name || "").localeCompare(String(b.name || ""), "es");
      }
      case "members_count": {
        return dir * ((toInt(a.members_count) ?? 0) - (toInt(b.members_count) ?? 0));
      }
      case "created_at":
      default: {
        const ta = a.created_at ? new Date(a.created_at).getTime() : 0;
        const tb = b.created_at ? new Date(b.created_at).getTime() : 0;
        return dir * (ta - tb);
      }
    }
  }

  // ======================================================================
  //                       API helpers (con fallbacks)
  // ======================================================================

  async function listAllGroupsSafe() {
    // Preferible: un endpoint admin que incluya creador y conteos
    if (GroupsAPI?.adminList) return await GroupsAPI.adminList();
    if (GroupsAPI?.listAll)  return await GroupsAPI.listAll();
    if (GroupsAPI?.list)     return await GroupsAPI.list();

    // Fallback genérico
    const res = await fetch(`/groups`, { credentials: "include" });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data?.msg || `HTTP ${res.status}`);
    return data?.groups ?? data?.data ?? data;
  }

  async function listMembersSafe(id_group) {
    if (!id_group) return [];
    if (GroupsAPI?.members) return await GroupsAPI.members(id_group);

    const res = await fetch(`/groups/${id_group}/members`, { credentials: "include" });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data?.msg || `HTTP ${res.status}`);
    // Normaliza miembros (id_user, name/email)
    const arr = (Array.isArray(data) ? data : (data?.members || data?.data || []));
    return arr.map(m => ({
      id_user: m.id_user ?? m.id ?? null,
      name: m.name ?? m.full_name ?? null,
      email: m.email ?? null,
      role: m.member_role ?? m.role ?? "member",
    }));
  }

  async function createGroupSafe({ group_name, description, id_creator }) {
    if (GroupsAPI?.createAdmin) return await GroupsAPI.createAdmin({ group_name, description, id_creator });
    if (GroupsAPI?.create)      return await GroupsAPI.create({ name: group_name, description, id_creator });

    const res = await fetch(`/groups`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ group_name, description, id_creator }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data?.msg || `HTTP ${res.status}`);
    return data?.group ?? data;
  }

  async function updateGroupSafe({ id_group, group_name, description, id_creator }) {
    if (GroupsAPI?.updateAdmin) return await GroupsAPI.updateAdmin({ id_group, group_name, description, id_creator });
    if (GroupsAPI?.update)      return await GroupsAPI.update({ id_group, name: group_name, description, id_creator });

    const res = await fetch(`/groups/${id_group}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ group_name, description, id_creator }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data?.msg || `HTTP ${res.status}`);
    return data?.group ?? data;
  }

  async function deleteGroupSafe(id_group) {
    if (GroupsAPI?.removeAdmin) return await GroupsAPI.removeAdmin(id_group);
    if (GroupsAPI?.remove)      return await GroupsAPI.remove(id_group);

    const res = await fetch(`/groups/${id_group}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data?.msg || `HTTP ${res.status}`);
    }
    return true;
  }

  function replaceInState(updatedRaw) {
    const upd = normalizeOne(updatedRaw);
    const idx = state.all.findIndex(x => eqId(x.id_group, upd.id_group));
    if (idx >= 0) state.all[idx] = { ...state.all[idx], ...upd };
  }
}

/* ================== Utils ================== */
function show(el) { el?.classList.remove("hidden"); }
function hide(el) { el?.classList.add("hidden"); }
function clamp(x, a, b) { return Math.max(a, Math.min(b, x)); }
function toInt(v) { const n = Number(v); return Number.isFinite(n) ? n : null; }
function eqId(a, b) { if (a == null || b == null) return false; return String(a) === String(b); }
function escapeHtml(s) { return String(s ?? "").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;"); }
function debounce(fn, ms = 300) { let t; return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); }; }
function formatDate(iso) {
  if (!iso) return "—";
  try {
    const d = new Date(iso);
    const y = d.getFullYear();
    const m = String(d.getMonth()+1).padStart(2,"0");
    const day = String(d.getDate()).padStart(2,"0");
    return `${y}-${m}-${day}`;
  } catch { return "—"; }
}
