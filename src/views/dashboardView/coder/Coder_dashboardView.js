import { userStore } from "../../../utils/userStore";

// src/views/dashboardView/coder/Coder_dashboardView.js
function escapeHTML(str = "") {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export function Coder_dashboardView() {
  const userName = userStore.name();
  const safeName = escapeHTML(userName);
  return `
    <section class="space-y-6">
      <!-- Saludo -->
      <header class="bg-white border rounded-xl p-5 shadow-sm">
        <h1 class="text-2xl md:text-3xl font-bold">
          Hola, <span id="dash-user-name" class="text-purple-700">${safeName}</span> 👋
        </h1>
        <p class="text-gray-600 mt-1">Bienvenido/a a tu panel.</p>
      </header>
      <!-- Frase costeña al azar -->
      <article class="bg-white border rounded-xl p-5 shadow-sm">
        <div class="flex items-start justify-between">
          <h2 class="text-lg md:text-xl font-semibold">Frase del Caribe colombiano</h2>
          <button id="refresh-quote"
                  class="px-3 py-1.5 rounded-lg bg-purple-600 text-white text-sm hover:bg-purple-700">
            Otra frase
          </button>
        </div>
        <blockquote id="costa-quote"
                    class="mt-3 text-gray-800 italic leading-relaxed"></blockquote>
        <div id="costa-quote-meta" class="mt-2 text-xs text-gray-500"></div>
      </article>
    </section>
  `;
}
