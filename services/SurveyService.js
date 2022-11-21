import AbstractService from "./AbstractService";

const API = {
  GET_SURVEY: "OptionQuestions/getoptionbyquestionid",
  GET_ALL_TYPE_SURVEY: "SurveyTypes/getallsurveytype",
  GET_SURVEY_ID: "Surveys/getsurveybysurveytypeid",
  GET_QUESTION: "Questions/getquestionbysurveyid",
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

  getAllTypeSurvey = (search) => {
    return this.httpGET(
      API.GET_ALL_TYPE_SURVEY,
      {search}
    );  
  };

  getSurveyByIdType = (surveytypeid) => {
    return this.httpGET(
      API.GET_SURVEY_ID,
      {surveytypeid}
    );  
  };

  getQuestionBySurveyId = (surveyid) => {
    return this.httpGET(
      API.GET_QUESTION,
      {surveyid}
    );  
  };

  getQuestionDefault = (surveyid) => {
    return this.httpGET(
      API.GET_QUESTION,
      {surveyid}
    );  
  };


}

export const surveyService = new SurveyService();
