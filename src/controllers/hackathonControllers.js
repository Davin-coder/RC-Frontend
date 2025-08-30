// src/controllers/hackathonControllers.js

/* ==================== DATA ==================== */
export const hackathons = [
  {
    id: "hack1",
    titulo: "Hackathon IA",
    categoria: "Inteligencia Artificial",
    fecha: "2025-09-10",
    fechaInicio: new Date("2025-09-10"),
    lugar: "Bogotá",
    participantes: "Equipos de 4",
    premio: "$5,000,000 COP"
  }
];

/* ==================== AUXILIARES ==================== */
export function calcularDiasRestantes(fechaInicio) {
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);
  const fechaReset = new Date(fechaInicio);
  fechaReset.setHours(0, 0, 0, 0);

  const diffTime = fechaReset - hoy;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays >= 0 ? diffDays : 0;
}

function determinarEstado(diasRestantes) {
  if (diasRestantes === 0) return "activo";
  if (diasRestantes <= 5) return `en-${diasRestantes}-dias`;
  return "proximamente";
}

function actualizarEstados() {
  hackathons.forEach(h => {
    const diasRestantes = calcularDiasRestantes(h.fechaInicio);
    h.diasRestantes = diasRestantes;
    h.estado = determinarEstado(diasRestantes);
    h.inscripcionesAbiertas = diasRestantes <= 5;
  });
}
actualizarEstados();

/* ==================== EVENTOS ==================== */
// 👉 Para CODER (ya no tiene botón de crear)
export function setupCoderEvents() {
  console.log("Eventos del coder listos ✅");
  // Aquí puedes poner eventos propios del coder si los necesitas
}

// 👉 Para ADMIN / TL (maneja modal y crear hackathon)
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
