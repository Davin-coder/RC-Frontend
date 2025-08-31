// src/routes/hackathonRoutes.js
import { userStore } from "../utils/userStore.js";
import { Coder_HackathonView } from "../../views/hackathonView/coder/Coder_HackathonView.js";
import { TeamLeader_HackathonView } from "../../views/hackathonView/teamLeader/TeamLeader_HackathonView.js";
import { TeamLeader_HackathonController } from "../../controllers/hackathonControllers/teamLeader/TeamLeader_HackathonController.js";
import { Coder_HackathonController } from "../../controllers/hackathonControllers/Coder/Coder_HackathonController.js";

export default function vitrinaRoutes() {
  const role = (userStore.role() || "coder").toLowerCase();
  const isTL = role === "team_leader" || role === "admin";

  const view = isTL
    ? TeamLeader_HackathonView()
    : Coder_HackathonView();

  requestAnimationFrame(() => {
    (isTL ? TeamLeader_HackathonController : Coder_HackathonController)();
  });

  return view;
}