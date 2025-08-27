// src/pages/dashboard.js

function getCurrentRole() {
  return localStorage.getItem("role") || "coder"; 
}

export default function Dashboard() {
  const role = getCurrentRole();

  if (role === "team_leader" || role === "admin") {
    return TL_DashboardView();
  }

  return Student_DashboardView();
}

/* =======================
   Vista: Estudiante
   ======================= */
function Student_DashboardView() {
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

/* =======================
   Vista: Team Leader
   ======================= */
function TL_DashboardView() {
  return `
    <section class="space-y-6">
      <header class="mb-2">
        <h1 class="text-3xl font-bold tracking-tight">Panel de Administración</h1>
        <p class="text-gray-500">Gestiona estudiantes, retos y contenido del bootcamp</p>
      </header>

      <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        ${StatCard("Estudiantes Activos","124","+12% desde el mes pasado","👥")}
        ${StatCard("Retos Completados","1,847","+23% desde el mes pasado","🧩")}
        ${StatCard("Insignias Otorgadas","342","+8% desde el mes pasado","🏆")}
        ${StatCard("Tasa de Finalización","87%","+5% este mes","📈")}
      </div>
    </section>
  `;
}

/* =======================
   Helpers para TL
   ======================= */
function StatCard(title, value, sub, icon) {
  return `
    <div class="bg-white border rounded-xl p-5 shadow-sm">
      <div class="flex items-center justify-between mb-3">
        <p class="text-sm text-gray-500">${title}</p>
        <span class="text-xl">${icon || ""}</span>
      </div>
      <div class="text-3xl font-semibold">${value}</div>
      <p class="text-sm text-green-600 mt-1">${sub}</p>
    </div>
  `;
}

function nextChallenge(title, desc, action) {
  return `
    <div class="flex items-center justify-between border rounded-lg p-3 hover:bg-gray-50">
      <div>
        <p class="font-medium">${title}</p>
        <p class="text-sm text-gray-500">${desc}</p>
      </div>
      <button class="text-purple-600 font-medium text-sm">${action}</button>
    </div>
  `;
}
