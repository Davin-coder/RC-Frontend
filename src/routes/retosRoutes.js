import { userStore } from "../utils/userStore.js";
import { Student_RetosView, TL_RetosView } from "../views/retosView.js";
import { Student_RetosController, TL_RetosController } from "../controllers/retosControllers.js";

/* =========
   Router entry
   ========= */
export default function RetosRoute() {
  const role = (userStore.role() || "coder").toLowerCase();
  const isTL = role === "team_leader" || role === "admin";

  const view = isTL ? TL_RetosView() : Student_RetosView();

  // Defer para que el DOM exista antes de correr el controller
  requestAnimationFrame(() => {
    (isTL ? TL_RetosController : Student_RetosController)();
  });

  return view;
}
