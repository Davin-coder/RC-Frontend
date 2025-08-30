// src/controllers/clanController.js
import { userStore } from "../utils/userStore.js";
import { GroupsAPI } from "../utils/api.js";
import { isTL } from "../utils/role.js";

export async function initClanController() {
  const root = document.getElementById("clan-root");
  const actions = document.getElementById("clan-actions");
  if (!root) return;

  const user = userStore.get();
  const canManage = isTL(); 
  let groups = [];
  let myGroup = null;

  // --- Cargar grupos ---
  try {
    groups = await GroupsAPI.list();
  } catch (e) {
    console.error(e);
    root.innerHTML = `<p class="text-red-600">Error al cargar los grupos</p>`;
    return;
  }

  // Resolver grupo asignado
  const gid = user?.group_id ?? user?.groupId ?? null;
  if (gid) {
    myGroup = groups.find(g => String(g.id_group || g.id || g.group_id) === String(gid)) || null;
  }

  // --- TL/Admin sin grupo: mostrar tabla de todos ---
  if (canManage && !myGroup) {
    actions.innerHTML = `<button id="btn-create" class="px-3 py-2 rounded-lg bg-purple-600 text-white">+ Crear clan</button>`;
    root.innerHTML = renderAllGroupsTable(groups);
    document.getElementById("btn-create")?.addEventListener("click", () => openCreateModal());
    attachTableEvents(root, groups);
    return;
  }

  // --- Usuario sin grupo ---
  if (!myGroup) {
    actions.innerHTML = "";
    root.innerHTML = `
      <div class="bg-white border rounded-xl p-6 text-center">
        <h3 class="text-lg font-semibold">Aún no perteneces a un clan</h3>
        <p class="text-gray-500 mt-1">Crea un clan e invita a tus compañeros.</p>
        <button id="btn-create" class="mt-4 px-4 py-2 rounded-lg bg-purple-600 text-white">Crear mi clan</button>
      </div>
    `;
    document.getElementById("btn-create")?.addEventListener("click", () => openCreateModal());
    return;
  }

  // --- Usuario con grupo asignado ---
  actions.innerHTML = `
    <button id="btn-edit" class="px-3 py-2 rounded-lg border">Editar</button>
    <button id="btn-invite" class="px-3 py-2 rounded-lg border">Invitar</button>
    <button id="btn-delete" class="px-3 py-2 rounded-lg bg-red-100 text-red-700">Eliminar</button>
  `;
  root.innerHTML = renderMyGroup(myGroup);

  document.getElementById("btn-edit")?.addEventListener("click", () => openEditModal(myGroup));
  document.getElementById("btn-invite")?.addEventListener("click", () => openInviteModal(myGroup));
  document.getElementById("btn-delete")?.addEventListener("click", () => openDeleteModal(myGroup));

  /* ======================
      Helpers internos
  ====================== */
  function renderAllGroupsTable(list) { /* ... mismo código que tenías ... */ }
  function attachTableEvents(container, list) { /* ... mismo código ... */ }
  function renderMyGroup(g) { /* ... mismo código ... */ }
  function memberRow(m, g) { /* ... mismo código ... */ }

  // --- Modales ---
  function openCreateModal() { /* ... mismo código ... */ }
  function openEditModal(g) { /* ... mismo código ... */ }
  function openInviteModal(g) { /* ... mismo código ... */ }
  function openDeleteModal(g) { /* ... mismo código ... */ }

  // --- UI Modal ---
  function showModal({ title, body, onSubmit }) { /* ... mismo código ... */ }
  function closeModal() { /* ... mismo código ... */ }
}

/* =========
   Helpers
   ========= */
function initials(name) { /* ... mismo código ... */ }
function escapeHtml(s="") { /* ... mismo código ... */ }
