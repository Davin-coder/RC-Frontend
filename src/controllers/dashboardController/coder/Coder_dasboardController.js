import { Coder_dashboardView } from "../../../views/dashboardView/coder/Coder_dashboardView.js";
import { caribbeanPhrases } from "../../../utils/phrases.js";

export function Coder_dasboardController() {
  cd_dasboardController.challenges();
  cd_dasboardController.quotes();
};

const cd_dasboardController = {

  //////CHALLENGES SUMMARY//////
  challenges: async function() {
    console.log("Challenges summary loaded from CODERRRRR_dashboardController.js");
  },

  ////// QUOTES //////
  quotes: function() {
    const quoteEl = document.getElementById("costa-quote");
    const metaEl = document.getElementById("costa-quote-meta");
    const btn = document.getElementById("refresh-quote");

    if (!quoteEl) return;

    function showRandomQuote() {
      const randomIndex = Math.floor(Math.random() * caribbeanPhrases.length);
      const phrase = caribbeanPhrases[randomIndex];
      quoteEl.textContent = phrase;
      metaEl.textContent = `Frase #${randomIndex + 1}`;
    }

    // mostrar al cargar
    showRandomQuote();

    // cambiar cuando se hace click
    btn?.addEventListener("click", showRandomQuote);
  },

  mentoring: async function() {
    console.log("Mentoring summary loaded from CODERRRRR_dashboardController.js");
  }
};
