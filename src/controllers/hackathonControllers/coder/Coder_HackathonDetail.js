import { HackathonDetail } from "../../../views/hackathonView.js";
export function Coder_HackthonDetail(){
  const match = hash.match(/^#\/hackathon\/([^/]+)$/);
  if (match) {
    const id = match[1];
    return HackathonDetail({ id });
  }
}
  