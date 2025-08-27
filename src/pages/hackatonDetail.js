// hackatonDetail.js
import { hackathons } from "./hackatonList.js";

// Función para calcular días restantes
function calcularDiasRestantes(fechaInicio) {
  const hoy = new Date();
  // Resetear horas para comparar solo fechas
  hoy.setHours(0, 0, 0, 0);
  const fechaInicioReset = new Date(fechaInicio);
  fechaInicioReset.setHours(0, 0, 0, 0);
  
  const diffTime = fechaInicioReset - hoy;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays > 0 ? diffDays : 0;
}

export default function HackathonDetail(params) {
  const hackathon = hackathons.find(h => h.id === params.id);

  if (!hackathon) return `<p>No se encontró el hackathon</p>`;

  const diasRestantes = calcularDiasRestantes(hackathon.fechaInicio);
  const inscripcionesAbiertas = diasRestantes <= 5;

  return `
  <section class="p-6 space-y-6">
      <!-- Botón de volver con efecto hover -->
      <a href="#/HackathonList" class="inline-flex items-center justify-center px-5 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold rounded-lg shadow-md transition-all duration-300 hover:from-purple-600 hover:to-indigo-700 hover:shadow-lg hover:-translate-y-0.5 transform">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
        </svg>
        Volver a Hackathons
      </a>

      <!-- Banner Mejorado -->
      <div class="bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-800 text-white p-8 rounded-2xl shadow-lg relative overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
        <div class="relative z-10">
          <div class="flex justify-between items-start mb-6">
            <div>
              <h1 class="text-3xl font-bold mb-2">${hackathon.titulo}</h1>
              <p class="text-xl font-semibold italic">${hackathon.categoria}</p>
            </div>
            <div class="flex flex-col items-end">
              <div class="bg-white text-purple-700 font-bold py-1 px-3 rounded-full text-sm mb-2">
                48 HORAS
              </div>
              ${diasRestantes > 0 ? `
                <div class="bg-${inscripcionesAbiertas ? 'green' : 'blue'}-100 text-${inscripcionesAbiertas ? 'green' : 'blue'}-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  ${inscripcionesAbiertas ? `Inscripciones abiertas (en ${diasRestantes} días)` : 'Próximamente'}
                </div>
              ` : `
                <div class="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  Activo ahora
                </div>
              `}
            </div>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div class="flex items-center bg-white/10 backdrop-blur-sm p-3 rounded-lg">
              <span class="mr-3">📅</span>
              <div>
                <p class="font-semibold">${hackathon.fecha}</p>
                <p class="text-sm opacity-90">Fecha del evento</p>
              </div>
            </div>
            
            <div class="flex items-center bg-white/10 backdrop-blur-sm p-3 rounded-lg">
              <span class="mr-3">📍</span>
              <div>
                <p class="font-semibold">${hackathon.lugar}</p>
                <p class="text-sm opacity-90">Ubicación</p>
              </div>
            </div>
            
            <div class="flex items-center bg-white/10 backdrop-blur-sm p-3 rounded-lg">
              <span class="mr-3">👥</span>
              <div>
                <p class="font-semibold">Máx 4 por equipo</p>
                <p class="text-sm opacity-90">Participantes</p>
              </div>
            </div>
            
            <div class="flex items-center bg-white/10 backdrop-blur-sm p-3 rounded-lg">
              <span class="mr-3">⏱️</span>
              <div>
                <p class="font-semibold">${diasRestantes} días restantes</p>
                <p class="text-sm opacity-90">Para el inicio</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Cronograma -->
      <div class="bg-white shadow-md rounded-xl p-4">
        <h2 class="font-bold text-lg mb-2">📌 Cronograma del Evento</h2>
        <ul class="list-disc ml-6 space-y-1">
          <li>Inicio: ${hackathon.fecha} - 8:00 AM</li>
          <li>Mentorías: durante todo el evento</li>
          <li>Entrega proyectos: último día - 6:00 PM</li>
          <li>Resultados y premiación: último día - 8:00 PM</li>
        </ul>
      </div>

      <!-- Inscripción -->
      <div class="bg-white shadow-md rounded-xl p-4">
        <h2 class="font-bold text-lg mb-2">📝 Inscripción</h2>
        ${inscripcionesAbiertas ? `
          <div class="bg-green-50 border-l-4 border-green-500 p-4 mb-4">
            <p class="font-medium text-green-700">¡Inscripciones abiertas!</p>
            <p class="text-sm text-green-600">El hackathon comenzará en ${diasRestantes} días. ¡Inscríbete ahora!</p>
          </div>
          <form class="space-y-3">
            <input type="text" placeholder="Nombre del equipo" class="w-full border rounded-lg p-2" required />
            <input type="number" placeholder="Número de integrantes" class="w-full border rounded-lg p-2" min="1" max="4" required />
            <textarea placeholder="Idea de proyecto (opcional)" class="w-full border rounded-lg p-2" rows="3"></textarea>
            <button type="submit" class="w-full bg-green-600 hover:bg-green-700 text-white rounded-lg px-4 py-2 transition">
              Inscribirse ahora
            </button>
          </form>
        ` : `
          <div class="bg-blue-50 border-l-4 border-blue-500 p-4">
            <p class="font-medium text-blue-700">Inscripciones próximamente</p>
            <p class="text-sm text-blue-600">Las inscripciones se abrirán 5 días antes del evento. Faltan ${diasRestantes} días.</p>
          </div>
        `}
      </div>

      <!-- Premios -->
      <div class="bg-white shadow-md rounded-xl p-4">
        <h2 class="font-bold text-lg mb-2">🏆 Premios</h2>
        <ul class="space-y-1">
          <li>🥇 1er Lugar: $5,000,000 COP</li>
          <li>🥈 2do Lugar: $3,000,000 COP</li>
          <li>🥉 3er Lugar: $2,000,000 COP</li>
        </ul>
      </div>

      <!-- Reglas -->
      <div class="bg-white shadow-md rounded-xl p-4">
        <h2 class="font-bold text-lg mb-2">📖 Reglas y Requisitos</h2>
        <ul class="list-disc ml-6 space-y-1">
          <li>Máximo 4 integrantes por equipo.</li>
          <li>Entrega obligatoria antes del cierre.</li>
          <li>No se permiten proyectos previamente creados.</li>
          <li>Respetar el código de conducta.</li>
        </ul>
      </div>

    </section>
  `;
}