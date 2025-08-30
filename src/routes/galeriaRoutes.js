// src/routes/galeriaRoutes.js
import { GaleriaView } from "../views/galeriaView.js";
import { initGaleriaController } from "../controllers/galeriaControllers.js";
import { isTL } from "../utils/role.js";

export default function GaleriaRoute() {
  const html = GaleriaView({ isTL: isTL() });

  // enganchar controller después de render
  requestAnimationFrame(() => initGaleriaController?.());

  return html;
}
