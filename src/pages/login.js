import { AuthAPI } from "../utils/api.js";
import { userStore } from "../utils/userStore.js";

export default function LoginView() {
  return `
    <section class="min-h-[70vh] grid place-items-center">
      <form id="login-form" class="w-full max-w-sm bg-white border rounded-xl p-5 space-y-4">
        <h2 class="text-xl font-bold">Iniciar sesión</h2>

        <div>
          <label class="text-sm text-gray-500">Email</label>
          <input name="email" type="email" class="w-full border rounded px-3 py-2" value="edu@email.com" />
        </div>
        <div>
          <label class="text-sm text-gray-500">Contraseña</label>
          <input name="password_user" type="password" class="w-full border rounded px-3 py-2" value="123456" />
        </div>

        <button class="w-full bg-purple-600 text-white rounded py-2">Entrar</button>
        <p id="login-msg" class="text-sm text-green-600"></p>
      </form>
    </section>
  `;
}

export function initLoginEvents() {
  const form = document.getElementById("login-form");
  const msg = document.getElementById("login-msg");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    msg.textContent = "";

    const email = form.email.value.trim();
    const password_user = form.password_user.value;

    try {
      const data = await AuthAPI.login(email, password_user);
      if (!data?.ok || !data?.user) {
        msg.textContent = data?.msg || "Credenciales inválidas";
        msg.classList.remove("text-green-600");
        msg.classList.add("text-red-600");
        return;
      }

      // ✅ guarda el user que el backend devolvió en sesión
      userStore.set(data.user);

      // ✅ redirige y fuerza el render del router
      history.replaceState(null, "", "#/dashboard");
      window.dispatchEvent(new HashChangeEvent("hashchange"));
    } catch (err) {
      console.error(err);
      msg.textContent = "Error al conectar con el servidor";
      msg.classList.remove("text-green-600");
      msg.classList.add("text-red-600");
    }
  });
}
