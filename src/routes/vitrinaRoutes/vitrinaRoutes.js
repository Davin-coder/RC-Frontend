
import { userStore } from "../../utils/userStore.js";
import { Coder_VitrinaView } from "../../views/vitrinaView/coder/Coder_VitrinaView.js";
import { Coder_VitrinaController } from "../../controllers/VitrinaController/coder/Coder_VitrinaController.js";
import { TeamLeader_VitrinaView } from "../../views/VitrinaView/teamLeader/TeamLeader_VitrinaView.js"
import { TeamLeader_VitrinaController } from "../../controllers/VitrinaController/teamLeader/TeamLeader_VitrinaController.js";
/* =========
   Router entry
   ========= */
export default function vitrinaRoutes() {
  const role = (userStore.role() || "coder").toLowerCase();
  const isTL = role === "team_leader" || role === "admin";

  const view = isTL
    ? TeamLeader_VitrinaView()
    : Coder_VitrinaView();

  requestAnimationFrame(() => {
    (isTL ? TeamLeader_VitrinaController : Coder_VitrinaController)();
  });

  return view;
}