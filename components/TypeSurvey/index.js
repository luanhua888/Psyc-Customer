import { Card } from "flowbite-react";
import { useRef, useEffect, useState } from "react";
import { surveyService } from "../../services/SurveyService";
import ModalLogin from "../../components/modal/ModalLogin";
import { userService } from "../../services/UserService";
import Skeleton from '@mui/material/Skeleton';


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

  const modalLoginRef = useRef();



  const [typeSurvey, setTypeSurvey] = useState([]);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true)
      const data = await surveyService.getAllTypeSurvey();
      if (data.statusCode == 200) {
        setTypeSurvey(data.data);
        console.log("data", data.data);
      }
      setLoading(false);
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


  useEffect(() => {
    (async () => {
      if (localStorage.getItem("jwttoken")) {
        const data = await userService.profile(localStorage.getItem("iddb"));

        if (data.statusCode == 200) {

          setUser(data.data[0]);
        }
      }
    })();
  }, []);

  const onJoin = () => {
    if (_.isEmpty(user)) {
      modalLoginRef.current.open();
      return;
    }
    setStartPage(true);
    setShowTypeSurvey(false);

  };

  return (
    
    <section id="services" className="bg-[#031d2e]">
      {loading ? (
           <div className="md:container mx-auto px-[6%] py-6">
           <div className=" grid grid-cols-3 gap-4">
            <Skeleton variant="rectangular" width={350} height={400} />
            <Skeleton variant="rectangular" width={350} height={400} />
            <Skeleton variant="rectangular" width={350} height={400} />
 
           </div>
           </div>
      
         ) : (
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
               
                

                    onJoin()
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
         )
        }
        <ModalLogin ref={modalLoginRef} />
    </section>
   


  );
}

export default TypeSurvey;
