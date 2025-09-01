import { Coder_HackthonDetailController } from "../coder/Coder_HackathonDetail.js";
import { Coder_HackathonView } from "../../../views/hackathonView/coder/Coder_HackathonView.js";

export function Coder_HackathonController(hash) {
  console.log("Hello from HACKATHON CODER CONTROLLER");

  if (hash === "#/hackathon") {
    return Coder_HackathonView();
  }

  const detailView = Coder_HackthonDetailController(hash);
  if (detailView) return detailView;

  return `<p class="p-6">Vista no encontrada</p>`;
}
