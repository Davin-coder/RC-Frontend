// src/routes/loginRoutes.js
import LoginView from "../views/loginView.js";
import { initLoginEvents } from "../controllers/loginControllers.js";

export default function loginRoute() {
  const app = document.getElementById("app");
  if (!app) return;

  app.innerHTML = LoginView();
  initLoginEvents();
}
