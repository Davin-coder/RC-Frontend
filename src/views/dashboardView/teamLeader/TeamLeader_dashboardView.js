import { userStore } from "../../../utils/userStore";

export function TeamLeader_dashboardView() {
  const userName = userStore.name();
  const safeName = userName
    ? String(userName).replace(/[&<>"']/g, m => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
      }[m]))
    : "User";

  return `
    <section class="space-y-6">
      <!-- Greeting -->
      <header class="bg-white border rounded-xl p-5 shadow-sm">
        <h1 class="text-2xl md:text-3xl font-bold">
          Hello, <span id="dash-user-name" class="text-purple-700">${safeName}</span> 👋
        </h1>
        <p class="text-gray-600 mt-1">Welcome to your Team Leader dashboard.</p>
      </header>

      <!-- Random Caribbean phrase -->
      <article class="bg-white border rounded-xl p-5 shadow-sm">
        <div class="flex items-start justify-between">
          <h2 class="text-lg md:text-xl font-semibold">Caribbean Inspirational Quote</h2>
          <button id="refresh-quote"
                  class="px-3 py-1.5 rounded-lg bg-purple-600 text-white text-sm hover:bg-purple-700">
            Another quote
          </button>
        </div>
        <blockquote id="costa-quote"
                    class="mt-3 text-gray-800 italic leading-relaxed"></blockquote>
        <div id="costa-quote-meta" class="mt-2 text-xs text-gray-500"></div>
      </article>
    </section>
  `;
}
