// src/routes/dashboardRoutes.js
import { DashboardView } from "../views/dashboardView.js";
import { initDashboardController } from "../controllers/dashboardControllers.js";
import { isTL } from "../utils/role.js";

export default function dashboardRoute() {
  const html = DashboardView();
  if (isTL()) {
    console.log("Dashboard for TL/Admin");
  } else {
    console.log("Dashboard for Coder");
  }
  // Iniciar lógica *después* de que el HTML esté en el DOM
  setTimeout(() => {
    initDashboardController();
  }, 0);
  // Retornar el HTML (para que app.js lo use en renderLayout)
  return html;
}
