// hackatonList.js
export const hackathons = [
  {
    id: "riwi2025",
    titulo: "RIWI HACKATHON 2025",
    categoria: "Innovación y Tecnología",
    fecha: "1-2 septiembre 2025",
    fechaInicio: new Date(2025, 8, 1), // Septiembre es el mes 8 (0-11)
    lugar: "Campus RIWI, Medellín",
    participantes: "120+ participantes",
    premio: "$10,000,000 COP en premios"
  },
  {
    id: "ai2025",
    titulo: "AI CHALLENGE 2025",
    categoria: "Inteligencia Artificial",
    fecha: "25-26 septiembre 2025",
    fechaInicio: new Date(2025, 8, 25), // Septiembre es el mes 8
    lugar: "Virtual + Presencial",
    participantes: "200+ participantes",
    premio: "$15,000,000 COP en premios"
  },
  {
    id: "cyber2025",
    titulo: "CYBERSECURITY CHALLENGE 2026",
    categoria: "Ciberseguridad",
    fecha: "10-12 abril 2026",
    fechaInicio: new Date(2026, 3, 10), // Abril es el mes 3
    lugar: "Campus RIWI, Bogotá",
    participantes: "150+ participantes",
    premio: "$12,000,000 COP en premios"
  },
  {
    id: "data2025",
    titulo: "DATA SCIENCE HACK 2026",
    categoria: "Ciencia de Datos",
    fecha: "5-7 Junio 2026",
    fechaInicio: new Date(2026, 5, 5), // Junio es el mes 5
    lugar: "Virtual",
    participantes: "300+ participantes",
    premio: "$8,000,000 COP en premios"
  },
  {
    id: "blockchain2026",
    titulo: "BLOCKCHAIN CHALLENGE 2026",
    categoria: "Blockchain",
    fecha: "20-22 Julio 2026",
    fechaInicio: new Date(2026, 6, 20), // Julio es el mes 6
    lugar: "Campus RIWI, Medellín",
    participantes: "180+ participantes",
    premio: "$20,000,000 COP en premios"
  },
  {
    id: "game2025",
    titulo: "GAME JAM 2026",
    categoria: "Desarrollo de Videojuegos",
    fecha: "1-3 Agosto 2026",
    fechaInicio: new Date(2026, 7, 1), // Agosto es el mes 7
    lugar: "Virtual",
    participantes: "250+ participantes",
    premio: "$7,000,000 COP en premios"
  }
];

// Función para calcular días restantes (CORREGIDA)
function calcularDiasRestantes(fechaInicio) {
  const hoy = new Date();
  
  // Resetear ambas fechas a medianoche para comparar solo días completos
  const hoyReset = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate());
  const fechaInicioReset = new Date(fechaInicio.getFullYear(), fechaInicio.getMonth(), fechaInicio.getDate());
  
  const diffTime = fechaInicioReset - hoyReset;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays >= 0 ? diffDays : 0;
}

// Función para determinar el estado basado en días restantes
function determinarEstado(diasRestantes) {
  if (diasRestantes === 0) return "activo";
  if (diasRestantes <= 5) return `en-${diasRestantes}-dias`;
  return "proximamente";
}

// Actualizar estados basados en fecha actual
hackathons.forEach(hackathon => {
  const diasRestantes = calcularDiasRestantes(hackathon.fechaInicio);
  hackathon.diasRestantes = diasRestantes;
  hackathon.estado = determinarEstado(diasRestantes);
  hackathon.inscripcionesAbiertas = diasRestantes <= 5; // Inscripciones abiertas 5 días antes
});

// Función de depuración para verificar fechas (puedes eliminarla después)
console.log("=== DEPURACIÓN DE FECHAS ===");
hackathons.forEach(h => {
  console.log(`${h.titulo}: ${h.fechaInicio.toDateString()}, Días restantes: ${h.diasRestantes}, Estado: ${h.estado}`);
});

export default function HackathonList() {
  return `
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      ${hackathons.map(h => {
        let estadoBadge = '';
        
        if (h.estado === 'activo') {
          estadoBadge = `<span class="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded absolute top-3 right-3">Activo</span>`;
        } else if (h.estado.startsWith('en-')) {
          const dias = h.estado.split('-')[1];
          estadoBadge = `<span class="bg-orange-100 text-orange-800 text-xs font-medium px-2.5 py-0.5 rounded absolute top-3 right-3">En ${dias} días</span>`;
        } else {
          estadoBadge = `<span class="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded absolute top-3 right-3">Próximamente</span>`;
        }
        
        return `
        <div class="bg-white shadow-md rounded-xl p-4 relative hover:shadow-lg transition-shadow">
          ${estadoBadge}
          <h2 class="text-xl font-bold mt-2">${h.titulo}</h2>
          <p class="text-indigo-500 font-semibold">${h.categoria}</p>
          <div class="my-3 border-t"></div>
          <p class="text-gray-600">📅 ${h.fecha}</p>
          <p class="text-gray-600">📍 ${h.lugar}</p>
          <p class="text-gray-600">👥 ${h.participantes}</p>
          <p class="font-bold text-purple-700 mt-2">${h.premio}</p>
          <button onclick="window.location.hash = '#/HackathonDetail/${h.id}'"
            class="mt-4 w-full bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition">
            Saber más
          </button>
        </div>
      `}).join("")}
    </div>
  `;
}