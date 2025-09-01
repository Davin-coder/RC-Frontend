export function Coder_GestionMentoringView() {
  return `
    <section class="space-y-6 p-4">
      <h1 class="text-2xl md:text-3xl font-bold">Mentoring</h1>

      <!-- Available Sessions -->
      <div>
        <h2 class="text-xl font-semibold text-gray-800 mb-3">Available Sessions</h2>
        <div id="available-sessions-container" class="space-y-3"></div>
        <p id="available-empty-state" class="text-gray-500 text-sm hidden">
          No available mentoring sessions at the moment.
        </p>
      </div>

      <!-- My Registrations -->
      <div>
        <h2 class="text-xl font-semibold text-gray-800 mb-3">My Registrations</h2>
        <div id="my-registrations-container" class="space-y-3"></div>
        <p id="registrations-empty-state" class="text-gray-500 text-sm hidden">
          You have not registered for any sessions yet.
        </p>
      </div>
    </section>
  `;
}