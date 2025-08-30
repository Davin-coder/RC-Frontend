// src/routes/hackathonRoutes.js
import { userStore } from "../utils/userStore.js";
import {
  HackathonListCoder,
  HackathonListAdmin,
  HackathonDetail
} from "../views/hackathonView.js";
import { setupCoderEvents, setupAdminEvents } from "../controllers/hackathonControllers.js";

export default function hackathonRoute(hash) {
  const role = (userStore.role() || "coder").toLowerCase();

  // Detectar si es detalle → #/hackathon/:id
  const match = hash.match(/^#\/hackathon\/([^/]+)$/);
  if (match) {
    const id = match[1];
    return HackathonDetail({ id });
  }

  // Vista lista según rol
  const html = role === "admin" || role === "team_leader"
    ? HackathonListAdmin()
    : HackathonListCoder();

  // Controladores luego de pintar
  requestAnimationFrame(() => {
    if (role === "admin" || role === "team_leader") {
      setupAdminEvents();
    } else {
      setupCoderEvents();
    }
  });

  return html;
}
