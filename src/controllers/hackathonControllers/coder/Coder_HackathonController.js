import { Coder_HackthonDetailController } from "../coder/Coder_HackathonDetail.js";
///THIS FUNCION BELLOW WILL BE CALLING THE DETAIL VIEW AND OTHER ONES
export async function Coder_HackathonController(hash) {
    
    console.log("Hello from HACKATHON CODER CONTROLLER")
    Coder_HackthonDetailController(hash);
}

