import { set } from "lodash";
import React, { useEffect, useState } from "react";
import { string } from "yup/lib/locale";
import { surveyService } from "../../services/SurveyService";
import FinalPage from "../FinalPage";

function Question({
  setShowQuestionPage,
  setShowFinalImgPage,
  setScore,
  score,
  setResultSurvey,
  resultSurvey,
  numberQuestion,
  setNumberQuestion,
  questionStart,
  setQuestionStart,
  idSurvey,
  listQuestionStart,
}) {
  const [survey, setSurvey] = useState([]);
  const [result, setResult] = useState([]);
  const [question, setQuestion] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [lengQuestion, setLengQuestion] = useState(0);
  useEffect(() => {
    // setSurvey(questionStart);
    // // setQuestion(questionStart[0]);
    // setQuestion(questionStart);
    // setSurvey(listQuestionStart);
  }, []);

  console.log("questionStart", questionStart);
  console.log("listQuestionStart", listQuestionStart);
  console.log("survey", survey);
  console.log("result", result);
  console.log("lengQuestion", lengQuestion);
  console.log("questionIndex", questionIndex);

  useEffect(() => {
    (async () => {
      if (questionIndex == 0) {
        const data = await surveyService.getQuestionBySurveyId(idSurvey);
        if (data.statusCode == 200) {
          setSurvey(data.data[0].option);
          setQuestion(data.data[0].description);
          setLengQuestion(data.data.length);
        }
      } else {
        getQuestionByIdSurvey();
      }
    })();
  }, []);

  const getQuestionNext = async (id) => {
    const data = await surveyService.getQuestionBySurveyId(idSurvey);
    if (data.statusCode == 200) {
      setSurvey(data.data[questionIndex + 1].option);
      setQuestion(data.data[questionIndex + 1].description);
      setLengQuestion(data.data.length);
    }
  };

  const getQuestionByIdSurvey = async (id) => {
    const data = await surveyService.getQuestionBySurveyId(idSurvey);
    if (data.statusCode == 200) {
      if (questionIndex < lengQuestion -1) {
        setSurvey(data.data[questionIndex + 1].option);
        setQuestion(data.data[questionIndex + 1].description);
        setLengQuestion(data.data.length);
      }else{
        getResultSurvey();
        setShowQuestionPage(false);
        setShowFinalImgPage(true);
      }
    }
  };

  const getResultSurvey = async () => {
    const data = await surveyService.postResultSurvey(
      localStorage.getItem("idcustomer"),
      result
    );
    if (data.statusCode == 201) {
      setResultSurvey(data);
    }
  };

  const handleClick = () => {
    // if (questionIndex == 0) {
    //   const data =  surveyService.getQuestionBySurveyId(idSurvey);
    //   if (data.statusCode == 200) {
    //   setQuestionIndex(questionIndex + 1);

    //     setSurvey(data.data[1].option);
    //     setQuestion(data.data[1].description);
    //   }
    // }
    if (questionIndex < lengQuestion) {
      if (questionIndex == 0) {
        setQuestionIndex(questionIndex + 1);
        getQuestionNext();
      } else {
        setQuestionIndex(questionIndex + 1);
        getQuestionByIdSurvey();
      }
    }
  };

  return (
    <div>
      {question && (
        <div className="flex flex-col justify-center items-center bg-sky-100 mr-70 ml-70 mt-5 mb-20 m-60 pb-5 pt-10 rounded-lg border-black border-2">
          <h1 className="question font-bold text-2xl"> {question}</h1>
          <div>
            {survey.map((option, index) => (
              <div
                key={index}
                className="answers flex flex-col pt-5"
                onClick={() => handleClick(result.push(option.id))}
              >
                <p className="answer p-4 text-white font-bold cursor-pointer  m-1  text-2xl bg-orange-400 rounded-lg shadow-lg hover:bg-slate-300 ">
                  {option.optionText}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
      {}
    </div>
  );
}

export default Question;
