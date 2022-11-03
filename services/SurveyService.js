import AbstractService from "./AbstractService";

const API = {
  GET_SURVEY: "OptionQuestions/getoptionbyquestionid",
  POST_RESULT_SURVEY: "ResultSurveys/submitsurveybylist",
};

class SurveyService extends AbstractService {
  //id này lấy
  getSurvey = (questionid) => {
    return this.httpGET(
      API.GET_SURVEY,
      { questionid },
      {
        params: {},
      }
    );
  };

  postResultSurvey = (customerId, optionId) => {
    return this.httpPOST(
      API.POST_RESULT_SURVEY,
      {customerId, optionId},
      {
        params: { },
      }
    );
  };
}

export const surveyService = new SurveyService();
