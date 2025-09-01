// src/views/loginView.js

export default function LoginView() {
  return `
    <div class="min-h-screen flex items-center justify-center p-4">
      <div class="w-full max-w-md space-y-8">

        <div class="rounded-2xl shadow-xl border-0 bg-card backdrop-blur-sm p-6">
          <div class="flex justify-center">
            <img class="w-80" src="./public/RC-ShortLogo.png">
          </div>

          <div class="space-y-6">
            <form id="login-form" class="space-y-4">
              <div class="space-y-2">
                <label class="text-sm font-medium text-gray-900 block">Email Address</label>
                <div class="relative">
                  <svg class="absolute left-3 top-3 h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                  <input name="email" type="email" placeholder="example@email.com"
                    class="pl-10 h-12 w-full rounded-xl border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-600 focus:ring-opacity-20 bg-white outline-none transition-all" required />
                </div>
              </div>

              <div class="space-y-2">
                <label class="text-sm font-medium text-gray-900 block">Password</label>
                <div class="relative">
                  <svg class="absolute left-3 top-3 h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                  </svg>
                  <input name="password_user" type="password" placeholder="••••••••"
                    class="pl-10 h-12 w-full rounded-xl border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-600 focus:ring-opacity-20 bg-white outline-none transition-all" required />
                </div>
              </div>

              <button type="submit" class="w-full h-12 bg-chart-1 hover:bg-chart-4 cursor-pointer text-white font-medium rounded-xl transition-colors duration-200">
                Sign in
              </button>

              <p id="login-msg" class="text-sm mt-2 text-center"></p>
            </form>
          </div>
        </div>
      </div>
    </div>

    <footer class="bg-gray-900 text-white px-6 py-8">
      <!-- footer tal cual -->
    </footer>
  `;
}
