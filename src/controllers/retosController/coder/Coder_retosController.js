// src/controllers/challenges/coder/Coder_retosController.js
import { ChallengesAPI } from "../../../utils/api.js";
import { userStore } from "../../../utils/userStore.js";

export async function Coder_retosController() {
  const listEl = document.getElementById("retos-list");
  if (!listEl) return;

  const role = String(userStore.role() || "").toLowerCase();
  if (role !== "coder") {
    listEl.innerHTML = `<div class="text-sm text-gray-500">Section available for <span class="font-medium">coder</span> role only.</div>`;
    return;
  }

  listEl.innerHTML = `<div class="col-span-full text-sm text-gray-500">Loading challenges…</div>`;

  try {
    const challenges = await ChallengesAPI.list();
    render(challenges);
    bindEvents();
  } catch (err) {
    console.error("Coder_retosController error:", err);
    listEl.innerHTML = `<div class="col-span-full text-sm text-red-600">Could not load challenges.</div>`;
  }

  function render(arr) {
    if (!Array.isArray(arr) || arr.length === 0) {
      listEl.innerHTML = `<div class="col-span-full text-sm text-gray-500">No challenges available.</div>`;
      return;
    }
    listEl.innerHTML = arr.map(card).join("");
  }

  function card(ch) {
    return `
      <article class="bg-white border rounded-xl p-4 shadow-sm flex flex-col gap-3">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-semibold">${escapeHtml(ch.title)}</h3>
          <span class="px-2 py-0.5 rounded-full text-xs ${diffClass(ch.difficulty)}">
            ${escapeHtml(ch.difficulty || "n/a")}
          </span>
        </div>
        <button class="toggle-desc px-3 py-1.5 text-sm rounded-lg bg-purple-600 text-white hover:bg-purple-700"
                data-id="${ch.id_challenge}">
          View Description
        </button>
        <p id="desc-${ch.id_challenge}" class="text-sm text-gray-600 hidden">${escapeHtml(ch.challenge_desc || "")}</p>
      </article>
    `;
  }

  function bindEvents() {
    listEl.querySelectorAll(".toggle-desc").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-id");
        const desc = document.getElementById(`desc-${id}`);
        const isHidden = desc.classList.contains("hidden");
        desc.classList.toggle("hidden", !isHidden);
        btn.textContent = isHidden ? "Hide Description" : "View Description";
      });
    });
  }

  function diffClass(d) {
    const v = String(d || "").toLowerCase();
    if (v === "beginner") return "bg-green-100 text-green-700";
    if (v === "intermediate") return "bg-yellow-100 text-yellow-700";
    if (v === "advanced") return "bg-red-100 text-red-700";
    return "bg-gray-100 text-gray-700";
  }

  function escapeHtml(s) {
    return String(s ?? "").replace(/[&<>"']/g, m => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "\"": "&quot;",
      "'": "&#39;"
    }[m]));
  }
}
