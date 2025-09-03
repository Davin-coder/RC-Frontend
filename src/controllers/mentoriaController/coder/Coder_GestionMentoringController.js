import { MentoringAPI } from "../../../utils/api.js";

export async function Coder_GestionMentoringController() {
  const sessionsContainer = document.getElementById("available-sessions-container");
  const emptyState = document.getElementById("available-empty-state");
  const registrationsContainer = document.getElementById("my-registrations-container");
  const registrationsEmpty = document.getElementById("registrations-empty-state");

  async function loadSessions() {
    try {
      const sessions = await MentoringAPI.getAllSessions();
      sessionsContainer.innerHTML = "";

      if (!sessions || sessions.length === 0) {
        emptyState.classList.remove("hidden");
        return;
      }

      emptyState.classList.add("hidden");

      sessions.forEach(session => {
        const card = document.createElement("div");
        card.className =
          "p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition flex justify-between items-center";

        card.innerHTML = `
          <div>
            <h3 class="font-semibold text-gray-800">${session.title ?? "Untitled Session"}</h3>
            <p class="text-sm text-gray-500">
              ${session.date ?? "No date"} · ${session.time ?? ""}
            </p>
          </div>
          <button 
            class="bg-indigo-500 hover:bg-indigo-600 text-white text-sm px-4 py-2 rounded-lg transition"
            data-session-id="${session.id}">
            Inscribirse
          </button>
        `;

        // Agregar evento al botón de inscribirse
        const btn = card.querySelector("button");
        btn.addEventListener("click", async () => {
          await registerToSession(session.id, session);
        });

        sessionsContainer.appendChild(card);
      });
    } catch (error) {
      console.error("Error loading sessions:", error);
      sessionsContainer.innerHTML = `<p class="text-red-500 text-sm">Error loading sessions.</p>`;
    }
  }

  async function registerToSession(sessionId, session) {
    try {
      const BASE_URL = "http://localhost:3000";
      const res = await fetch(`${BASE_URL}/events/${sessionId}/registrations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) throw new Error("Failed to register");

      // Mostrar en My Registrations
      addRegistrationCard(session);
    } catch (error) {
      console.error("Error registering:", error);
      alert("Hubo un error al registrarse");
    }
  }

  function addRegistrationCard(session) {
    registrationsEmpty.classList.add("hidden");

    const regCard = document.createElement("div");
    regCard.className =
      "p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition";

    regCard.innerHTML = `
      <h3 class="font-semibold text-gray-800">${session.title ?? "Untitled Session"}</h3>
      <p class="text-sm text-gray-500">${session.date ?? "No date"} · ${session.time ?? ""}</p>
    `;

    registrationsContainer.appendChild(regCard);
  }

  // Inicial
  await loadSessions();
}