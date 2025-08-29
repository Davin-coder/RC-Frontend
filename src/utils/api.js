// src/utils/api.js
const BASE_URL = "http://localhost:3000";

export const AuthAPI = {
  async login(email, password_user) {
    try {
      const res = await fetch(`${BASE_URL}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // cookies/sesiones
        body: JSON.stringify({ email, password_user }),
      });

      const data = await res.json().catch(() => ({}));
      console.log("siuuuuuuuuuuuuuuuu", data)

      if (!res.ok) {
        return { ok: false, msg: data?.msg || data?.message || `HTTP ${res.status}` };
      }

      if (data?.user) {
        // 👇 NO guardar aquí el user (lo hace login.js)
        return { ok: true, user: data.user, msg: data?.message || "Login exitoso" };
      }

      return { ok: false, msg: data?.msg || "Credenciales inválidas" };
    } catch (err) {
      console.error("AuthAPI.login error", err);
      return { ok: false, msg: "No se pudo conectar al servidor" };
    }
  },

  async logout() {
    try {
      await fetch(`${BASE_URL}/users/logout`, {
        method: "POST",
        credentials: "include",
      });
    } finally {
      // Lo limpiamos fuera (por ejemplo, en un handler onClick)
    }
  },
};

// (ejemplo) retos
export const ChallengesAPI = {
  async list() {
    const res = await fetch(`${BASE_URL}/challenges`, { credentials: "include" });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data?.msg || `HTTP ${res.status}`);
    return data.challenge || []; // <- tu backend envuelve así
  },
};

// --- GRUPOS ---
export const GroupsAPI = {
  async list() {
    const res = await fetch(`${BASE_URL}/groups`, { credentials: "include" });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data?.msg || `HTTP ${res.status}`);
    // tu backend suele devolver { groups: [...] }
    return data.groups || data || [];
  },

  // estos endpoints pueden variar en tu backend; déjalos así y luego ajustamos rutas/campos
  async create(payload) {
    const res = await fetch(`${BASE_URL}/groups`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(payload), // { name, description }
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data?.msg || `HTTP ${res.status}`);
    return data.group || data;
  },

  async update(id, payload) {
    const res = await fetch(`${BASE_URL}/groups/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(payload),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data?.msg || `HTTP ${res.status}`);
    return data.group || data;
  },

  async remove(id) {
    const res = await fetch(`${BASE_URL}/groups/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data?.msg || `HTTP ${res.status}`);
    return data;
  },

  // Opcionales: dependen de tu backend
  async addMember(id, email) {
    const res = await fetch(`${BASE_URL}/groups/${id}/members`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data?.msg || `HTTP ${res.status}`);
    return data;
  },

  async removeMember(id, userId) {
    const res = await fetch(`${BASE_URL}/groups/${id}/members/${userId}`, {
      method: "DELETE",
      credentials: "include",
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data?.msg || `HTTP ${res.status}`);
    return data;
  },
};



export const UsersAPI = {
  async update(id, payload) {
    // deja solo el endpoint que ya tengas; si falla, el front seguirá guardando localmente

    const res = await fetch(`${BASE_URL}/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(payload),
    }).catch(() => null);

    if (!res || !res.ok) {
      // fallback silencioso: el front seguirá funcionando con userStore
      return { ok: false };
    }
    return res.json().catch(() => ({ ok: true }));
  },

  // No-ops: NO llamar al backend para roles/skills
  async getRoles() { return []; },
  async getSkills() { return []; },
};

// --- LEADERBOARD ---

export const LeaderboardAPI = {
  async topCoders(limit = 5) {
    try {
      const res = await fetch(`${BASE_URL}/leaderboard/top?limit=${limit}`, {
        credentials: "include",
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.msg || `HTTP ${res.status}`);
      // Esperamos un array tipo: [{id_user, name, clan, xp_total, days_streak, initials?}]
      return Array.isArray(data?.coders) ? data.coders : data;
    } catch {
      // Fallback (mock) para no romper la vista si el endpoint no existe todavía
      return [
        { id_user: 2,  name: "Sofía Chen",      clan: "Code Warriors", xp_total: 3250, days_streak: 15 },
        { id_user: 1,  name: "Miguel Torres",   clan: "Dev Masters",   xp_total: 3100, days_streak: 12 },
        { id_user: 3,  name: "Isabella García", clan: "Tech Titans",   xp_total: 2980, days_streak: 18 },
        { id_user: 4,  name: "David Kim",       clan: "Byte Ninjas",   xp_total: 2890, days_streak: 9  },
        { id_user: 10, name: "Alex Rodríguez",  clan: "Los Debuggers", xp_total: 2450, days_streak: 11 },
      ];
    }
  },

  async topClans(limit = 3) {
    try {
      const res = await fetch(`${BASE_URL}/leaderboard/clans?limit=${limit}`, {
        credentials: "include",
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.msg || `HTTP ${res.status}`);
      // Esperamos: [{id_group, name, members_count, leader, xp_total}]
      return Array.isArray(data?.clans) ? data.clans : data;
    } catch {
      return [
        { id_group: 7,  name: "Code Warriors", members_count: 8,  leader: "Sofía Chen",    xp_total: 18500 },
        { id_group: 12, name: "Dev Masters",   members_count: 7,  leader: "Miguel Torres", xp_total: 16800 },
        { id_group: 5,  name: "Los Debuggers", members_count: 5,  leader: "Alex Rodríguez",xp_total: 9500  },
      ];
    }
  },
};

// --- PROJECTS (galería) ---

export const ProjectsAPI = {
  async list() {
    // Intentamos varias rutas comunes sin romper si alguna no existe:
    const candidates = [
      `${BASE_URL}/projects/submissions`,
      `${BASE_URL}/project_submissions`,
      `${BASE_URL}/gallery/projects`,
    ];
    for (const url of candidates) {
      try {
        const res = await fetch(url, { credentials: "include" });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) continue;
        const arr = Array.isArray(data?.projects) ? data.projects : (Array.isArray(data) ? data : []);
        return arr.map(normalizeSubmission);
      } catch { /* siguiente candidato */ }
    }
    // Fallback demo (si no hay endpoint activo)
    return FALLBACK_PROJECTS.map(normalizeSubmission);
  },
};

// Normaliza distintas formas de respuesta a un shape amigable al front
function normalizeSubmission(raw) {
  const s = raw || {};
  // IDs
  const id =
    s.id_project_submissions ?? s.id_submission ?? s.id ?? cryptoLike(s);

  // Template info (puede venir embebida o no)
  const tplTitle =
    s.template_title ??
    s.title ??
    s.project_title ??
    s.project_templates?.title ??
    "Proyecto sin título";

  const tplDesc =
    s.project_description ??
    s.template_description ??
    s.description ??
    s.project_templates?.project_description ??
    s.notes ??
    "";

  // URLs principales
  const repo = s.repo_url || s.repo || "";
  const demo = s.demo_url || s.demo || repo || "";

  // Screenshots: puede ser array de strings o array de objetos {url}
  const shotsRaw =
    s.screenshots ||
    s.images ||
    s.screens ||
    s.project_screenshots ||
    [];
  const screenshots = Array.isArray(shotsRaw)
    ? shotsRaw.map(x => (typeof x === "string" ? x : (x?.url || x?.src || ""))).filter(Boolean)
    : [];

  // Origen (user o group)
  const ownerType = s.id_user ? "user" : (s.id_group ? "group" : null);
  const ownerName =
    s.user_name ??
    s.group_name ??
    s.user?.name ??
    s.group?.name ??
    s.owner_name ??
    "";

  // Métricas (opcionales)
  const total =
    Number(s.total ?? s.score_total ?? s.hackathon_total ?? 0) || 0;
  const votes =
    Number(s.votes ?? s.votes_count ?? s.project_votes_count ?? 0) || 0;
  const comments =
    Number(s.comments ?? s.comments_count ?? s.project_comments_count ?? 0) || 0;

  return {
    id,
    title: tplTitle,
    description: tplDesc,
    demoUrl: demo,
    repoUrl: repo,
    screenshots,
    ownerType,
    ownerName,
    total,
    votes,
    comments,
  };
}

// Fallback local por si no hay endpoint (puedes borrar si no lo necesitas)
const FALLBACK_PROJECTS = [
  {
    id_project_submissions: 1,
    template_title: "E-commerce Minimal",
    project_description: "Carrito, catálogo y checkout simulado.",
    demo_url: "https://example.com/ecommerce",
    repo_url: "https://github.com/demo/ecommerce",
    screenshots: [
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop",
    ],
    votes: 12,
    total: 87.5,
    id_group: 10,
    group_name: "Code Warriors",
  },
  {
    id_project_submissions: 2,
    template_title: "Chat en Tiempo Real",
    project_description: "Socket.io, salas y estado de conexión.",
    demo_url: "https://example.com/chat",
    repo_url: "https://github.com/demo/chat",
    screenshots: [
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200&auto=format&fit=crop",
    ],
    votes: 8,
    total: 92.0,
    id_user: 7,
    user_name: "Sofía Chen",
  },
  {
    id_project_submissions: 3,
    template_title: "Dashboard Analytics",
    project_description: "Gráficas, filtros y guardado de vistas.",
    demo_url: "https://example.com/analytics",
    repo_url: "https://github.com/demo/analytics",
    screenshots: [
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=1200&auto=format&fit=crop",
    ],
    votes: 4,
    total: 79.0,
    id_user: 5,
    user_name: "Alex Rodríguez",
  },
];

function cryptoLike(x) {
  // ID de respaldo por si no viene uno (evita colisiones en UI)
  try { return ("id_" + JSON.stringify(x).length + "_" + Math.random().toString(36).slice(2,8)); }
  catch { return "id_" + Math.random().toString(36).slice(2,8); }
}

// --- HACKATHONS (extensión) ---
export const HackathonsAPI = {
  async list() {
    try {
      const res = await fetch(`${BASE_URL}/hackathons`, { credentials: "include" });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.msg || `HTTP ${res.status}`);
      const arr = Array.isArray(data?.hackathons) ? data.hackathons : (Array.isArray(data) ? data : []);
      return arr.map(normalizeHackathon);
    } catch {
      return HACKATHONS_FALLBACK.map(normalizeHackathon);
    }
  },

  async getById(id) {
    // intenta /hackathons/:id y si no existe, cae al list() y busca en memoria
    try {
      const res = await fetch(`${BASE_URL}/hackathons/${encodeURIComponent(id)}`, { credentials: "include" });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.msg || `HTTP ${res.status}`);
      return normalizeHackathon(data?.hackathon || data);
    } catch {
      const list = await this.list();
      return list.find(h => (String(h.id) === String(id))) || null;
    }
  },
};

// ====== helpers que ya usábamos ======
function normalizeHackathon(h) {
  const id = h.id_hackathon ?? h.id ?? cryptoId(h);
  const title = h.h_title ?? h.title ?? h.titulo ?? "Sin título";
  const desc = h.h_desc ?? h.desc ?? h.descripcion ?? "";
  // fecha: DB (DATE) -> ISO; mock trae "fechaInicio" o "fecha"
  const dateRaw = h.h_date ?? h.date ?? h.fecha ?? null;
  const startDate =
    h.fechaInicio ? new Date(h.fechaInicio) :
    dateRaw        ? new Date(dateRaw)    : null;

  // status: DB h_status (upcoming|ongoing|finished); si no, calcular
  let status = h.h_status ?? h.status ?? null;
  const diasRestantes = startDate ? daysUntil(startDate) : null;
  if (!status) status = computeStatus(diasRestantes);

  return {
    id,
    title,
    desc,
    date: startDate ? startDate.toISOString() : null,
    status,          // 'upcoming' | 'ongoing' | 'finished'
    diasRestantes,   // número o null
    // extras que a veces vienen en mock
    location: h.lugar ?? h.location ?? "",
    participants: h.participantes ?? h.participants ?? "",
    prize: h.premio ?? h.prize ?? "",
    category: h.categoria ?? h.category ?? "",
  };
}

function daysUntil(dateObj) {
  const hoy = new Date();
  const d0 = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate());
  const d1 = new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate());
  const diff = Math.ceil((d1 - d0) / (1000 * 60 * 60 * 24));
  return diff >= 0 ? diff : 0;
}
function computeStatus(d) {
  if (d === null || d === undefined) return "upcoming";
  if (d === 0) return "ongoing";
  return d > 0 ? "upcoming" : "finished";
}
function cryptoId(x) {
  try { return "h_" + JSON.stringify(x).length + "_" + Math.random().toString(36).slice(2, 8); }
  catch { return "h_" + Math.random().toString(36).slice(2, 8); }
}

// Fallback corto (puedes dejar el que ya tenías si prefieres)
const HACKATHONS_FALLBACK = [
  { id: "riwi2025", title: "RIWI HACKATHON 2025", date: "2025-09-01", location: "Campus RIWI, Medellín", prize: "$10,000,000 COP" },
  { id: "ai2025",   title: "AI CHALLENGE 2025",   date: "2025-09-25", location: "Virtual + Presencial",   prize: "$15,000,000 COP" },
  { id: "cyber2026",title: "CYBERSECURITY 2026",  date: "2026-04-10", location: "Campus RIWI, Bogotá",     prize: "$12,000,000 COP" },
];
