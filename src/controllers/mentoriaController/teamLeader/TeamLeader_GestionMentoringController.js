import { MentoringAPI } from "../../../utils/api.js";
import { userStore } from "../../../utils/userStore.js";

export async function TeamLeader_GestionMentoringController() {
  const totalEl = document.getElementById("total-sessions");
  const availableEl = document.getElementById("available-sessions");
  const formEl = document.getElementById("create-session-form");
  const clearBtn = document.getElementById("clear-form");
  const submitBtn = document.getElementById("submit-btn");

  const currentUser = userStore.get("user") || {};

  // set minimum datetime
  setMinDateTime();

  // load initial stats
  await updateStats();
  await loadSessionsOverview();
  await loadBookedSessions();
  // events
  formEl?.addEventListener("submit", handleCreateSession);
  clearBtn?.addEventListener("click", () => formEl.reset());

  /** helpers **/

  async function handleCreateSession(e) {
    e.preventDefault();

    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <span class="flex items-center justify-center gap-2">
        <svg class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" 
            d="M4 12a8 8 0 018-8V0C5.37 0 0 5.37 0 12h4zm2 5.29A7.96 7.96 0 014 12H0c0 3.04 1.14 5.82 3 7.94l3-2.65z">
          </path>
        </svg>
        Creating...
      </span>
    `;

    try {
      const data = {
        title: document.getElementById("session-title").value.trim(),
        event_type: document.getElementById("session-type").value,
        event_date: document.getElementById("session-date").value,
        duration: parseInt(document.getElementById("session-duration").value),
        event_description: document.getElementById("session-description").value.trim(),
        leaderId: currentUser.id,
        status: "available", // TL sessions default
      };

      await MentoringAPI.createSession(data);

      formEl.reset();
      showToast("Session created successfully!", "success");

      await updateStats();
    } catch (err) {
      console.error("Error creating session:", err);
      showToast("Failed to create session", "error");
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
    }
  }

  async function updateStats() {
    try {
      const events = await MentoringAPI.getAllSessions();
      const myTLSessions = (events || []).filter((e) => {
        if (e.event_type !== "life_skills") return false;
        if (e.id_tutor != null) {
          return String(e.id_tutor) === String(currentUser?.id);
        }
        return true;
      });

      const today = toLocalISODate(new Date());
      const available = myTLSessions.filter((e) => (e.event_date || "").slice(0, 10) >= today);

      totalEl.textContent = myTLSessions.length;
      availableEl.textContent = available.length;
    } catch (err) {
      console.error("Error updating stats:", err);
      totalEl.textContent = "0";
      availableEl.textContent = "0";
    }
  }

  function setMinDateTime() {
    const now = new Date();
    const local = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
      .toISOString()
      .slice(0, 16);
    document.getElementById("session-date").min = local;
  }

  function toLocalISODate(dateObj) {
    const y = dateObj.getFullYear();
    const m = String(dateObj.getMonth() + 1).padStart(2, "0");
    const d = String(dateObj.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  }

  function showToast(msg, type = "info") {
    // quick placeholder — replace with your toast system
    alert(msg);
  }
   async function loadSessionsOverview() {
    try {
      const events = await MentoringAPI.getAllSessions();
      const myTLSessions = (events || []).filter((e) => {
        if (e.event_type !== "life_skills") return false;
        if (e.id_tutor != null) {
          return String(e.id_tutor) === String(currentUser?.id);
        }
        return true;
      });

      const container = document.getElementById("sessions-container");
      const emptyState = document.getElementById("empty-state");

      container.innerHTML = "";

      if (!myTLSessions.length) {
        emptyState.classList.remove("hidden");
        return;
      }

      emptyState.classList.add("hidden");

      myTLSessions.forEach((session) => {
        const card = document.createElement("div");
        card.className =
          "p-4 bg-white border rounded-lg shadow-sm flex justify-between items-start";

        card.innerHTML = `
          <div>
            <h4 class="font-semibold text-gray-800">${session.title}</h4>
            <p class="text-sm text-gray-600">${session.event_description || ""}</p>
            <p class="text-xs text-gray-500 mt-1">
              ${new Date(session.event_date).toLocaleString()} · ${session.duration || 60} min
            </p>
          </div>
          <div class="flex gap-2">
            <button class="edit-btn text-blue-600 hover:underline text-sm">Edit</button>
            <button class="delete-btn text-red-600 hover:underline text-sm">Delete</button>
          </div>
        `;

        // attach listeners
        card.querySelector(".edit-btn").addEventListener("click", () =>
          handleEditSession(session)
        );
        card.querySelector(".delete-btn").addEventListener("click", () =>
          handleDeleteSession(session.id_event)
        );

        container.appendChild(card);
      });
    } catch (err) {
      console.error("Error loading sessions overview:", err);
    }
  }

  async function handleDeleteSession(id) {
    if (!confirm("Are you sure you want to delete this session?")) return;

    try {
      await MentoringAPI.deleteSession(id);
      showToast("Session deleted", "success");
      await updateStats();
      await loadSessionsOverview();
    } catch (err) {
      console.error("Error deleting session:", err);
      showToast("Failed to delete session", "error");
    }
  }

  function handleEditSession(session) {
    // for now: load data into the form to re-save
    document.getElementById("session-title").value = session.title;
    document.getElementById("session-type").value = session.event_type;
    document.getElementById("session-date").value = session.event_date.slice(0, 16);
    document.getElementById("session-duration").value = session.duration || 60;
    document.getElementById("session-description").value =
      session.event_description || "";

    showToast("Session loaded into form, edit and click Create to update", "info");
  }
    async function loadBookedSessions() {
    try {
      const events = await MentoringAPI.getAllSessions();

      // booked sessions = those with a coder assigned (id_coder not null) and leader = current user
      const bookedSessions = (events || []).filter((e) => {
        return e.id_tutor && String(e.id_tutor) === String(currentUser?.id) && e.id_coder;
      });

      const container = document.getElementById("booked-sessions-container");
      const emptyState = document.getElementById("booked-empty-state");

      container.innerHTML = "";

      if (!bookedSessions.length) {
        emptyState.classList.remove("hidden");
        return;
      }

      emptyState.classList.add("hidden");

      bookedSessions.forEach((session) => {
        const card = document.createElement("div");
        card.className =
          "bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex flex-col justify-between";

        card.innerHTML = `
          <div>
            <h3 class="text-lg font-semibold text-gray-900">${session.title}</h3>
            <p class="text-sm text-gray-600 mt-1">
              Booked by: <span class="font-medium">${session.coder_name || "Unknown Coder"}</span>
            </p>
            <p class="text-sm text-gray-500 mt-2">
              <span class="font-medium">Date:</span> ${new Date(session.event_date).toLocaleString()}
            </p>
            <p class="text-sm text-gray-500">
              <span class="font-medium">Type:</span> ${session.event_type}
            </p>
          </div>
          <div class="mt-4">
            <span class="inline-block px-3 py-1 text-xs font-medium rounded-full 
              ${session.status === "confirmed" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}">
              ${session.status || "Pending"}
            </span>
          </div>
        `;

        container.appendChild(card);
      });
    } catch (err) {
      console.error("Error loading booked sessions:", err);
    }
  }
}