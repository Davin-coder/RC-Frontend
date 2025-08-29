// src/pages/leaderboard.js
import { userStore } from "../utils/userStore.js";

/* =========
   Router entry
   ========= */
export default function Mentoria() {
  const role = (userStore.role() || "coder").toLowerCase();
  return (role === "team_leader" || role === "admin")
    ? TeamLeader_GestionMentoringView()
    : Coder_GestionMentoringView();
}

/* ========================================
   Vista Estudiante: Leaderboard dinámico
   ======================================== */
/****Coder_GestionMentoringView this section is in charge of 
 render the view, 
 --------------------------just HTML CONTENT------------------------------*/

function Coder_GestionMentoringView() {
  return `
    <section class="space-y-6">
      <h1 class="text-2xl md:text-3xl font-bold">Mentoring</h1>
    </section>
  `;
}

/****Coder_GestionMentoringController this section is in charge of 
 control the view above, this code below will control the html content. 
 -----------------------Just JAVASCRIPT CONTENT*------------------------******/

export async function Coder_GestionMentoringController() {
    console.log("Hello from Coder_GestionMentoringController")
}

/* ====================================================
   Vista Team Leader: Gestión de Estudiantes (tu mock)
   ==================================================== */

/****TeamLeader_GestionMentoringView this section is in charge of 
 render the view, just HTML CONTENT*******/
function TeamLeader_GestionMentoringView() {

  return `
    <section class="space-y-6">
      <h1 class="text-2xl md:text-3xl font-bold">My Mentorings</h1>
    </section>
  `;
}

/****TeamLeader_GestionMentoringController this section is in charge of 
 control the view above, this code below will control the html content. 
 -----------------------Just JAVASCRIPT CONTENT*------------------------******/
export function TeamLeader_GestionMentoringController() {
    console.log("Hello from TeamLeader_GestionMentoringController")
}

//TYPE ALL THE FUNCTIONS YOU MAY NEED BELLOW