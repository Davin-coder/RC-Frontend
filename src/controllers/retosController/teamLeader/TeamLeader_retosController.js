import { ChallengesAPI } from "../../../utils/api.js";
import Swal from "sweetalert2";
export async function TeamLeader_retosController() {
   console.log("Hello from TeamLeader_retosController TEAMLEADER RETOS");

  const listEl = document.getElementById("challenges-list");
  const formEl = document.getElementById("challenge-form");
  const titleEl = document.getElementById("challenge-title");
  const descEl = document.getElementById("challenge-description");
  const difficultyEl = document.getElementById("challenge-difficulty");
  const deadlineEl = document.getElementById("challenge-deadline");

  let editingId = null; // track challenge being edited

  // Render all challenges
  async function renderChallenges() {
    listEl.innerHTML = `<h2 class="text-xl font-semibold">Retos Publicados</h2>`;
    try {
      const challenges = await ChallengesAPI.list();

      if (!challenges.length) {
        listEl.innerHTML += `<p class="text-gray-500">No hay retos aún.</p>`;
        return;
      }

      challenges.forEach((ch) => {
        const card = document.createElement("div");
        card.className = "challenge-card bg-gray-50 shadow-lg rounded-xl p-6 border";
        card.innerHTML = `
          <h3 class="text-lg font-bold">${ch.title}</h3>
          <p class="text-gray-700 mt-2">${ch.challenge_desc || ""}</p>
          <p class="text-sm text-gray-500 mt-2">
            Dificultad: ${ch.difficulty}
            ${ch.deadline ? `| Fecha límite: ${ch.deadline.split("T")[0]}` : ""}
          </p>
          <div class="flex space-x-2 mt-4">
            <button class="edit-challenge bg-chart-4 hover:bg-chart-1 text-white px-3 py-1 rounded-lg" data-id="${ch.id_challenge}">Editar</button>
            <button class="delete-challenge bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg" data-id="${ch.id_challenge}">Eliminar</button>
          </div>
        `;
        listEl.appendChild(card);
      });

      // Attach edit/delete listeners
      listEl.querySelectorAll(".edit-challenge").forEach((btn) =>
        btn.addEventListener("click", () => handleEdit(btn.dataset.id))
      );

      listEl.querySelectorAll(".delete-challenge").forEach((btn) =>
        btn.addEventListener("click", () => handleDelete(btn.dataset.id))
      );

    } catch (err) {
      console.error("Error loading challenges:", err);
      listEl.innerHTML += `<p class="text-red-600">Error cargando retos.</p>`;
    }
  }

  // Handle create / update
  formEl.addEventListener("submit", async (e) => {
    e.preventDefault();
    const payload = {
      title: titleEl.value,
      challenge_desc: descEl.value,
      difficulty: difficultyEl.value,
      deadline: deadlineEl.value || null,
    };

    try {
      if (editingId) {
        await ChallengesAPI.update(editingId, payload);
        editingId = null;

        Swal.fire({
          icon: "success",
          title: "Reto actualizado",
          text: "El reto se actualizó correctamente",
          confirmButtonColor: "#2563eb",
        });

      } else {
        await ChallengesAPI.create(payload);

        Swal.fire({
          icon: "success",
          title: "Reto creado",
          text: "El reto fue creado con éxito",
          confirmButtonColor: "#2563eb",
        });
      }

      formEl.reset();
      await renderChallenges();

    } catch (err) {
      console.error("Error saving challenge:", err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo guardar el reto",
        confirmButtonColor: "#dc2626",
      });
    }
  });

  // Handle edit (prefill form)
  async function handleEdit(id) {
    try {
      const challenges = await ChallengesAPI.list();
      const ch = challenges.find((c) => String(c.id_challenge) === String(id));
      if (!ch) return;
      editingId = id;
      titleEl.value = ch.title;
      descEl.value = ch.challenge_desc || "";
      difficultyEl.value = ch.difficulty;
      if (ch.deadline) deadlineEl.value = ch.deadline.split("T")[0];
    } catch (err) {
      console.error("Error fetching challenge for edit:", err);
    }
  }

  // Handle delete
  async function handleDelete(id) {
    const result = await Swal.fire({
      title: "¿Eliminar reto?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#dc2626",
    });

    if (!result.isConfirmed) return;

    try {
      await ChallengesAPI.delete(id);
      await renderChallenges();
      Swal.fire({
        icon: "success",
        title: "Eliminado",
        text: "El reto fue eliminado con éxito",
        confirmButtonColor: "#2563eb",
      });
    } catch (err) {
      console.error("Error deleting challenge:", err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo eliminar el reto",
        confirmButtonColor: "#dc2626",
      });
    }
  }

  // Init
  renderChallenges();
}