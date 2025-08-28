// src/pages/retos.js

function getCurrentRole() {
  return localStorage.getItem("role") || "coder"; // "coder" | "team_leader" | "admin"
}

export default function Retos() {
  const role = getCurrentRole();
  return (role === "team_leader" || role === "admin")
    ? TL_RetosView()
    : Student_RetosView();
}

/* =========
   Estudiante: Mis Retos
   ========= */
function Student_RetosView() {
  return `
    <section class="space-y-6">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl md:text-3xl font-bold">Mis Retos</h1>
          <p class="text-gray-500">Explora y completa desafíos para mejorar tus habilidades</p>
        </div>
      </div>

      <!-- Buscador -->
      <div class="grid gap-4 md:grid-cols-2">
        <div class="relative">
          <input class="w-full rounded-lg border border-gray-200 pl-10 pr-4 py-2 focus:ring-2 focus:ring-purple-500"
                placeholder="Buscar retos..."/>
          <span class="absolute left-3 top-2.5 text-gray-400">🔎</span>
        </div>
        <div class="flex flex-wrap items-center gap-2">
          ${chip("Todos", true)} ${chip("Frontend")}
          ${chip("Backend")} ${chip("Full-Stack")}
          ${chip("Base de Datos")} ${chip("Algoritmos")}
        </div>
      </div>

      <!-- Dificultad -->
      <div class="flex items-center gap-3">
        <span class="text-sm font-medium text-gray-600">Dificultad:</span>
        ${level("Básico","green-100","green-600")}
        ${level("Intermedio","yellow-100","yellow-700")}
        ${level("Avanzado","orange-100","orange-700")}
        ${level("Experto","red-100","red-700")}
      </div>

      <!-- Grid de retos -->
      <div class="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        ${cardReto({
          title:"Calculadora React",
          desc:"Construye una calculadora funcional...",
          badges:["Frontend","Intermedio"],
          meta:"2-3 horas · 45",
          stack:["React","JavaScript","CSS"],
          xp:"150 XP",
          rating:"4.8",
          cta:"Comenzar"
        })}
        ${cardReto({
          title:"API REST de Tareas",
          desc:"Desarrolla una API completa con autenticación...",
          badges:["Backend","Avanzado"],
          meta:"4-5 horas · 32",
          stack:["Node.js","Express","MongoDB"],
          xp:"250 XP",
          rating:"4.9",
          cta:"Completar"
        })}
        ${cardReto({
          title:"Landing Page Responsiva",
          desc:"Crea una landing page moderna y responsiva.",
          badges:["Frontend","Básico"],
          meta:"1-2 horas · 78",
          stack:["HTML","CSS","JavaScript"],
          xp:"100 XP",
          rating:"4.6",
          cta:"En Progreso"
        })}
        ${cardReto({
          title:"E-commerce Full-Stack",
          desc:"Carrito y pagos integrados.",
          badges:["Full-Stack","Experto"],
          meta:"8-10 horas · 18",
          stack:["React","Node.js","PostgreSQL","Stripe"],
          xp:"500 XP",
          rating:"4.9",
          cta:"Comenzar"
        })}
        ${cardReto({
          title:"Algoritmo de Ordenamiento",
          desc:"Implementa y optimiza algoritmos.",
          badges:["Algoritmos","Intermedio"],
          meta:"1-2 horas · 56",
          stack:["JavaScript","Python","Algoritmos"],
          xp:"120 XP",
          rating:"4.7",
          cta:"Comenzar"
        })}
        ${cardReto({
          title:"Chat en Tiempo Real",
          desc:"Socket.io y WebSockets.",
          badges:["Full-Stack","Avanzado"],
          meta:"3-4 horas · 29",
          stack:["Socket.io","React","Node.js"],
          xp:"300 XP",
          rating:"4.8",
          cta:"Comenzar"
        })}
      </div>
    </section>
  `;
}

/* =========
   Team Leader: Gestión de Retos
   ========= */
function TL_RetosView() {
  const retos = [
    { titulo:"Landing Page Responsiva", modulo:"Frontend", dificultad:"Principiante", xp:"100 XP", entregas:45, completados:38 },
    { titulo:"API REST con Node + Express", modulo:"Backend", dificultad:"Intermedio", xp:"200 XP", entregas:32, completados:24 },
    { titulo:"Sistema de Autenticación JWT", modulo:"Fullstack", dificultad:"Avanzado", xp:"300 XP", entregas:18, completados:12 },
  ];

  return `
    <section class="space-y-6">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl md:text-3xl font-bold">Gestión de Retos</h1>
          <p class="text-gray-500">Crea, edita y administra los retos del bootcamp</p>
        </div>
        <button class="px-3 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700">+ Crear Reto</button>
      </div>

      <div class="grid gap-2 md:grid-cols-3">
        <input class="border rounded-lg px-3 py-2" placeholder="Buscar retos..."/>
        <select class="border rounded-lg px-3 py-2"><option>Todos los módulos</option><option>Frontend</option><option>Backend</option><option>Fullstack</option></select>
        <select class="border rounded-lg px-3 py-2"><option>Todas las dificultades</option><option>Principiante</option><option>Intermedio</option><option>Avanzado</option></select>
      </div>

      <div class="rounded-xl border overflow-hidden bg-white">
        <table class="w-full text-sm">
          <thead class="bg-gray-50 text-gray-600">
            <tr>
              <th class="text-left px-4 py-2">Título</th>
              <th class="text-left px-4 py-2">Módulo</th>
              <th class="text-left px-4 py-2">Dificultad</th>
              <th class="text-left px-4 py-2">XP</th>
              <th class="text-left px-4 py-2">Entregas</th>
              <th class="text-left px-4 py-2">Completados</th>
              <th class="px-4 py-2"></th>
            </tr>
          </thead>
          <tbody>
            ${retos.map(r => `
              <tr class="border-t">
                <td class="px-4 py-2">${r.titulo}</td>
                <td class="px-4 py-2">${r.modulo}</td>
                <td class="px-4 py-2">${r.dificultad}</td>
                <td class="px-4 py-2">${r.xp}</td>
                <td class="px-4 py-2">${r.entregas}</td>
                <td class="px-4 py-2">${r.completados}</td>
                <td class="px-4 py-2">
                  <div class="flex gap-2">
                    <button class="px-2 py-1 text-xs rounded border">Editar</button>
                    <button class="px-2 py-1 text-xs rounded bg-red-100 text-red-700">Eliminar</button>
                  </div>
                </td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </section>
  `;
}

/* =========
   Helpers reutilizados
   ========= */
function chip(text, active=false){
  return `<span class="text-sm px-3 py-1 rounded-full border ${active ? "bg-purple-100 text-purple-700 border-purple-200" : "bg-white text-gray-700 hover:bg-gray-50"}">${text}</span>`;
}
function level(text,bg,fg){
  return `<span class="text-xs px-2.5 py-1 rounded-full bg-${bg} text-${fg} border border-gray-200">${text}</span>`;
}
function badge(text){
  return `<span class="text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-700">${text}</span>`;
}
function tag(text){
  return `<span class="text-xs px-2 py-1 rounded bg-orange-100 text-orange-700">${text}</span>`;
}
function cardReto({title,desc,badges,meta,stack,xp,rating,cta}){
  return `
    <article class="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition">
      <div class="flex items-start justify-between">
        <h3 class="text-lg font-semibold">${title}</h3>
        <button class="text-gray-400 hover:text-gray-600">⋯</button>
      </div>
      <p class="text-gray-600 mt-1">${desc}</p>
      <div class="flex gap-2 mt-2">
        ${badges.map(badge).join("")}
      </div>

      <div class="flex items-center gap-4 text-sm text-gray-500 mt-3">
        <span>⏱️ ${meta.split("·")[0].trim()}</span>
        <span>👥 ${meta.split("·")[1].trim()}</span>
        <span>⭐ ${rating}</span>
      </div>

      <div class="flex flex-wrap gap-2 mt-3">
        ${stack.map(tag).join("")}
      </div>

      <div class="flex items-center justify-between mt-4">
        <span class="text-purple-700 font-semibold">${xp}</span>
        <button class="px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700">${cta}</button>
      </div>
    </article>
  `;
}
