export function Coder_GestionMentoringView() {
  return `
    <section class="space-y-6 p-4">
      <h1 class="text-2xl md:text-3xl font-bold">Mentoring</h1>

      <!-- Available Sessions -->
      <div class="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
  <h2 class="text-2xl font-bold text-gray-900 mb-5 flex items-center gap-2">
    <svg xmlns="http://www.w3.org/2000/svg" 
         class="h-6 w-6 text-indigo-500" 
         fill="none" 
         viewBox="0 0 24 24" 
         stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
            d="M5 13l4 4L19 7" />
    </svg>
    Available Sessions
  </h2>

  <div id="available-sessions-container" class="space-y-4">
    <!-- Example session card -->
    
    <div class="p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition">
      <h3 class="font-semibold text-gray-800">Session with John Doe</h3>
      <p class="text-sm text-gray-500">Tomorrow · 3:00 PM</p>
    </div>
    
  </div>

  <p id="available-empty-state" 
     class="text-gray-500 text-center text-sm py-6 hidden">
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