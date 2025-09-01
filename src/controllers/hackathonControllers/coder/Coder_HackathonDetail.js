import { HackathonDetail } from "../../../views/hackathonView/coder/Coder_HackathonDetail.js";

export function Coder_HackthonDetailController(hash){
  const match = hash.match(/^#\/hackathon\/([^/]+)$/);
  console.log("Esto es el match de coder_hackathondetail", match);

  if (match) {
    const id = match[1];
    return HackathonDetail({ id });
  }
}
