import { userStore } from "../utils/userStore.js";

export default function Navbar() {
  const name = userStore.name();
  return `
    <header class="h-16 bg-white border-b flex items-center justify-between px-4">
      <h2 class="font-semibold"></h2>
      <div class="flex items-center gap-3">
        <span class="hidden sm:block font-medium">${name}</span>
      </div>
    </header>
  `;
}

// ya no necesitas initNavbarEvents
