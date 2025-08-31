// src/pages/leaderboard.js
import { userStore } from "../../utils/userStore.js"
import { Coder_retosView } from "../../views/retosView/coder/Coder_retosView.js";
import { TeamLeader_retosView } from "../../views/retosView/teamLeader/TeamLeader_retosView.js";
import { Coder_retosController } from "../../controllers/retosController/coder/Coder_retosController.js";
import { TeamLeader_retosController } from "../../controllers/retosController/teamLeader/TeamLeader_retosController.js";

export default function RetosRoute() {
  const role = (userStore.role() || "coder").toLowerCase();
  const isTL = role === "team_leader" || role === "admin";

  // 1) Pick the view to render
  const view = isTL
    ? TeamLeader_retosView()
    : Coder_retosView();

  // 2) Defer controller so it runs after the view is mounted in the DOM
  requestAnimationFrame(() => {
    (isTL ? TeamLeader_retosController : Coder_retosController)();
  });

  // 3) Return the HTML
  return view;
}