// src/utils/role.js
function normalizeRole(raw) {
  const r = String(raw || "").toLowerCase().trim();
  if (["team_leader", "teamleader", "team-leader", "tl", "leader"].includes(r)) return "team_leader";
  if (["admin", "administrator"].includes(r)) return "admin";
  if (["coder", "student", "estudiante"].includes(r)) return "coder";
  return "coder";
}

export function getCurrentRole() {
  // permite override temporal por query ?role=team_leader (útil para pruebas)
  const qs = new URLSearchParams(window.location.search);
  const qRole = qs.get("role");
  const stored = localStorage.getItem("role");
  return normalizeRole(qRole || stored || "coder");
}

export function isTL() {
  const r = getCurrentRole();
  return r === "team_leader" || r === "admin";
}

export function titleByRole(coderTitle, tlTitle) {
  return isTL() ? tlTitle : coderTitle;
}

export function subtitleByRole(coderText, tlText) {
  return isTL() ? tlText : coderText;
}
