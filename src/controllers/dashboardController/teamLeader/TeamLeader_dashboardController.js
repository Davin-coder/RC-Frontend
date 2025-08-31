
import { Coder_dashboardView } from "../../../views/dashboardView/coder/Coder_dashboardView.js";

/***BELLOW YOU'LL FIND OUT A SUMMARY OF THE OTHER SECTIONS***/
import { ChallengesAPI } from "../../../utils/api.js";

// IN THIS FUNCTIONS WE'LL CALL ALL THE FUNCTIONS INSIDE OF THE CONTROLLER
export function TeamLeader_dasboardController() {
  tl_dasboardController.challenges();
};


// IN THIS OBJECT WE'LL CREATE ALL THE FUNCTIONS WHICH ARE SUMMARIES OF OTHER SECTIONS
const tl_dasboardController = {

  //////CHALLENGES SUMMARY//////
  challenges: async function() {
      console.log("Challenges summary loaded from TEAMLEADER CONTROLLER.js");
  },

  mentoring: async function() {
      console.log("Mentoring summary loaded from TEAMLEADER CONTROLLER.js");
  }
  ///.................rest of summaries...................///
  ////// SUMMARY//////
}; 
