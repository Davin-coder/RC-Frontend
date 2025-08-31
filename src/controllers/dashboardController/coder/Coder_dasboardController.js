import { Coder_dashboardView } from "../../../views/dashboardView/coder/Coder_dashboardView.js";

/***BELLOW YOU'LL FIND OUT A SUMMARY OF THE OTHER SECTIONS***/
import { ChallengesAPI } from "../../../utils/api.js";

// IN THIS FUNCTIONS WE'LL CALL ALL THE FUNCTIONS INSIDE OF THE CONTROLLER
export function Coder_dasboardController() {
  cd_dasboardController.challenges();
};


// IN THIS OBJECT WE'LL CREATE ALL THE FUNCTIONS WHICH ARE SUMMARIES OF OTHER SECTIONS
const cd_dasboardController = {

  //////CHALLENGES SUMMARY//////
  challenges: async function() {
      console.log("Challenges summary loaded from CODERRRRR_dashboardController.js");
  },

  mentoring: async function() {
      console.log("Mentoring summary loaded from CODERRRRR_dashboardController.js");
  }
  ///.................rest of summaries...................///
  ////// SUMMARY//////
}; 
