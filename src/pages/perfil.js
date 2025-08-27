// src/pages/perfil.js

function getCurrentRole() {
  return localStorage.getItem("role") || "coder"; 
}

export default function Perfil() {
  const role = getCurrentRole();
  return (role === "team_leader" || role === "admin")
    ? TL_AnalyticsView()
    : Student_ProfileView();
}

/* =========
   Vista Estudiante: Perfil
   ========= */
function Student_ProfileView() {
  return `
    <section class="space-y-6">
      <h1 class="text-2xl md:text-3xl font-bold">Mi Perfil</h1>
      <p class="text-gray-500">Gestiona tu información personal y progreso</p>

      <div class="grid gap-6 lg:grid-cols-3">
        <!-- Resumen -->
        <div class="bg-white border rounded-xl p-5 shadow-sm">
          <div class="flex flex-col items-center text-center">
            <div class="h-20 w-20 rounded-full bg-purple-100 text-purple-700 grid place-content-center text-2xl font-bold">AX</div>
            <h3 class="mt-3 text-lg font-semibold">Alex Rodríguez</h3>
            <p class="text-sm text-gray-500">Desarrollador Full Stack</p>
          </div>

          <div class="mt-5 grid gap-3">
            ${row("Nivel","Nivel 12")}
            ${row("XP Total","2,450 XP")}
            ${row("Ranking","#15")}
            ${row("Clan","Los Debuggers")}
          </div>

          <div class="mt-5 space-y-2">
            <button class="w-full border rounded-lg py-2 hover:bg-gray-50"> GitHub</button>
            <button class="w-full border rounded-lg py-2 hover:bg-gray-50">in LinkedIn</button>
          </div>
        </div>

        <!-- Formulario -->
        <div class="bg-white border rounded-xl p-5 shadow-sm lg:col-span-2">
          <h3 class="font-semibold mb-4">Editar Perfil</h3>
          <form class="grid gap-4 md:grid-cols-2">
            ${input("Nombre","Alex")}
            ${input("Apellido","Rodríguez")}
            ${input("Email","alex.rodriguez@email.com","email")}
            ${input("Ubicación","Medellín, Colombia")}
            <div class="md:col-span-2">
              <label class="text-sm text-gray-600">Biografía</label>
              <textarea class="w-full mt-1 rounded-lg border border-gray-200 p-2 focus:ring-2 focus:ring-purple-500" rows="4">Desarrollador apasionado por crear soluciones innovadoras...</textarea>
            </div>
            <div class="md:col-span-2">
              <button type="button" class="w-full md:w-auto px-5 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700">Guardar Cambios</button>
            </div>
          </form>
        </div>
      </div>

      <!-- Habilidades y Logros -->
      <div class="grid gap-6 lg:grid-cols-3">
        <div class="bg-white border rounded-xl p-5 shadow-sm lg:col-span-2">
          <h3 class="font-semibold mb-4">Habilidades</h3>
          ${skill("JavaScript", 85)}
          ${skill("React", 78)}
          ${skill("Node.js", 65)}
        </div>

        <div class="bg-white border rounded-xl p-5 shadow-sm">
          <h3 class="font-semibold mb-4">Logros</h3>
          ${achievement("Primer Reto Completado","Completaste tu primer desafío")}
          ${achievement("Racha de 7 días","7 días consecutivos programando")}
          ${achievement("Top 10 Semanal","Entraste al top 10 esta semana")}
        </div>
      </div>
    </section>
  `;
}

/* =========
   Vista Team Leader: Analíticas
   ========= */
function TL_AnalyticsView() {
  return `
    <section class="space-y-6">
      <h1 class="text-2xl md:text-3xl font-bold">Analíticas</h1>
      <p class="text-gray-500">Monitorea el rendimiento general de estudiantes y clanes</p>

      <!-- Cards métricas -->
      <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        ${statCard("Estudiantes Activos","124","+12% desde el mes pasado")}
        ${statCard("Retos Completados","1,847","+23% desde el mes pasado")}
        ${statCard("Insignias Otorgadas","342","+8% desde el mes pasado")}
        ${statCard("Tasa de Finalización","87%","+5% este mes")}
      </div>

      <!-- Secciones de gráficas -->
      <div class="grid gap-6 lg:grid-cols-2">
        <div class="bg-white border rounded-xl p-5 shadow-sm">
          <h3 class="font-semibold mb-4">Retos por Módulo</h3>
          <div class="h-48 grid place-content-center text-gray-400">📊 Aquí iría la gráfica</div>
        </div>
        <div class="bg-white border rounded-xl p-5 shadow-sm">
          <h3 class="font-semibold mb-4">Actividad Semanal</h3>
          <div class="h-48 grid place-content-center text-gray-400">📈 Aquí iría la gráfica</div>
        </div>
      </div>
    </section>
  `;
}

/* =========
   Helpers
   ========= */
function row(label,value){ 
  return `
    <div class="flex items-center justify-between border rounded-lg px-3 py-2">
      <span class="text-gray-600">${label}</span><span class="font-semibold">${value}</span>
    </div>`;
}

function input(label, value="", type="text"){ 
  return `
    <div>
      <label class="text-sm text-gray-600">${label}</label>
      <input type="${type}" value="${value}" class="w-full mt-1 rounded-lg border border-gray-200 p-2 focus:ring-2 focus:ring-purple-500"/>
    </div>`;
}

function skill(name, percent){
  return `
    <div class="mb-4">
      <div class="flex justify-between text-sm mb-1"><span>${name}</span><span>${percent}%</span></div>
      <div class="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div class="h-full bg-purple-500" style="width:${percent}%"></div>
      </div>
    </div>`;
}

function achievement(title, desc){
  return `
    <div class="flex items-start gap-3 border rounded-lg p-3 mb-3">
      <div class="text-yellow-500 text-xl">🏅</div>
      <div>
        <p class="font-medium">${title}</p>
        <p class="text-sm text-gray-500">${desc}</p>
      </div>
    </div>`;
}

function statCard(title,value,sub){
  return `
    <div class="bg-white border rounded-xl p-5 shadow-sm">
      <p class="text-sm text-gray-500">${title}</p>
      <p class="text-2xl font-bold mt-2">${value}</p>
      <p class="text-xs text-green-600 mt-1">${sub}</p>
    </div>`;
}
