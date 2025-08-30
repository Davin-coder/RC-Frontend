// src/routes/clanRoutes.js
import { ClanView } from "../views/clanView.js";
import { initClanController } from "../controllers/clanControllers.js";
import { isTL } from "../utils/role.js";

export default function clanRoute() {
  // Construir la vista
  const html = ClanView();

  // Logs según rol
  if (isTL()) {
    console.log("Entrando como TL/Admin");
  } else {
    console.log("Entrando como Coder");
  }

  // Iniciar lógica después de que el DOM esté listo
  setTimeout(() => {
    initClanController();
  }, 0);

  // Retornar el HTML (lo inyecta app.js -> renderLayout)
  return html;
}
