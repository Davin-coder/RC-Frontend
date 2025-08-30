// src/views/loginView.js

export default function LoginView() {
  return `
    <div class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div class="w-full max-w-md space-y-8">
        <div class="text-center">
          <div class="mx-auto w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
            <span class="text-white font-bold text-2xl">RIWI</span>
          </div>
        </div>

        <div class="rounded-2xl shadow-xl border-0 bg-white/95 backdrop-blur-sm p-6">
          <div class="text-center pb-6">
            <h1 class="text-2xl font-bold text-gray-900">Bienvenido a RIWI Community</h1>
            <p class="text-gray-600 mt-2">Ingresa tus credenciales para continuar</p>
          </div>

          <div class="space-y-6">
            <form id="login-form" class="space-y-4">
              <div class="space-y-2">
                <label class="text-sm font-medium text-gray-900 block">Correo electrónico</label>
                <div class="relative">
                  <svg class="absolute left-3 top-3 h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                  <input name="email" type="email" placeholder="tu@email.com"
                    class="pl-10 h-12 w-full rounded-xl border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-600 focus:ring-opacity-20 bg-white outline-none transition-all" required />
                </div>
              </div>

              <div class="space-y-2">
                <label class="text-sm font-medium text-gray-900 block">Contraseña</label>
                <div class="relative">
                  <svg class="absolute left-3 top-3 h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                  </svg>
                  <input name="password_user" type="password" placeholder="••••••••"
                    class="pl-10 h-12 w-full rounded-xl border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-600 focus:ring-opacity-20 bg-white outline-none transition-all" required />
                </div>
              </div>

              <button type="submit" class="w-full h-12 bg-blue-600 hover:bg-purple-600 text-white font-medium rounded-xl transition-colors duration-200">
                Iniciar Sesión
              </button>

              <p id="login-msg" class="text-sm mt-2 text-center"></p>
            </form>

            <div class="text-center">
              <button type="button" id="forgotPassword" class="text-sm text-blue-600 hover:text-purple-600 font-medium transition-colors">
                ¿Olvidaste tu contraseña?
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <footer class="bg-gray-900 text-white px-6 py-8">
      <!-- footer tal cual -->
    </footer>
  `;
}
