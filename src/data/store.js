// src/data/store.js
const KEY = "rc_store_v1";

const defaultState = {
    coders: [
        { id: "c1", name: "Ana", email: "ana@riwi.co", clanId: "cl1", badges: [] },
        { id: "c2", name: "Luis", email: "luis@riwi.co", clanId: "cl2", badges: [] },
    ],
    clans: [
        { id: "cl1", name: "Frontend Ninjas", createdBy: "c1" },
        { id: "cl2", name: "Backend Wizards", createdBy: "c2" },
    ],
    hackathons: [
        { id: "h1", name: "RIWI Hack 1", start: "2025-09-01", end: "2025-09-03" },
    ],
    retos: [
        { id: "r1", title: "Responsive Cards", difficulty: "Easy" },
    ],
    badgesCatalog: ["MVP", "Bug Slayer", "UI Pro", "Team Spirit"],
};

function load() {
    try {
        return JSON.parse(localStorage.getItem(KEY)) || defaultState;
    } catch {
        return defaultState;
    }
}
function save(state) {
    localStorage.setItem(KEY, JSON.stringify(state));
}

export const Store = {
    get() { return load(); },
    set(next) { save(next); },

    // helpers CRUD genéricos
    add(list, item) {
        const s = load();
        s[list].push(item);
        save(s);
    },
    update(list, id, patch) {
        const s = load();
        s[list] = s[list].map(x => x.id === id ? { ...x, ...patch } : x);
        save(s);
    },
    remove(list, id) {
        const s = load();
        s[list] = s[list].filter(x => x.id !== id);
        save(s);
    },
    grantBadge(coderId, badge) {
        const s = load();
        s.coders = s.coders.map(c =>
            c.id === coderId ? { ...c, badges: Array.from(new Set([...(c.badges || []), badge])) } : c
        );
        save(s);
    }
};
