// src/pages/leaderboard.js
import { userStore } from "../../utils/userStore.js";
import { Coder_ClanView } from "../../views/clanView/coder/Coder_ClanView.js";
import { Coder_ClanController } from "../../controllers/clanController/coder/Coder_ClanController.js";
import { TeamLeader_ClanView } from "../../views/clanView/teamLeader/TeamLeader_ClanView.js"
import { TeamLeader_ClanController } from "../../controllers/clanController/teamLeader/TeamLeader_ClanController.js";
/* =========
   Router entry
   ========= */
export default function clanRoutes() {
  const role = (userStore.role() || "coder").toLowerCase();
  const isTL = role === "team_leader" || role === "admin";

  // 1) Pick the view to render
  const view = isTL
    ? TeamLeader_ClanView()
    : Coder_ClanView();

  // 2) Defer controller so it runs after the view is mounted in the DOM
  requestAnimationFrame(() => {
    (isTL ? TeamLeader_ClanController : Coder_ClanController)();
  });

  // 3) Return the HTML
  return view;
}