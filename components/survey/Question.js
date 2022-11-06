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
}) {
  const [survey, setSurvey] = useState([]);
  const [result, setResult] = useState([]);
  const [question, setQuestion] = useState({});
  const [questionIndex, setQuestionIndex] = useState(2);

  useEffect(() => {
    setSurvey(questionStart);
    setQuestion(questionStart[0]);
  }, [questionStart]);

  console.log("numberQuestion", numberQuestion);

  const getQuestionIndex = async () => {
    const data = await surveyService.getSurvey(questionIndex);
    if (data.statusCode == 200) {
      setSurvey(data.data);
      setQuestion(data.data[0]);
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

  useEffect(() => {
    (async () => {
      getResultSurvey();
    })();
  }, []);

  const handleClick = () => {
    if (questionIndex == 2) {
      getQuestionIndex();
    }
    if (questionIndex < numberQuestion) {
      getQuestionIndex();
      setQuestionIndex(questionIndex + 1);
    } else {
      getResultSurvey();
      setShowQuestionPage(false);
      setShowFinalImgPage(true);
    }
  };

  return (
    <div>
      {question && (
        <div className="flex flex-col justify-center items-center bg-sky-100 mr-70 ml-70 mt-5 mb-20 m-60 pb-5 pt-10 rounded-lg border-black border-2">
          <h1 className="question font-bold text-2xl"> {question.question}</h1>
          <div>
            {survey.map((option, index) => (
              <div
                key={index}
                className="answers flex flex-col justify-center items-center pt-5"
                onClick={() => handleClick(result.push(option.id))}
              >
                <p className="answer p-4 text-white font-bold cursor-pointer text-center m-1  text-2xl bg-orange-400 rounded-lg shadow-lg hover:bg-slate-300 ">
                  {option.optionText}
                </p>
              </div>
            ))}
          </div>
          {questionIndex-1}/ {numberQuestion}
        </div>
      )}
      {}
    </div>
  );
}

export default Question;
