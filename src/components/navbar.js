export default function Navbar() {
  return `
    <header class="h-16 bg-white border-b flex items-center px-4 gap-4">
      <button class="md:hidden mr-1 px-3 py-2 rounded-lg hover:bg-gray-100">☰</button>
      <div class="flex-1">
        <div class="max-w-xl">
          <div class="relative">
            <input
              class="w-full rounded-lg border border-gray-200 pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Buscar retos, compañeros..."/>
            <span class="absolute left-3 top-2.5 text-gray-400">🔎</span>
          </div>
        </div>
      </div>

      <button class="relative p-2 rounded-lg hover:bg-gray-100">🔔
        <span class="absolute -top-0.5 -right-0.5 h-5 w-5 bg-orange-500 text-white text-xs rounded-full grid place-content-center">3</span>
      </button>
      <div class="h-10 w-10 rounded-full overflow-hidden border">
        <img src="https://i.pravatar.cc/100?img=32" class="h-full w-full object-cover" alt="avatar"/>
      </div>
    </header>
  `;
}
