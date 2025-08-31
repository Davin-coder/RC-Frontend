// src/routes/dashboardRoutes.js
import { userStore } from "../../utils/userStore.js";
import { Coder_dashboardView } from "../../views/dashboardView/coder/Coder_dashboardView.js";
import { TeamLeader_dashboardView } from "../../views/dashboardView/teamLeader/TeamLeader_dashboardView.js";
import { Coder_dasboardController } from "../../controllers/dashboardController/coder/Coder_dasboardController.js";
import { TeamLeader_dasboardController } from "../../controllers/dashboardController/teamLeader/TeamLeader_dashboardController.js";


export default function dashboardRoute() {
  const role = (userStore.role() || "coder").toLowerCase();
  const isTL = role === "team_leader" || role === "admin";

  // 1) Pick the view to render
  const view = isTL
    ? TeamLeader_dashboardView()
    : Coder_dashboardView();

  requestAnimationFrame(() => {
    (isTL ? TeamLeader_dasboardController : Coder_dasboardController)();
  });

  return view;
}