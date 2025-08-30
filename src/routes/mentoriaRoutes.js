// src/routes/mentoringRoutes.js
import { userStore } from "../utils/userStore.js";
import {
  Coder_GestionMentoringView,
  TeamLeader_GestionMentoringView
} from "../views/mentoriaView.js";
import {
  Coder_GestionMentoringController,
  TeamLeader_GestionMentoringController
} from "../controllers/mentoriaControllers.js";

export default function mentoringRoute() {
  const role = (userStore.role() || "coder").toLowerCase();
  const isTL = role === "team_leader" || role === "admin";

  // 1) Seleccionar vista según rol
  const view = isTL
    ? TeamLeader_GestionMentoringView()
    : Coder_GestionMentoringView();

  // 2) Inicializar controlador después de que el layout lo pinte
  requestAnimationFrame(() => {
    if (isTL) {
      TeamLeader_GestionMentoringController();
    } else {
      Coder_GestionMentoringController();
    }
  });

  // 3) Retornar HTML → lo inyecta app.js (renderLayout)
  return view;
}
