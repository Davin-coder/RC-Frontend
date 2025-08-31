// src/controllers/mentoriaController/teamLeader/TeamLeader_GestionMentoringController.js
import { MentoringAPI } from "../../../utils/api.js";
import { userStore } from "../../../utils/userStore.js";

export async function TeamLeader_GestionMentoringController() {
  console.log("Hello from TeamLeader_GestionMentoringController");

  const listEl = document.getElementById("sessions-list");
  const formEl = document.getElementById("create-session-form");
  const currentUser = userStore.get("user"); // team leader data

  // Handle new session creation
  formEl?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const dateInput = document.getElementById("session-date").value;

    if (!dateInput) return;

    await MentoringAPI.createSession({
        event_type: "life_skills",
        title: "Mentoría con Team Leader",
        event_description: `Session with leader ${currentUser?.firstname || ""}`,
        event_date: dateInput,
    });

        loadSessions(); // refresh
        formEl.reset();
});


  // Load sessions
  async function loadSessions() {
    const sessions = await MentoringAPI.getAllSessions();

    const mySessions = sessions.filter(s => s.leaderId === currentUser.id);

    
    listEl.innerHTML = mySessions.map(s => `
    <li class="p-3 border rounded bg-white">
        <p><strong>${new Date(s.event_date).toLocaleString()}</strong></p>
        <span class="text-green-600">Available</span>
    </li>
    `).join("");
  }

  loadSessions();
}