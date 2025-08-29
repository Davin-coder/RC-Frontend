import { userStore } from "./userStore.js";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const AuthAPI = {
  async login(email, password_user) {
    try {
      const res = await fetch(`${BASE_URL}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // importante si usas sesiones/cookies
        body: JSON.stringify({ email, password_user }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        return { ok: false, msg: data?.msg || "Error al iniciar sesión" };
      }

      if (data?.user) {
        userStore.set(data.user);
        return { ok: true, user: data.user, msg: data?.message || "Login exitoso" };
      }

      return { ok: false, msg: data?.msg || "Credenciales inválidas" };
    } catch (err) {
      console.error("AuthAPI.login error", err);
      return { ok: false, msg: "No se pudo conectar al servidor" };
    }
  },

  async logout() {
    try {
      await fetch(`${BASE_URL}/users/logout`, {
        method: "POST",
        credentials: "include",
      });
    } finally {
      userStore.clear();
    }
  },
};
