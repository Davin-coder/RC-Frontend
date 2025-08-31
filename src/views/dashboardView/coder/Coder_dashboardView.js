export function Coder_dashboardView() {
  return `
    <article class="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition">
      <div class="flex items-start justify-between">
        <h3 class="text-lg font-semibold truncate"></h3>
        <span class="text-xs px-2 py-0.5 rounded"></span>
      </div>
      <p class="text-gray-600 mt-2 line-clamp-3"></p>
      <div class="flex items-center justify-between mt-4">
        <span class="text-purple-700 font-semibold">XP</span>
        <button class="px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700">
          SIU
        </button>
      </div>
    </article>
  `;
}