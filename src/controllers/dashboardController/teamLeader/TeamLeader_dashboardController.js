// src/controllers/dashboard/teamLeader/TeamLeader_dashboardController.js

import { Coder_dashboardView } from "../../../views/dashboardView/coder/Coder_dashboardView.js";
import { caribbeanPhrases } from "../../../utils/phrases.js";

// MAIN CONTROLLER FUNCTION
export function TeamLeader_dasboardController() {
  tl_dasboardController.challenges();
  tl_dasboardController.quotes();
};

// OBJECT WITH ALL SUMMARY FUNCTIONS
const tl_dasboardController = {

  ////// CHALLENGES SUMMARY //////
  challenges: async function() {
    console.log("Challenges summary loaded from TEAMLEADER CONTROLLER.js");
  },

  ////// QUOTES SECTION //////
  quotes: function() {
    const quoteEl = document.getElementById("costa-quote");
    const metaEl = document.getElementById("costa-quote-meta");
    const btn = document.getElementById("refresh-quote");

    if (!quoteEl) return;

    function showRandomQuote() {
      const randomIndex = Math.floor(Math.random() * caribbeanPhrases.length);
      const phrase = caribbeanPhrases[randomIndex];
      quoteEl.textContent = phrase;
      metaEl.textContent = `Quote #${randomIndex + 1}`;
    }

    // show one when loading
    showRandomQuote();

    // refresh on button click
    btn?.addEventListener("click", showRandomQuote);
  },

  ////// MENTORING SUMMARY //////
  mentoring: async function() {
    console.log("Mentoring summary loaded from TEAMLEADER CONTROLLER.js");
  }

  ////// ... other summaries ... //////
};
