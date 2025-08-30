// src/routes/perfilRoutes.js
import { userStore } from "../utils/userStore.js";
import { Student_ProfileView, TL_AnalyticsView } from "../views/perfilView.js";
import { initPerfilEvents } from "../controllers/perfilControllers.js";

export default function perfilRoute() {
  const role = (userStore.role() || "coder").toLowerCase();
  const isTL = role === "team_leader" || role === "admin";

  // Seleccionar vista según el rol
  const view = isTL ? TL_AnalyticsView() : Student_ProfileView();

  // Iniciar controlador después de que se pinte la vista
  requestAnimationFrame(() => {
    if (!isTL) initPerfilEvents();
  });

  // Devolver HTML (lo inyecta app.js → renderLayout)
  return view;
}
