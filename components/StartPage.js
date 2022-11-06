import { Card } from "flowbite-react";
import { useEffect, useState } from "react";
import { surveyService } from "../services/SurveyService";


function StartPage({
  setStartPage,
  setShowQuestionPage,
  topScore,
  username,
  setUserName,
  numberQuestion,
  setNumberQuestion,
  questionStart,
  setQuestionStart
}) {
  const startSurveyShort = () => {
      setStartPage(false);
      setShowQuestionPage(true);
      setNumberQuestion(10)
      getQuestionIndex();
  };
  const startSurveyMedium = () => {
      setStartPage(false);
      setShowQuestionPage(true);
      setNumberQuestion(30)
  };
  const startSurveyLong = () => {
      setStartPage(false);
      setShowQuestionPage(true);
      setNumberQuestion(40)
  };

  const getQuestionIndex = async () => {
    const data = await surveyService.getSurvey(1);
    if (data.statusCode == 200) {
      setQuestionStart(data.data);
    }
  };

  return (
    <div>
      <div className="flex flex-col justify-center items-center bg-sky-100 mr-10 ml-10 mt-5 mb-20 m-10 pb-5 pt-10 rounded-lg border-black border-2 shadow-2xl">
        <h1 className="question font-bold text-4xl mb-5">CHÀO MỪNG BẠN ĐẾN VỚI BÀI KHẢO SÁT</h1>
       
        <div className="flex flex-row ">
          <div className="max-w-md flex  flex-row mx-3">
            <Card
              horizontal={true}
              imgSrc="https://i.pinimg.com/236x/d5/d9/4b/d5d94b0e074c6cfee308c5623ecd866c.jpg"
            >

              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Mức độ: <br/>
                  Ngắn
              </h5>
              <h4>(20 câu hỏi)</h4>

              <button
                className="start_bnt text-2xl bg-orange-500 p-2 rounded-md  text-white"
                onClick={()=> startSurveyShort() } 
              >
                Bắt đầu
              </button>
            </Card>
          </div>
          <div className="max-w-md flex  flex-row mx-3">
            <Card
              horizontal={true}
              imgSrc="https://i.pinimg.com/236x/d5/d9/4b/d5d94b0e074c6cfee308c5623ecd866c.jpg"
            >
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Mức độ: <br/>Trung Bình
              </h5>
              <h4>(30 câu hỏi)</h4>
             
              <button
                className="start_bnt text-2xl bg-orange-500 p-2 rounded-md  text-white"
                onClick={()=> startSurveyMedium() }
              >
                Bắt đầu
              </button>
            </Card>
          </div>
          <div className="max-w-md flex  flex-row mx-3">
            <Card
              horizontal={true}
              imgSrc="https://i.pinimg.com/236x/d5/d9/4b/d5d94b0e074c6cfee308c5623ecd866c.jpg"
            >
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Mức độ:<br/> Dài
              </h5>
              <h4>
                (40 câu hỏi)
              </h4>
             
              <button
                className="start_bnt text-2xl bg-orange-500 p-2 rounded-md  text-white"
                onClick={()=> startSurveyLong() }
              >
                Bắt đầu
              </button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StartPage;
