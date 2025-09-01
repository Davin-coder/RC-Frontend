import { MentoringAPI } from "../../../utils/api.js";

export async function Coder_GestionMentoringController() {
  console.log("Coder_GestionMentoringController initialized");

  const availableContainer = document.getElementById("available-sessions-container");
  const availableEmptyState = document.getElementById("available-empty-state");

  if (!availableContainer) {
    console.error("❌ Available sessions container not found in DOM");
    return;
  }

  try {
    // 1) Load all sessions
    const sessions = await MentoringAPI.getAllSessions();

    // 2) Filter to only "available" ones (future date & status = available)
    const today = new Date();
    const openSessions = (sessions || []).filter((s) => {
      return s.status === "available" && new Date(s.event_date) >= today;
    });

    // 3) Clear container before rendering
    availableContainer.innerHTML = "";

    if (!openSessions.length) {
      availableEmptyState.classList.remove("hidden");
      return;
    }

    availableEmptyState.classList.add("hidden");

    // 4) Render each available session
    openSessions.forEach((session) => {
      const card = document.createElement("div");
      card.className =
        "p-4 bg-white border rounded-lg shadow-sm flex flex-col gap-2";

      card.innerHTML = `
        <h3 class="font-semibold text-gray-800">${session.title}</h3>
        <p class="text-sm text-gray-600">${session.event_description || ""}</p>
        <p class="text-xs text-gray-500">
          ${new Date(session.event_date).toLocaleString()} · ${session.duration || 60} min
        </p>
        <p class="text-xs text-gray-500">Type: ${session.event_type}</p>
      `;

      availableContainer.appendChild(card);
    });
  } catch (err) {
    console.error("❌ Error loading available sessions:", err);
    availableContainer.innerHTML =
      `<p class="text-red-500">Failed to load available sessions.</p>`;
  }
}