export default function Leaderboard() {
  return `
    <section class="space-y-6">
      <h1 class="text-2xl md:text-3xl font-bold">Leaderboard</h1>
      <p class="text-gray-500">Compite con los mejores desarrolladores de RIWI</p>

      <!-- Top 3 -->
      <div class="bg-white border rounded-xl p-6 shadow-sm">
        <h3 class="font-semibold mb-4">🏅 Top 3 Estudiantes</h3>
        <div class="grid gap-6 md:grid-cols-3 items-end">
          ${podium("Miguel Torres","MT","3100 XP","silver")}
          ${podium("Sofia Chen","SC","3250 XP","gold", true)}
          ${podium("Isabella García","IG","2980 XP","amber")}
        </div>
      </div>

      <div class="grid gap-6 lg:grid-cols-3">
        <!-- Ranking individual -->
        <div class="bg-white border rounded-xl p-5 shadow-sm lg:col-span-2">
          <h3 class="font-semibold mb-4">Ranking Individual</h3>
          <div class="space-y-3">
            ${rankRow(1,"Sofia Chen","Code Warriors","3250 XP","15 días")}
            ${rankRow(2,"Miguel Torres","Dev Masters","3100 XP","12 días")}
            ${rankRow(3,"Isabella García","Tech Titans","2980 XP","18 días")}
            ${rankRow(4,"David Kim","Byte Ninjas","2890 XP","9 días")}
            ${rankRow(5,"Alex Rodríguez","Los Debuggers","2450 XP","11 días")}
          </div>
        </div>

        <!-- Top Clanes -->
        <div class="bg-white border rounded-xl p-5 shadow-sm">
          <h3 class="font-semibold mb-4">Top Clanes</h3>
          <div class="space-y-3">
            ${clanRow(1,"Code Warriors","8 miembros","Líder: Sofía Chen","18500 XP")}
            ${clanRow(2,"Dev Masters","7 miembros","Líder: Miguel Torres","16800 XP")}
            ${clanRow(3,"Los Debuggers","5 miembros","Líder: Alex Rodríguez","9500 XP", true)}
          </div>
        </div>
      </div>
    </section>
  `;
}

function podium(name, initials, xp, color="gray", crown=false){
  const map = { gold:"bg-yellow-300", silver:"bg-gray-300", amber:"bg-amber-300", gray:"bg-gray-300" };
  return `
    <div class="flex flex-col items-center">
      <div class="h-24 w-24 md:h-28 md:w-28 rounded-full ${map[color]} grid place-content-center text-xl font-semibold shadow">
        ${initials}
      </div>
      <p class="mt-3 font-semibold">${name} ${crown ? "👑" : ""}</p>
      <p class="text-sm text-gray-500">${xp}</p>
    </div>
  `;
}

function rankRow(pos, name, clan, xp, days){
  return `
    <div class="flex items-center justify-between border rounded-lg p-3">
      <div class="flex items-center gap-3">
        <span class="h-7 w-7 grid place-content-center rounded bg-gray-100 text-sm font-semibold">${pos}</span>
        <div>
          <p class="font-medium">${name}</p>
          <p class="text-xs text-gray-500">${clan}</p>
        </div>
      </div>
      <div class="text-right">
        <p class="font-semibold">${xp}</p>
        <p class="text-xs text-gray-400">${days}</p>
      </div>
    </div>
  `;
}

function clanRow(pos, name, members, leader, xp, highlight=false){
  return `
    <div class="flex items-center justify-between border rounded-lg p-3 ${highlight ? "bg-purple-50 border-purple-200" : ""}">
      <div class="flex items-center gap-3 min-w-0">
        <span class="h-7 w-7 grid place-content-center rounded bg-gray-100 text-sm font-semibold">${pos}</span>
        <div class="truncate">
          <p class="font-medium truncate">${name}</p>
          <p class="text-xs text-gray-500 truncate">${members} · ${leader}</p>
        </div>
      </div>
      <span class="px-2 py-1 rounded bg-gray-100 text-gray-700 text-sm">${xp}</span>
    </div>
  `;
}
