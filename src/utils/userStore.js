export const userStore = {
  get() {
    try { return JSON.parse(localStorage.getItem("user") || "null"); }
    catch { return null; }
  },
  set(user) { localStorage.setItem("user", JSON.stringify(user)); },
  clear() { localStorage.removeItem("user"); },
  role() { return this.get()?.role || null; },
  name() { return this.get()?.name || this.get()?.email || "Usuario"; },
};
