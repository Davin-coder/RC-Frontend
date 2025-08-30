// src/utils/role.js
function normalizeRole(raw) {
  const r = String(raw || "").toLowerCase().trim();
  if (["team_leader", "teamleader", "team-leader", "tl", "leader"].includes(r)) return "team_leader";
  if (["admin", "administrator"].includes(r)) return "admin";
  if (["coder", "student", "estudiante"].includes(r)) return "coder";
  return "coder";
}

export function getCurrentRole() {
  const userData = localStorage.getItem("user"),
    user = JSON.parse(userData),
    userRole = user.role;
  return normalizeRole( userRole || "coder");
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
