import { AuthAPI } from "../utils/api.js";
import { userStore } from "../utils/userStore.js";

export default function Navbar() {
  const name = userStore.name();
  return `
    <header class="h-16 bg-white border-b flex items-center justify-between px-4">
      <h2 class="font-semibold"></h2>
      <div class="flex items-center gap-3">
        <span class="hidden sm:block font-medium">${name}</span>
        <button id="logout-btn" class="px-3 py-1.5 rounded-lg border hover:bg-gray-50">Logout</button>
      </div>
    </header>
  `;
}

export function initNavbarEvents() {
  const btn = document.getElementById("logout-btn");
  if (!btn) return;
  btn.addEventListener("click", async () => {
    try { await AuthAPI.logout(); } catch {}
    userStore.clear();
    history.replaceState(null, "", "#/login");
    window.dispatchEvent(new HashChangeEvent("hashchange"));
  });
}
