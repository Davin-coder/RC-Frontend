const BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const AuthAPI = {
  async login(email, password_user) {
    const res = await fetch(`${BASE}/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // <-- MUY IMPORTANTE
      body: JSON.stringify({ email, password_user }),
    });
    return res.json();
  },
  async me() {
    const res = await fetch(`${BASE}/users/me`, { credentials: "include" });
    return res.json();
  },
  async logout() {
    const res = await fetch(`${BASE}/users/logout`, {
      method: "POST",
      credentials: "include",
    });
    return res.json();
  }
};

export const ChallengesAPI = {
  async list() {
    debugger
    try {
      const res = await fetch(`${BASE}/challenges`, { credentials: "include" });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.msg || `HTTP ${res.status}`);
      console.log(data.challenge);
      return data.challenge || [];
    } catch (error) {
      console.error("Error loading challenges:", error.message);
      return []; // Retornar array vacío en caso de error
    }
  }
};
