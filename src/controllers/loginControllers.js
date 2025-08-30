// src/controllers/loginController.js
import { AuthAPI } from "../utils/api.js";
import { userStore } from "../utils/userStore.js";

export function initLoginEvents() {
  const form = document.getElementById("login-form");
  const msg = document.getElementById("login-msg");
  if (!form) return;

  const setMsg = (text, cls) => {
    msg.textContent = text;
    msg.className = `text-sm text-center ${cls}`;
  };

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    setMsg("Verificando...", "text-gray-500");

    const email = form.email.value.trim();
    const password_user = form.password_user.value;
    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;

    try {
      const data = await AuthAPI.login(email, password_user);
      if (!data?.ok || !data?.user) {
        setMsg(data?.msg || "Credenciales inválidas", "text-red-600");
        btn.disabled = false;
        return;
      }
      userStore.set(data.user);
      setMsg("Bienvenido 👋", "text-green-600");

      // Redirección segura
      if (window.location.hash !== "#/dashboard") {
        window.location.hash = "#/dashboard";
      } else {
        window.dispatchEvent(new HashChangeEvent("hashchange"));
      }
    } catch (err) {
      console.error("Error en login", err);
      setMsg("Error al conectar con el servidor", "text-red-600");
      btn.disabled = false;
    }
  });
}
