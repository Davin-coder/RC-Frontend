export const userStore = {
  get() {
    try {
      console.log (JSON.parse(localStorage.getItem("user") || "null"));
      return JSON.parse(localStorage.getItem("user") || "null");
    } catch {
      return null;
    }
  },

  set(user) {
    if (!user) {
      localStorage.removeItem("user");
      return;
    }
    // Normalizar para evitar problemas si backend cambia nombres
    const normalized = {
      ...user,
      role: normalizeRole(user.role),
    };
    localStorage.setItem("user", JSON.stringify(normalized));
  },

  clear() {
    localStorage.removeItem("user");
  },

  role() {
    return this.get()?.role || null;
  },

  name() {
    const u = this.get();
    return u?.first_name || u?.name || u?.email || u?.id_clan || "Usuario";
  },
};

function normalizeRole(raw) {
  const r = String(raw || "").toLowerCase().trim();
  if (["team_leader", "teamleader", "team-leader", "tl"].includes(r)) return "team_leader";
  if (["admin", "administrator"].includes(r)) return "admin";
  if (["coder", "student", "estudiante"].includes(r)) return "coder";
  return r || "coder";
}
