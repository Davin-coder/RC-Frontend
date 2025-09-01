// src/controllers/profileController.js
import { userStore } from "../utils/userStore.js";
import { UsersAPI } from "../utils/api.js";

export function initPerfilEvents() {
  const form = document.getElementById("profile-form");
  const msg = document.getElementById("profile-msg");
  const btnAddSkill = document.getElementById("btn-add-skill");
  const skillsList = document.getElementById("skills-list");

  // Guardar perfil
  form?.addEventListener("submit", async (e) => {
    e.preventDefault();
    msg.textContent = "Saving changes...";
    msg.className = "text-sm text-gray-500";

    const u = userStore.get() || {};
    const id = u.id_user || u.id;
    const fd = new FormData(form);

    const payload = {
      first_name: fd.get("first_name")?.trim() || "",
      last_name:  fd.get("last_name")?.trim() || "",
      email:      fd.get("email")?.trim() || "",
      location:   fd.get("location")?.trim() || "",
      bio:        fd.get("bio")?.trim() || "",
    };

    try {
      if (id) await UsersAPI.update(id, payload);
    } catch {}

    userStore.set({ ...u, ...payload, name: payload.first_name || u.name });
    msg.textContent = "Changes saved.";
    msg.className = "text-sm text-green-600";
    setTimeout(() => {
      history.replaceState(null, "", "#/perfil");
      window.dispatchEvent(new HashChangeEvent("hashchange"));
    }, 300);
  });

  // Skills (local)
  btnAddSkill?.addEventListener("click", () => openSkillModal());
  skillsList?.addEventListener("click", (e) => {
    const item = e.target.closest("[data-skill]");
    if (!item) return;
    const name = item.dataset.skill;
    const level = Number(item.dataset.level || 1);
    openSkillModal({ name, level });
  });

  function openSkillModal(s = null) {
    const modal = document.getElementById("skill-modal");
    const title = document.getElementById("skill-modal-title");
    const inputName = document.getElementById("skill-name");
    const inputLevel = document.getElementById("skill-level");
    const btnClose = document.getElementById("skill-modal-close");
    const btnCancel = document.getElementById("skill-cancel");
    const btnSave = document.getElementById("skill-save");

    title.textContent = s ? "Editar skill" : "Añadir skill";
    inputName.value = s?.name || "";
    inputLevel.value = s?.level || 1;

    const close = () => modal.classList.add("hidden");
    modal.classList.remove("hidden");

    btnClose.onclick = btnCancel.onclick = close;
    btnSave.onclick = () => {
      const name = inputName.value.trim();
      let level = Number(inputLevel.value);
      if (!name) return;
      if (!Number.isFinite(level) || level < 1 || level > 5) level = 1;

      const u = userStore.get() || {};
      const list = Array.isArray(u.skills) ? u.skills.slice() : [];
      const idx = list.findIndex(x => (x.name || x).toLowerCase() === name.toLowerCase());
      if (idx >= 0) list[idx] = { name, level }; else list.push({ name, level });

      userStore.set({ ...u, skills: list });
      renderSkills(list);
      close();
    };

    modal.addEventListener("click", (e) => { if (e.target === modal) close(); }, { once: true });
  }

  function renderSkills(list) {
    const box = document.getElementById("skills-list");
    if (!box) return;
    if (!list?.length) {
      box.innerHTML = `<p class="text-gray-500 text-sm">Aún no tienes habilidades registradas.</p>`;
      return;
    }
    box.innerHTML = list.map(s => `<div class="mb-3 cursor-pointer select-none" data-skill="${s.name}" data-level="${s.level}">
      <div class="flex justify-between text-sm mb-1"><span>${s.name}</span><span>${s.level}/5</span></div>
      <div class="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div class="h-full bg-purple-500" style="width:${(Math.max(1, Math.min(5, s.level)) / 5) * 100}%"></div>
      </div>
    </div>`).join("");
  }
}
