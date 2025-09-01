// src/controllers/projects/coder/Coder_VitrinaController.js
import { ProjectsAPI } from "../../../utils/api.js";
import { userStore } from "../../../utils/userStore.js";

export async function TeamLeader_VitrinaController() {
  const listEl = document.getElementById("vitrina-list");
  if (!listEl) return;

  const role = String(userStore.role() || "").toLowerCase();
  if (role !== "coder") {
    listEl.innerHTML = `<div class="text-sm text-gray-500">Section available for <span class="font-medium">coder</span> role only.</div>`;
    return;
  }

  listEl.innerHTML = `<div class="col-span-full text-sm text-gray-500">Loading projects…</div>`;

  try {
    const projects = await ProjectsAPI.list();
    render(projects);
    bindEvents();
  } catch (err) {
    console.error("Coder_VitrinaController error:", err);
    listEl.innerHTML = `<div class="col-span-full text-sm text-red-600">Could not load projects.</div>`;
  }

  function render(arr) {
    if (!Array.isArray(arr) || arr.length === 0) {
      listEl.innerHTML = `<div class="col-span-full text-sm text-gray-500">No projects available.</div>`;
      return;
    }
    listEl.innerHTML = arr.map(card).join("");
  }

  function card(p) {
    const id = p.id_project ?? p.id ?? cryptoId(p);
    const title = p.p_title ?? p.title ?? "Untitled project";
    const desc = p.p_desc ?? p.project_desc ?? p.description ?? "";
    const author = p.owner_name ?? p.author ?? p.created_by_name ?? "Unknown";
    const stack = Array.isArray(p.stack) ? p.stack.join(", ") : (p.stack || "");
    const repo = p.repo_url || p.repository || "";
    const demo = p.demo_url || p.live_url || "";
    const created = p.created_at ? new Date(p.created_at).toLocaleDateString() : "";

    return `
      <article class="bg-white border rounded-xl p-4 shadow-sm flex flex-col gap-3">
        <div class="flex items-start justify-between gap-4">
          <div>
            <h3 class="text-lg font-semibold">${escapeHtml(title)}</h3>
            <p class="text-sm text-gray-600">Owner: <span class="font-medium">${escapeHtml(author)}</span></p>
            ${created ? `<p class="text-xs text-gray-500">Created: ${escapeHtml(created)}</p>` : ``}
            ${stack ? `<p class="text-xs text-gray-700 mt-1">Stack: ${escapeHtml(stack)}</p>` : ``}
          </div>
          <div class="flex items-center gap-2">
            ${repo ? `<a href="${escapeAttr(repo)}" target="_blank" rel="noopener" class="px-3 py-1.5 text-sm rounded-lg border hover:bg-gray-50">Repo</a>` : ``}
            ${demo ? `<a href="${escapeAttr(demo)}" target="_blank" rel="noopener" class="px-3 py-1.5 text-sm rounded-lg border hover:bg-gray-50">Demo</a>` : ``}
          </div>
        </div>
        <button class="toggle-desc px-3 py-1.5 text-sm rounded-lg bg-purple-600 text-white hover:bg-purple-700" data-id="${id}">
          View Description
        </button>
        <p id="proj-desc-${id}" class="text-sm text-gray-700 hidden">${escapeHtml(desc)}</p>
      </article>
    `;
  }

  function bindEvents() {
    listEl.querySelectorAll(".toggle-desc").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-id");
        const desc = document.getElementById(`proj-desc-${id}`);
        const isHidden = desc.classList.contains("hidden");
        desc.classList.toggle("hidden", !isHidden);
        btn.textContent = isHidden ? "Hide Description" : "View Description";
      });
    });
  }

  function escapeHtml(s) {
    return String(s ?? "").replace(/[&<>"']/g, m => ({ "&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;" }[m]));
  }

  function escapeAttr(s) {
    return String(s ?? "").replace(/"/g, "&quot;");
  }

  function cryptoId(obj) {
    try {
      const str = JSON.stringify(obj);
      let h = 0;
      for (let i = 0; i < str.length; i++) h = Math.imul(31, h) + str.charCodeAt(i) | 0;
      return `p_${Math.abs(h)}`;
    } catch {
      return `p_${Math.floor(Math.random() * 1e9)}`;
    }
  }
}
