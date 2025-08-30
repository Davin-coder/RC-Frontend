// src/routes/dashboardRoutes.js
import { DashboardView } from "../views/dashboardView.js";
import { initDashboardController } from "../controllers/dashboardControllers.js";
import { isTL } from "../utils/role.js";

export default function dashboardRoute() {
  // Construir el HTML
  const html = DashboardView();

  // Logs según rol
  if (isTL()) {
    console.log("Dashboard de TL/Admin");
  } else {
    console.log("Dashboard de Coder");
  }

  // Iniciar lógica *después* de que el HTML esté en el DOM
  setTimeout(() => {
    initDashboardController();
  }, 0);

  // Retornar el HTML (para que app.js lo use en renderLayout)
  return html;
}
