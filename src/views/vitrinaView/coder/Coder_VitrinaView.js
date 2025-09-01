// src/views/projects/coder/Coder_VitrinaView.js
export function Coder_VitrinaView() {
  return `
    <section class="space-y-6" id="vitrina-wrap">
      <header class="bg-white border rounded-xl p-5 shadow-sm">
        <h1 class="text-2xl md:text-3xl font-bold">Browse Others' Projects</h1>
        <p class="text-gray-600 mt-1">All projects from the database.</p>
      </header>

      <div id="vitrina-list" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"></div>
    </section>
  `;
}
