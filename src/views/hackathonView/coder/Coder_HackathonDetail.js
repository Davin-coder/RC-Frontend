import { hackathons, calcularDiasRestantes } from "../../../controllers/hackathonControllers/hackathonControllers.js";

export function HackathonDetail(params) {
  console.log("Params en HackathonDetail view:", params);
  const hackathon = hackathons.find(h => h.id === params.id);
  if (!hackathon) return `<p>No se encontró el hackathon</p>`;
  const diasRestantes = calcularDiasRestantes(hackathon.fechaInicio);
  const inscripcionesAbiertas = diasRestantes <= 5;

  return `
    <section class="p-6">
      <a href="#/hackathon" class="text-indigo-600 hover:underline">⬅ Volver</a>
      <h1 class="text-3xl font-bold mt-4">${hackathon.titulo}</h1>
      <p class="italic">${hackathon.categoria}</p>
      <p class="mt-2">${hackathon.descripcion || "Sin descripción"}</p>
      <p class="text-sm text-gray-600">Duración: ${hackathon.duracion || "48 horas"}</p>
      <p class="text-sm text-gray-600">Lenguajes: ${hackathon.lenguajes || "No especificados"}</p>
      <div class="mt-4">
        ${inscripcionesAbiertas 
          ? `<button class="bg-green-600 text-white px-4 py-2 rounded">Inscribirse</button>` 
          : `<p class="text-blue-600">Inscripciones próximamente</p>`}
      </div>
    </section>
  `;
}