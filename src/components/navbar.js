export default function Navbar() {
  return `
    <header class="h-16 bg-white border-b flex items-center px-4 gap-4">
      <button class="md:hidden mr-1 px-3 py-2 rounded-lg hover:bg-gray-100">☰</button>
      <div class="flex-1">
        <div class="max-w-xl">
        </div>
      </div>

      <div class="h-10 w-10 rounded-full overflow-hidden border">
        <img src="https://i.pravatar.cc/100?img=32" class="h-full w-full object-cover" alt="avatar"/>
      </div>
    </header>
  `;
}
