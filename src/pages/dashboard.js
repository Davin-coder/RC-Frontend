export default function Dashboard() {
  return `
    <section class="space-y-6">
      <div>
        <h1 class="text-2xl md:text-3xl font-bold">¡Hola, Alex! 👋</h1>
        <p class="text-gray-500">Bienvenido de vuelta a tu centro de control RIWI</p>
      </div>

      <!-- Tarjetas métricas -->
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div class="bg-white border rounded-xl p-5 shadow-sm">
          <div class="flex items-center justify-between">
            <p class="text-gray-500 font-medium">Retos Completados</p>
            <span class="text-purple-600">🟣</span>
          </div>
          <p class="text-3xl font-bold mt-3">12</p>
          <p class="text-xs text-gray-400 mt-1">Esta semana</p>
        </div>

        <div class="bg-white border rounded-xl p-5 shadow-sm">
          <div class="flex items-center justify-between">
            <p class="text-gray-500 font-medium">Puntuación XP</p>
            <span>⚡</span>
          </div>
          <p class="text-3xl font-bold mt-3">2,847</p>
          <p class="text-xs text-gray-400 mt-1">Total acumulado</p>
        </div>

        <div class="bg-white border rounded-xl p-5 shadow-sm">
          <div class="flex items-center justify-between">
            <p class="text-gray-500 font-medium">Posición</p>
            <span>⏳</span>
          </div>
          <p class="text-3xl font-bold mt-3">#7</p>
          <p class="text-xs text-gray-400 mt-1">En el leaderboard</p>
        </div>
      </div>

      <!-- Próximos Retos + Progreso semanal -->
      <div class="grid gap-4 lg:grid-cols-3">
        <div class="lg:col-span-2 bg-white border rounded-xl p-5 shadow-sm">
          <h3 class="font-semibold mb-4">Próximos Retos</h3>
          <div class="space-y-3">
            ${nextChallenge("Reto React: Componentes Funcionales","Frontend • Intermedio • Mañana","Comenzar")}
            ${nextChallenge("API REST con Node.js","Backend • Avanzado • 3 días","Continuar")}
            ${nextChallenge("Proyecto Final: E-commerce","Full-Stack • Experto • 1 semana","Comenzar")}
          </div>
        </div>

        <div class="bg-white border rounded-xl p-5 shadow-sm">
          <h3 class="font-semibold mb-2">Progreso Semanal</h3>
          <p class="text-sm text-gray-500 mb-4">Tu rendimiento en los últimos 7 días</p>

          <div class="mb-4">
            <div class="flex justify-between text-sm mb-1">
              <span>Retos Completados</span><span class="font-semibold text-purple-600">4/5</span>
            </div>
            <div class="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div class="h-full bg-purple-500" style="width: 80%"></div>
            </div>
          </div>

          <div class="flex justify-between text-sm">
            <span>Asistencia</span><span class="text-orange-500 font-semibold">95%</span>
          </div>
        </div>
      </div>
    </section>
  `;
}

function nextChallenge(title, meta, btn) {
  return `
    <div class="border rounded-lg p-4 flex items-center justify-between hover:bg-gray-50">
      <div>
        <p class="font-medium">${title}</p>
        <p class="text-xs text-gray-500 mt-1">${meta}</p>
      </div>
      <button class="px-3 py-2 rounded-lg bg-white border hover:bg-gray-100">
        ${btn} <span class="ml-1">➜</span>
      </button>
    </div>
  `;
}