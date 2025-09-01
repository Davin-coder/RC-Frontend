import { userStore } from "../../../utils/userStore";

function escapeHTML(str = "") {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export function TeamLeader_dashboardView() {
  const userName = userStore.name();
  const safeName = escapeHTML(userName);
  return `
    <article class="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition">
      <section class="space-y-6">
        <h1 class="text-2xl md:text-3xl font-bold">
          Hello, <span id="dash-user-name" class="text-purple-700">${safeName}</span> 👋
        </h1>
        <p class="text-gray-600 mt-1">Welcome to your panel for Team Leaders.</p>
      </section>
    </article>
  `;
}
