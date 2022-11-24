import { Card } from "flowbite-react";
import { useEffect, useState } from "react";
import { surveyService } from "../../services/SurveyService";

function TypeSurvey({
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
  setListSurvey,
}) {
  const [typeSurvey, setTypeSurvey] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await surveyService.getAllTypeSurvey();
      if (data.statusCode == 200) {
        setTypeSurvey(data.data);
        console.log("data", data.data);
      }
    })();
  }, []);
  console.log("data", typeSurvey.name);

  const getSurveyByIdType = (idType) => {
    (async () => {
      const data = await surveyService.getSurveyByIdType(idType);
      if (data.statusCode == 200) {
        setListSurvey(data.data);
        console.log("data", data.data);
      }
    })();
  };

  return (
    <section id="services" className="bg-[#031d2e]">
      <div className="md:container mx-auto px-[6%] py-6">
          <div className=" grid grid-cols-3 gap-4">
            {typeSurvey.map((row, key) => (
              <div
                key={key}
                className="flex flex-col gap-1 justify-center items-center bg-white py-5 px-4 rounded-xl w-[400px] "
              >
                <Card
                  horizontal={true}
                  imgSrc="https://i.pinimg.com/236x/d5/d9/4b/d5d94b0e074c6cfee308c5623ecd866c.jpg"
                  onClick={() => {
                    getSurveyByIdType(row.id);
                    setStartPage(true);
                    setShowTypeSurvey(false);
                  }}
                >
                  <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Loại khảo sát: {row.name}
                  </h5>
                </Card>
              </div>
            ))}
          </div>
        </div>
        </section>
  );
}

export default TypeSurvey;
