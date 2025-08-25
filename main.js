import HomeView from "./src/pages/home.js";
import ChallengesView from "./src/pages/challenges.js";

const routes = {
  "/": HomeView,
  "/challenges": ChallengesView,
};

function router() {
  const path = window.location.pathname;
  const view = routes[path] || HomeView;
  document.getElementById("app").innerHTML = view();

  // Vuelve a enlazar los links con data-link
  document.querySelectorAll("[data-link]").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const href = link.getAttribute("href");
      history.pushState({}, "", href);
      router();
    });
  });
}

// Manejar la navegación con botones del navegador
window.addEventListener("popstate", router);

// Primera carga
router();