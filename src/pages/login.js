import { AuthAPI } from "../utils/api.js"; // si tu archivo se llama api.js
import { userStore } from "../utils/userStore.js";

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
              <!-- Email Input -->
              <div class="space-y-2">
                <label class="text-sm font-medium text-gray-900 block">
                  Correo electrónico
                </label>
                <div class="relative">
                  <svg class="absolute left-3 top-3 h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                  <input
                    name="email"
                    type="email"
                    placeholder="tu@email.com"
                    class="pl-10 h-12 w-full rounded-xl border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-600 focus:ring-opacity-20 bg-white outline-none transition-all"
                    required
                  />
                </div>
              </div>

              <!-- Password Input -->
              <div class="space-y-2">
                <label class="text-sm font-medium text-gray-900 block">
                  Contraseña
                </label>
                <div class="relative">
                  <svg class="absolute left-3 top-3 h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                  </svg>
                  <input
                    name="password_user"
                    type="password"
                    placeholder="••••••••"
                    class="pl-10 h-12 w-full rounded-xl border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-600 focus:ring-opacity-20 bg-white outline-none transition-all"
                    required
                  />
                </div>
              </div>

              <!-- Remember Me Checkbox -->
              <div class="flex items-center space-x-2">
                <input
                  id="remember"
                  type="checkbox"
                  class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-600"
                />
                <label for="remember" class="text-sm text-gray-600">
                  Recordarme
                </label>
              </div>

              <button
                type="submit"
                class="w-full h-12 bg-blue-600 hover:bg-purple-600 text-white font-medium rounded-xl transition-colors duration-200"
              >
                Iniciar Sesión
              </button>
              
              <!-- Login message element -->
              <p id="login-msg" class="text-sm mt-2 text-center"></p>
            </form>

            <!-- Forgot Password Link -->
            <div class="text-center">
              <button
                type="button"
                id="forgotPassword"
                class="text-sm text-blue-600 hover:text-purple-600 font-medium transition-colors"
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <footer class="bg-gray-900 text-white px-6 py-8">
      <div class="max-w-6xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="space-y-4">
            <div class="text-2xl font-bold">&lt;/RIWI&gt;</div>
            <p class="text-gray-300 text-sm leading-relaxed">
              Transformamos la gestión y adquisición de talento tech entrenando jóvenes en competencias técnicas y humanas distintivas, convirtiéndolos en protagonistas valiosos que desarrollan software para 
              <span class="text-orange-400 font-semibold">transformar sus vidas</span>.
            </p>
          </div>

          <div class="space-y-4">
            <h3 class="text-indigo-500 text-lg font-semibold">Contacto</h3>
            <div class="space-y-3 text-sm">
              <div class="flex items-start gap-2">
                <svg class="w-4 h-4 mt-0.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                <span class="text-gray-300">Cl. 16 #55-129, Guayabal, Medellín CC. De Moda Outlet, piso 3</span>
              </div>
              <div class="flex items-center gap-2">
                <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                </svg>
                <span class="text-gray-300">Teléfono: +57 3017325327</span>
              </div>
              <div class="flex items-center gap-2">
                <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
                <span class="text-gray-300">
                  Correo electrónico: 
                  <span class="text-indigo-500">info@riwi.io</span>
                </span>
              </div>
            </div>
          </div>

          <div class="space-y-4">
            <h3 class="text-indigo-500 text-lg font-semibold">Redes sociales</h3>
            <div class="flex gap-3">
              <a href="#" id="facebookLink" class="bg-blue-600 hover:bg-blue-700 p-2 rounded transition-colors">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path>
                </svg>
              </a>
              <a href="#" id="instagramLink" class="bg-pink-600 hover:bg-pink-700 p-2 rounded transition-colors">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.326-1.297-.878-.808-1.297-1.959-1.297-3.257 0-1.297.419-2.448 1.297-3.326.878-.878 2.029-1.297 3.326-1.297 1.297 0 2.448.419 3.257 1.297.808.878 1.297 2.029 1.297 3.326 0 1.298-.49 2.449-1.297 3.257-.809.807-1.96 1.297-3.257 1.297zm7.83 0c-1.297 0-2.448-.49-3.326-1.297-.878-.808-1.297-1.959-1.297-3.257 0-1.297.419-2.448 1.297-3.326.878-.878 2.029-1.297 3.326-1.297 1.297 0 2.448.419 3.257 1.297.808.878 1.297 2.029 1.297 3.326 0 1.298-.49 2.449-1.297 3.257-.809.807-1.96 1.297-3.257 1.297z"></path>
                </svg>
              </a>
              <a href="#" id="linkedinLink" class="bg-blue-700 hover:bg-blue-800 p-2 rounded transition-colors">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.920-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div class="border-t border-gray-800 mt-8 pt-6 text-center">
          <p class="text-gray-400 text-sm">Copyright © 2023</p>
        </div>
      </div>
    </footer>
  `;
}

export function initLoginEvents() {
  const form = document.getElementById("login-form");
  const msg = document.getElementById("login-msg");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    msg.textContent = "Verificando...";
    msg.className = "text-sm text-gray-500";

    const email = form.email.value.trim();
    const password_user = form.password_user.value;

    try {
      const data = await AuthAPI.login(email, password_user);

      // nuestro backend devuelve { success, message, user }
      if (!data?.success || !data.user) {
        msg.textContent = data?.msg || data?.message || "Credenciales inválidas";
        msg.className = "text-sm text-red-600";
        return;
      }

      // ✅ guardar user en localStorage
      userStore.set(data.user);

      msg.textContent = "Bienvenido 👋";
      msg.className = "text-sm text-green-600";

      // redirigir al dashboard
      history.replaceState(null, "", "#/dashboard");
      window.dispatchEvent(new HashChangeEvent("hashchange"));
    } catch (err) {
      console.error("Error en login", err);
      msg.textContent = "Error al conectar con el servidor";
      msg.className = "text-sm text-red-600";
    }
  });
}
