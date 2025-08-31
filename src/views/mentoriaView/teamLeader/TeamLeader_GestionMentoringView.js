export function TeamLeader_GestionMentoringView() {

  return `
    <section class="space-y-6">
      <h1 class="text-2xl md:text-3xl font-bold">My Mentorings</h1>

      <!-- Create session -->
      <div class="p-4 border rounded bg-gray-50">
        <h2 class="text-xl font-semibold mb-2">Create New Session</h2>
        <form id="create-session-form" class="space-y-2">
          <input type="datetime-local" id="session-date" class="border p-2 rounded w-full" required />
          <button type="submit" class="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
            Add Session
          </button>
        </form>
      </div>

      <!-- Sessions list -->
      <div class="p-4 border rounded bg-gray-50">
        <h2 class="text-xl font-semibold mb-2">Upcoming Sessions</h2>
        <ul id="sessions-list" class="space-y-2">
          <!-- Filled by controller -->
        </ul>
      </div>
    </section>
  `;
}