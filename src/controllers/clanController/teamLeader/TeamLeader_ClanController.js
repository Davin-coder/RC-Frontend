import { hackathons } from "../../../models/hackathonModel.js";
export async function TeamLeader_ClanController() {
    setupAdminEvents();
}

export function setupAdminEvents() {
  const btnCrear = document.getElementById("btnCrearHackathon");
  const modal = document.getElementById("modalCrearHackathon");
  const cerrar = document.getElementById("btnCerrarModal");
  const form = document.getElementById("formCrearHackathon");

  if (btnCrear) btnCrear.addEventListener("click", () => modal.classList.remove("hidden"));
  if (cerrar) cerrar.addEventListener("click", () => modal.classList.add("hidden"));

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const newHackathon = {
        id: document.getElementById("titulo").value.toLowerCase().replace(/\s+/g, "-"),
        titulo: document.getElementById("titulo").value,
        categoria: document.getElementById("requisitos").value,
        descripcion: document.getElementById("descripcion").value,
        duracion: document.getElementById("duracion").value + " días",
        participantes: document.getElementById("integrantes").value + " por grupo",
        lenguajes: document.getElementById("lenguajes").value,
        fecha: new Date().toISOString().split("T")[0],
        fechaInicio: new Date()
      };
      hackathons.push(newHackathon);
      alert("✅ Hackathon creado");
      window.location.hash = "#/hackathon"; // recargar vista sin reload
    });
  }
}