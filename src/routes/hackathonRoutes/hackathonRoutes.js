import { userStore } from "../../utils/userStore.js";
import { TeamLeader_HackathonController } from "../../controllers/hackathonControllers/teamLeader/TeamLeader_HackathonController.js";
import { Coder_HackathonController } from "../../controllers/hackathonControllers/Coder/Coder_HackathonController.js";

export default function hackathonRoute(hash) {
  const role = (userStore.role() || "coder").toLowerCase();
  const isTL = role === "team_leader" || role === "admin";

  const controller = isTL ? TeamLeader_HackathonController : Coder_HackathonController;
  return controller(hash);   // <- ahora siempre devuelve lo que diga el controller
}
