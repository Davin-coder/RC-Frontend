// src/views/challenges/coder/Coder_retosView.js
export function Coder_retosView() {
  return `
    <section class="space-y-6" id="retos-wrap">
      <header class="bg-white border rounded-xl p-5 shadow-sm">
        <h1 class="text-2xl md:text-3xl font-bold">My Challenges</h1>
        <p class="text-gray-600 mt-1">All challenges from the database.</p>
      </header>

      <div id="retos-list" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"></div>
    </section>
  `;
}
