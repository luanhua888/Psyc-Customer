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
  setQuestionStart,
  setShowTypeSurvey,
  listSurvey,
  setIdSurvey,
  setListQuestionStart
}) {
 
  console.log("listSurvey", listSurvey);
  const getQuestionIndex = async () => {
    const data = await surveyService.getSurvey(1);
    if (data.statusCode == 200) {
      setQuestionStart(data.data);
    }
  };

  const getQuestionByIdSurvey = async (id) => {
    const data = await surveyService.getQuestionBySurveyId(id);
    if (data.statusCode == 200) {
      setQuestionStart(data.data[0].description);
      setListQuestionStart(data.data[0].option);

    }
  };



  return (
    <section id="services" className="bg-[#031d2e]">
    <div className="md:container mx-auto px-[6%] py-6">
        <div className=" grid grid-cols-3 gap-4">
          {listSurvey.map((row, key) => (
            <div
              key={key}
              className="flex flex-col gap-1 justify-center items-center bg-white py-5 px-4 rounded-xl w-[400px] "
            >
              <Card
                horizontal={true}
                imgSrc="https://i.pinimg.com/236x/d5/d9/4b/d5d94b0e074c6cfee308c5623ecd866c.jpg"
                onClick={() => {
                  setStartPage(false);
                  setShowQuestionPage(true);
                  setIdSurvey(row.id);
                  getQuestionByIdSurvey(row.id);
                }}
              >
                <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                Tên Khảo sát: {row.name}
                </h5>
              </Card>
            </div>
          ))}
        </div>
      </div>
      </section>
  );
}

export default StartPage;
