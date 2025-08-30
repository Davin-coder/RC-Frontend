// src/pages/leaderboard.js
import { userStore } from "../../utils/userStore.js"
import { Coder_GestionMentoringView } from "../../views/mentoriaView/coder/Coder_GestionMentoringView.js"
import { Coder_GestionMentoringController } from "../../controllers/mentoriaController/coder/Coder_GestionMentoringController.js";
import { TeamLeader_GestionMentoringView } from "../../views/mentoriaView/teamLeader/TeamLeader_GestionMentoringView.js"
import { TeamLeader_GestionMentoringController } from "../../controllers/mentoriaController/teamLeader/TeamLeader_GestionMentoringController.js";
/* =========
   Router entry
   ========= */
export default function Mentoria() {
  const role = (userStore.role() || "coder").toLowerCase();
  const isTL = role === "team_leader" || role === "admin";

  // 1) Pick the view to render
  const view = isTL
    ? TeamLeader_GestionMentoringView()
    : Coder_GestionMentoringView();

  // 2) Defer controller so it runs after the view is mounted in the DOM
  requestAnimationFrame(() => {
    (isTL ? TeamLeader_GestionMentoringController : Coder_GestionMentoringController)();
  });

  // 3) Return the HTML
  return view;
}