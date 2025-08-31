export function TeamLeader_GestionMentoringView() {
  return `
    <section class="max-w-6xl mx-auto space-y-8 p-6">
      <!-- Header with stats -->
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 class="text-3xl md:text-4xl font-bold text-gray-900">My Mentoring Sessions</h1>
          <p class="text-gray-600 mt-1">Create and manage mentoring sessions for your team</p>
        </div>
        <div class="flex gap-4">
          <div class="bg-indigo-50 px-4 py-3 rounded-xl text-center border border-indigo-100">
            <div class="text-2xl font-bold text-indigo-600" id="total-sessions">0</div>
            <div class="text-sm text-gray-600">Total Sessions</div>
          </div>
          <div class="bg-green-50 px-4 py-3 rounded-xl text-center border border-green-100">
            <div class="text-2xl font-bold text-green-600" id="available-sessions">0</div>
            <div class="text-sm text-gray-600">Available</div>
          </div>
        </div>
      </div>

      <!-- Create session card -->
      <div class="bg-white p-6 border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow">
        <div class="flex items-center gap-3 mb-6">
          <div class="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
            <svg class="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
            </svg>
          </div>
          <div>
            <h2 class="text-xl font-semibold text-gray-900">Create New Session</h2>
            <p class="text-sm text-gray-500">Schedule a new mentoring session for your team</p>
          </div>
        </div>
        
        <form id="create-session-form" class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label for="session-title" class="block text-sm font-medium text-gray-700 mb-2">
                Session Title *
              </label>
              <input 
                type="text" 
                id="session-title" 
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200" 
                placeholder="e.g., JavaScript Fundamentals Session"
                required 
              />
            </div>
            
            <div>
              <label for="session-type" class="block text-sm font-medium text-gray-700 mb-2">
                Session Type *
              </label>
              <select 
                id="session-type" 
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                required
              >
                <option value="">Select session type...</option>
                <option value="tutoring">Tutoring</option>
                <option value="life_skills">Life Skills</option>
                <option value="english">English</option>
              </select>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label for="session-date" class="block text-sm font-medium text-gray-700 mb-2">
                Date & Time *
              </label>
              <input 
                type="datetime-local" 
                id="session-date" 
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200" 
                required 
              />
            </div>
            
            <div>
              <label for="session-duration" class="block text-sm font-medium text-gray-700 mb-2">
                Duration (for reference) *
              </label>
              <select 
                id="session-duration" 
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
              >
                <option value="30">30 minutes</option>
                <option value="45">45 minutes</option>
                <option value="60" selected>60 minutes</option>
                <option value="90">90 minutes</option>
                <option value="120">120 minutes</option>
              </select>
              <p class="text-xs text-gray-500 mt-1">Duration is for planning purposes only</p>
            </div>
          </div>

          <div>
            <label for="session-description" class="block text-sm font-medium text-gray-700 mb-2">
              Session Description
            </label>
            <textarea 
              id="session-description" 
              rows="4" 
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 resize-none" 
              placeholder="Describe what will be covered in this session, any prerequisites, or special instructions..."
            ></textarea>
          </div>

          <div class="flex flex-col sm:flex-row gap-3 pt-2">
            <button 
              type="submit" 
              class="flex-1 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              id="submit-btn"
            >
              <span class="flex items-center justify-center gap-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                </svg>
                Create Session
              </span>
            </button>
            <button 
              type="button" 
              id="clear-form"
              class="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Clear Form
            </button>
          </div>
        </form>
      </div>

      <!-- Sessions Overview -->
<div class="mt-10">
  <h2 class="text-2xl font-bold text-gray-900">Sessions Overview</h2>
  <p class="text-gray-600 mb-4">Manage your upcoming and past mentoring sessions</p>

  <!-- Empty State -->
  <div id="empty-state" class="hidden text-center py-12 border-2 border-dashed rounded-lg">
    <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
        d="M9 17v-6h13M9 5h13M5 12h.01M5 6h.01M5 18h.01" />
    </svg>
    <h3 class="mt-2 text-sm font-medium text-gray-900">No sessions yet</h3>
    <p class="mt-1 text-sm text-gray-500">Get started by creating your first mentoring session.</p>
  </div>

  <!-- Sessions container -->
  <div id="sessions-container" class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
    <!-- Example card -->
    <!-- These will be generated dynamically from controller -->
    <div class="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex flex-col justify-between">
      <div>
        <h3 class="text-lg font-semibold text-gray-900">JavaScript Fundamentals</h3>
        <p class="text-sm text-gray-600 mt-1">Intro to core JavaScript concepts</p>
        <p class="text-sm text-gray-500 mt-2">
          <span class="font-medium">Date:</span> Sep 4, 2025, 10:00 AM
        </p>
        <p class="text-sm text-gray-500">
          <span class="font-medium">Type:</span> Life Skills
        </p>
      </div>
        <div class="mt-4 flex gap-2">
          <button
            class="flex-1 px-3 py-2 text-sm bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 font-medium transition">
            Edit
          </button>
          <button
            class="flex-1 px-3 py-2 text-sm bg-red-50 text-red-600 rounded-lg hover:bg-red-100 font-medium transition">
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- Booked Sessions Section -->
<div class="mt-12">
  <h2 class="text-2xl font-bold text-gray-900">Booked Sessions</h2>
  <p class="text-gray-600 mb-4">See all mentoring sessions that coders have booked with you</p>

  <!-- Empty state -->
  <div id="booked-empty-state" class="hidden text-center py-12 border-2 border-dashed rounded-lg">
    <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
        d="M9 17v-6h13M9 5h13M5 12h.01M5 6h.01M5 18h.01" />
    </svg>
    <h3 class="mt-2 text-sm font-medium text-gray-900">No booked sessions</h3>
    <p class="mt-1 text-sm text-gray-500">Coders haven’t booked any sessions yet.</p>
  </div>

  <!-- Booked sessions container -->
  <div id="booked-sessions-container" class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
    <!-- Example booked session card -->
    <!-- These will be injected dynamically from the controller -->
    <div class="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex flex-col justify-between">
      <div>
        <h3 class="text-lg font-semibold text-gray-900">React Basics</h3>
        <p class="text-sm text-gray-600 mt-1">Booked by: <span class="font-medium">John Doe</span></p>
        <p class="text-sm text-gray-500 mt-2">
          <span class="font-medium">Date:</span> Sep 10, 2025, 2:00 PM
        </p>
        <p class="text-sm text-gray-500">
          <span class="font-medium">Type:</span> Tutoring
        </p>
      </div>
      <div class="mt-4">
        <span class="inline-block px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700">
          Confirmed
        </span>
      </div>
    </div>
  </div>
</div>

    <style>
      /* Custom animations for modals */
      #edit-modal.flex #edit-modal-content,
      #delete-modal.flex #delete-modal-content {
        animation: modalShow 0.2s ease-out forwards;
      }
      
      @keyframes modalShow {
        from {
          opacity: 0;
          transform: scale(0.95);
        }
        to {
          opacity: 1;
          transform: scale(1);
        }
      }
      
      @keyframes modalHide {
        from {
          opacity: 1;
          transform: scale(1);
        }
        to {
          opacity: 0;
          transform: scale(0.95);
        }
      }
      
      /* Line clamp utilities */
      .line-clamp-1 {
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
      
      .line-clamp-2 {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
      
      /* Smooth hover effects */
      .hover-lift {
        transition: transform 0.2s ease, box-shadow 0.2s ease;
      }
      
      .hover-lift:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
      }
      
      /* Loading animation */
      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }
      
      .animate-spin {
        animation: spin 1s linear infinite;
      }
      
      /* Custom focus styles */
      input:focus, select:focus, textarea:focus {
        outline: none;
        box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
      }
      
      /* Button hover effects */
      button {
        transition: all 0.2s ease;
      }
    </style>
  `;
}