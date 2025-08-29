// src/pages/clan.js
import { userStore } from "../utils/userStore.js";
import { GroupsAPI } from "../utils/api.js";
import { titleByRole, subtitleByRole, isTL } from "../utils/role.js";

export default function Clan() {
  const title = titleByRole("Mi Clan", "Gestión de Clanes");
  const sub   = subtitleByRole("Información y miembros de tu clan", "Visualiza y administra los clanes");

  return `
    <section class="space-y-6">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl md:text-3xl font-bold">${title}</h1>
          <p class="text-gray-500">${sub}</p>
        </div>
        <div id="clan-actions" class="flex gap-2"></div>
      </div>

      <div id="clan-root" class="space-y-6">
        <p class="text-gray-500">Cargando información del clan…</p>
      </div>

      <!-- Modales -->
      <div id="clan-modal" class="hidden fixed inset-0 z-50">
        <div class="absolute inset-0 bg-black/40"></div>
        <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                    w-[95%] max-w-lg bg-white border rounded-2xl p-5">
          <div class="flex items-center justify-between">
            <h3 id="clan-modal-title" class="text-lg font-semibold">Modal</h3>
            <button id="clan-modal-close" class="h-9 w-9 grid place-content-center rounded-lg hover:bg-gray-100">✕</button>
          </div>
          <div id="clan-modal-body" class="mt-3"></div>
          <div class="mt-5 flex justify-end gap-2">
            <button id="clan-modal-cancel" class="px-3 py-2 rounded-lg border">Cancelar</button>
            <button id="clan-modal-submit" class="px-3 py-2 rounded-lg bg-purple-600 text-white">Guardar</button>
          </div>
        </div>
      </div>
    </section>
  `;
}

/* =========
   Init (llamar desde el router al entrar a #/clan)
   ========= */
export async function initClanEvents() {
  const root = document.getElementById("clan-root");
  const actions = document.getElementById("clan-actions");
  if (!root) return;

  const user = userStore.get();
  const canManage = isTL(); // TL/Admin con permisos extra
  let groups = [];
  let myGroup = null;

  // Cargar grupos
  try {
    groups = await GroupsAPI.list();
  } catch (e) {
    console.error(e);
    root.innerHTML = `<p class="text-red-600">Error al cargar los grupos</p>`;
    return;
  }

  // Resolver el grupo del usuario por id si viene
  const gid = user?.group_id ?? user?.groupId ?? null;
  if (gid) {
    myGroup = groups.find(g => String(g.id_group || g.id || g.group_id) === String(gid)) || null;
  }

  // Si TL/Admin y no tiene grupo asignado, puede ver todos (tabla)
  if (canManage && !myGroup) {
    actions.innerHTML = `<button id="btn-create" class="px-3 py-2 rounded-lg bg-purple-600 text-white">+ Crear clan</button>`;
    root.innerHTML = renderAllGroupsTable(groups);
    document.getElementById("btn-create")?.addEventListener("click", () => openCreateModal());
    attachTableEvents(root, groups);
    return;
  }

  // Si NO tiene grupo -> mostrar CTA a crear
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

  // Tiene grupo -> mostrar detalle + acciones
  actions.innerHTML = `
    <button id="btn-edit" class="px-3 py-2 rounded-lg border">Editar</button>
    <button id="btn-invite" class="px-3 py-2 rounded-lg border">Invitar</button>
    <button id="btn-delete" class="px-3 py-2 rounded-lg bg-red-100 text-red-700">Eliminar</button>
  `;
  root.innerHTML = renderMyGroup(myGroup);

  // Listeners
  document.getElementById("btn-edit")?.addEventListener("click", () => openEditModal(myGroup));
  document.getElementById("btn-invite")?.addEventListener("click", () => openInviteModal(myGroup));
  document.getElementById("btn-delete")?.addEventListener("click", () => openDeleteModal(myGroup));

  // -------------- helpers internos --------------
  function renderAllGroupsTable(list) {
    if (!list?.length) return `<p class="text-gray-500">No hay clanes creados.</p>`;
    return `
      <div class="rounded-xl border overflow-hidden bg-white">
        <table class="w-full text-sm">
          <thead class="bg-gray-50 text-gray-600">
            <tr>
              <th class="text-left px-4 py-2">ID</th>
              <th class="text-left px-4 py-2">Clan</th>
              <th class="text-left px-4 py-2">Miembros</th>
              <th class="text-left px-4 py-2">Creador</th>
              <th class="px-4 py-2"></th>
            </tr>
          </thead>
          <tbody>
            ${list.map(c => `
              <tr class="border-t">
                <td class="px-4 py-2">${c.id_group ?? c.id ?? "-"}</td>
                <td class="px-4 py-2">${c.group_name ?? c.name ?? "—"}</td>
                <td class="px-4 py-2">${c.members_count ?? c.members?.length ?? "—"}</td>
                <td class="px-4 py-2">${c.creator ?? c.leader ?? "—"}</td>
                <td class="px-4 py-2">
                  <div class="flex gap-2">
                    <button class="btn-view px-2 py-1 text-xs rounded border" data-id="${c.id_group ?? c.id}">Ver</button>
                    <button class="btn-edit px-2 py-1 text-xs rounded border" data-id="${c.id_group ?? c.id}">Editar</button>
                    <button class="btn-del  px-2 py-1 text-xs rounded bg-red-100 text-red-700" data-id="${c.id_group ?? c.id}">Eliminar</button>
                  </div>
                </td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    `;
  }

  function attachTableEvents(container, list) {
    container.querySelectorAll(".btn-view").forEach(b => b.addEventListener("click", () => {
      const id = b.dataset.id;
      const g = list.find(x => String(x.id_group ?? x.id) === String(id));
      if (g) {
        actions.innerHTML = `
          <button id="btn-edit" class="px-3 py-2 rounded-lg border">Editar</button>
          <button id="btn-invite" class="px-3 py-2 rounded-lg border">Invitar</button>
          <button id="btn-delete" class="px-3 py-2 rounded-lg bg-red-100 text-red-700">Eliminar</button>
        `;
        root.innerHTML = renderMyGroup(g);
        document.getElementById("btn-edit")?.addEventListener("click", () => openEditModal(g));
        document.getElementById("btn-invite")?.addEventListener("click", () => openInviteModal(g));
        document.getElementById("btn-delete")?.addEventListener("click", () => openDeleteModal(g));
      }
    }));
    container.querySelectorAll(".btn-edit").forEach(b => b.addEventListener("click", () => {
      const id = b.dataset.id;
      const g = list.find(x => String(x.id_group ?? x.id) === String(id));
      if (g) openEditModal(g);
    }));
    container.querySelectorAll(".btn-del").forEach(b => b.addEventListener("click", () => {
      const id = b.dataset.id;
      const g = list.find(x => String(x.id_group ?? x.id) === String(id));
      if (g) openDeleteModal(g);
    }));
  }

  function renderMyGroup(g) {
    const name = g.group_name ?? g.name ?? "—";
    const desc = g.group_desc ?? g.description ?? "Sin descripción";
    const leader = g.leader ?? g.creator ?? "—";
    const members = g.members || []; // si backend no los trae, muestra vacío

    return `
      <div class="grid gap-6 lg:grid-cols-3">
        <div class="bg-white border rounded-xl p-5 shadow-sm">
          <h3 class="font-semibold">${name}</h3>
          <p class="text-sm text-gray-500 mt-1">Líder: ${leader}</p>
          <p class="text-gray-600 mt-3">${desc}</p>
        </div>

        <div class="bg-white border rounded-xl p-5 shadow-sm lg:col-span-2">
          <h3 class="font-semibold mb-4">Miembros</h3>
          <div class="space-y-3">
            ${members.length ? members.map(m => memberRow(m, g)).join("") : `<p class="text-gray-500">Aún no hay miembros.</p>`}
          </div>
        </div>
      </div>
    `;
  }

  function memberRow(m, g) {
    const name = m.name ?? m.first_name ?? m.email ?? "Usuario";
    const role = m.role ?? "Miembro";
    const uid  = m.id_user ?? m.id ?? "";
    return `
      <div class="flex items-center justify-between border rounded-lg p-3">
        <div class="flex items-center gap-3">
          <span class="h-8 w-8 rounded-full bg-gray-100 grid place-content-center font-semibold">${initials(name)}</span>
          <div>
            <p class="font-medium">${name}</p>
            <p class="text-xs text-gray-500">${role}</p>
          </div>
        </div>
        ${canManage ? `<button class="btn-kick px-3 py-1 rounded-lg border text-sm" data-id="${uid}" data-gid="${g.id_group ?? g.id}">Quitar</button>` : ""}
      </div>
    `;
  }

  // ---------- Modales ----------
  function openCreateModal() {
    showModal({
      title: "Crear clan",
      body: `
        <div class="space-y-3">
          <div>
            <label class="text-sm text-gray-600">Nombre</label>
            <input id="f-name" class="w-full border rounded-lg px-3 py-2" required />
          </div>
          <div>
            <label class="text-sm text-gray-600">Descripción</label>
            <textarea id="f-desc" class="w-full border rounded-lg px-3 py-2" rows="3"></textarea>
          </div>
        </div>
      `,
      onSubmit: async () => {
        const name = document.getElementById("f-name").value.trim();
        const description = document.getElementById("f-desc").value.trim();
        if (!name) return;
        try {
          await GroupsAPI.create({ name, description });
          closeModal();
          location.hash = "#/clan"; // fuerza recarga de la vista
          window.dispatchEvent(new HashChangeEvent("hashchange"));
        } catch (e) {
          alert(e.message);
        }
      }
    });
  }

  function openEditModal(g) {
    const curName = g.group_name ?? g.name ?? "";
    const curDesc = g.group_desc ?? g.description ?? "";
    showModal({
      title: "Editar clan",
      body: `
        <div class="space-y-3">
          <div>
            <label class="text-sm text-gray-600">Nombre</label>
            <input id="f-name" class="w-full border rounded-lg px-3 py-2" value="${escapeHtml(curName)}" />
          </div>
          <div>
            <label class="text-sm text-gray-600">Descripción</label>
            <textarea id="f-desc" class="w-full border rounded-lg px-3 py-2" rows="3">${escapeHtml(curDesc)}</textarea>
          </div>
        </div>
      `,
      onSubmit: async () => {
        const name = document.getElementById("f-name").value.trim();
        const description = document.getElementById("f-desc").value.trim();
        try {
          await GroupsAPI.update(g.id_group ?? g.id, { name, description });
          closeModal();
          location.hash = "#/clan";
          window.dispatchEvent(new HashChangeEvent("hashchange"));
        } catch (e) {
          alert(e.message);
        }
      }
    });
  }

  function openInviteModal(g) {
    showModal({
      title: "Invitar al clan",
      body: `
        <div class="space-y-3">
          <label class="text-sm text-gray-600">Email del estudiante</label>
          <input id="f-email" type="email" class="w-full border rounded-lg px-3 py-2" placeholder="correo@ejemplo.com" />
          <p class="text-xs text-gray-500">Se añadirá directamente si el correo existe.</p>
        </div>
      `,
      onSubmit: async () => {
        const email = document.getElementById("f-email").value.trim();
        if (!email) return;
        try {
          await GroupsAPI.addMember(g.id_group ?? g.id, email);
          closeModal();
          location.hash = "#/clan";
          window.dispatchEvent(new HashChangeEvent("hashchange"));
        } catch (e) {
          alert(e.message);
        }
      }
    });
  }

  function openDeleteModal(g) {
    showModal({
      title: "Eliminar clan",
      body: `<p>¿Seguro que deseas eliminar <b>${escapeHtml(g.group_name ?? g.name ?? "este clan")}</b>? Esta acción no se puede deshacer.</p>`,
      onSubmit: async () => {
        try {
          await GroupsAPI.remove(g.id_group ?? g.id);
          closeModal();
          location.hash = "#/clan";
          window.dispatchEvent(new HashChangeEvent("hashchange"));
        } catch (e) {
          alert(e.message);
        }
      }
    });
  }

  // ---------- UI modal ----------
  function showModal({ title, body, onSubmit }) {
    const modal = document.getElementById("clan-modal");
    const mTitle = document.getElementById("clan-modal-title");
    const mBody  = document.getElementById("clan-modal-body");
    const btnClose  = document.getElementById("clan-modal-close");
    const btnCancel = document.getElementById("clan-modal-cancel");
    const btnSubmit = document.getElementById("clan-modal-submit");
    mTitle.textContent = title;
    mBody.innerHTML = body;
    modal.classList.remove("hidden");
    const close = () => modal.classList.add("hidden");
    btnClose.onclick = close;
    btnCancel.onclick = close;
    btnSubmit.onclick = onSubmit;
    modal.addEventListener("click", (e) => {
      if (e.target === modal) close();
    });
    document.addEventListener("keydown", escClose);
    function escClose(e) { if (e.key === "Escape") { close(); document.removeEventListener("keydown", escClose); } }
    // expose closeModal for closures above
    window.closeModal = close;
  }
  function closeModal() {
    document.getElementById("clan-modal")?.classList.add("hidden");
  }
}

/* =========
   Helpers
   ========= */
function initials(name) {
  return name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();
}
function escapeHtml(s="") {
  return s.replace(/[&<>"']/g, c => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;" }[c]));
}
