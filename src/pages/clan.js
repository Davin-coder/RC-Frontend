export default function Clan() {
  return `
    <section class="space-y-6">
      <h1 class="text-2xl md:text-3xl font-bold">Mi Clan</h1>
      <p class="text-gray-500">Colabora con tu equipo y conquisten retos</p>

      <div class="grid gap-6 lg:grid-cols-3">
        <!-- Tarjeta Clan -->
        <div class="bg-white border rounded-xl p-5 shadow-sm lg:col-span-1">
          <div class="flex items-center gap-3">
            <div class="h-12 w-12 rounded-xl bg-purple-100 text-purple-700 grid place-content-center text-2xl">👑</div>
            <div>
              <p class="font-semibold">Los Debuggers <span class="ml-1">👑</span></p>
              <p class="text-sm text-gray-500">Clan Nivel 15</p>
            </div>
          </div>

          <div class="mt-5 grid gap-3">
            ${row("XP Total","9,500 XP")}
            ${row("Ranking","#3")}
            ${row("Miembros","5/8")}
          </div>

          <div class="mt-5">
            <button class="w-full border rounded-lg py-2 hover:bg-gray-50">💬 Chat del Clan</button>
          </div>
        </div>

        <!-- Miembros -->
        <div class="bg-white border rounded-xl p-5 shadow-sm lg:col-span-2">
          <h3 class="font-semibold mb-4">Miembros del Clan</h3>
          <div class="space-y-3">
            ${member("Alex Rodríguez","Líder","https://i.pravatar.cc/100?img=15","2450 XP", true)}
            ${member("María González","Co-líder","https://i.pravatar.cc/100?img=5","2200 XP")}
            ${member("Carlos Pérez","Miembro","https://i.pravatar.cc/100?img=8","1800 XP")}
            ${member("Ana López","Miembro","https://i.pravatar.cc/100?img=21","1650 XP")}
            ${member("Diego Martín","Miembro","https://i.pravatar.cc/100?img=40","1400 XP")}
          </div>
        </div>
      </div>

      <!-- Desafíos del clan -->
      <div class="bg-white border rounded-xl p-5 shadow-sm">
        <h3 class="font-semibold mb-4">Desafíos del Clan</h3>
        <div class="grid gap-6 md:grid-cols-3">
          ${challenge("Desafío Grupal: API REST","Intermedio","500 XP","3 días")}
          ${challenge("Hackathon Interno","Avanzado","1000 XP","1 semana")}
          ${challenge("Code Review Challenge","Principiante","200 XP","2 días")}
        </div>
      </div>
    </section>
  `;
}

function row(label, value){
  return `<div class="flex items-center justify-between border rounded-lg px-3 py-2">
    <span class="text-gray-600">${label}</span>
    <span class="font-semibold">${value}</span>
  </div>`;
}
function member(name, role, img, xp, crown=false){
  return `
    <div class="flex items-center justify-between border rounded-lg p-3">
      <div class="flex items-center gap-3">
        <div class="relative h-10 w-10 rounded-full overflow-hidden">
          <img src="${img}" class="h-full w-full object-cover" />
          <span class="absolute -bottom-1 -right-1 h-3 w-3 bg-green-500 rounded-full border-2 border-white"></span>
        </div>
        <div>
          <p class="font-medium">${name} ${crown ? "👑" : ""}</p>
          <p class="text-xs text-gray-500">${role}</p>
        </div>
      </div>
      <span class="text-sm text-gray-600">${xp}</span>
    </div>
  `;
}
function challenge(title, level, reward, time){
  const color = level === "Intermedio" ? "yellow" : level === "Avanzado" ? "orange" : "green";
  return `
    <div class="border rounded-xl p-4 hover:bg-gray-50">
      <p class="font-semibold">${title}</p>
      <div class="flex items-center gap-2 mt-2 text-xs">
        <span class="px-2 py-0.5 rounded bg-${color}-100 text-${color}-700">${level}</span>
        <span class="px-2 py-0.5 rounded bg-purple-100 text-purple-700">${reward}</span>
        <span class="px-2 py-0.5 rounded bg-gray-100 text-gray-700">${time}</span>
      </div>
      <button class="mt-3 w-full border rounded-lg py-2 hover:bg-gray-100">Unirse</button>
    </div>
  `;
}
