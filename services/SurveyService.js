import AbstractService from "./AbstractService";

const API = {
  GET_SURVEY: "OptionQuestions/getoptionbyquestionid",
};

class SurveyService extends AbstractService {
  //id này lấy
  getSurvey = (questionid) => {
    return this.httpGET(
      API.GET_SURVEY,
      { questionid},
      {
        params: {},
      }
    );
  };
}

export const surveyService = new SurveyService();
