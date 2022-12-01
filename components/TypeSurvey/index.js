import { Card } from "flowbite-react";
import { useRef, useEffect, useState } from "react";
import { surveyService } from "../../services/SurveyService";
import ModalLogin from "../../components/modal/ModalLogin";
import { userService } from "../../services/UserService";
import Skeleton from "@mui/material/Skeleton";

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
      setLoading(true);
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
            <Skeleton
              animation="wave"
              variant="rect"
              width="100%"
              height="300px"
              className="mb-4 rounded-2xl"
            />
            <Skeleton
              animation="wave"
              variant="rect"
              width="100%"
              height="300px"
              className="mb-4 rounded-2xl"
            />
            <Skeleton
              animation="wave"
              variant="rect"
              width="100%"
              height="300px"
              className="mb-4 rounded-2xl"
            />
            <Skeleton
              animation="wave"
              variant="rect"
              width="100%"
              height="300px"
              className="mb-4 rounded-2xl"
            />
            <Skeleton
              animation="wave"
              variant="rect"
              width="100%"
              height="300px"
              className="mb-4 rounded-2xl"
            />
            <Skeleton
              animation="wave"
              variant="rect"
              width="100%"
              height="300px"
              className="mb-4 rounded-2xl"
            />
            <Skeleton
              animation="wave"
              variant="rect"
              width="100%"
              height="300px"
              className="mb-4 rounded-2xl"
            />
            <Skeleton
              animation="wave"
              variant="rect"
              width="100%"
              height="300px"
              className="mb-4 rounded-2xl"
            />
            <Skeleton
              animation="wave"
              variant="rect"
              width="100%"
              height="300px"
              className="mb-4 rounded-2xl"
            />
          </div>
        </div>
      ) : (
        <div>
          <div className="justify-center items-center flex flex-col bg-[#17384e]  mx-[8%] p-[10%] mt-[1%] rounded-md shadow-md">
            <p className=" text-[#ff7010] font-bold md:text-5xl mb-[5%] border-b-4 border-b-[#ff7010]">
              Các loại khảo sát
            </p>
            <div className=" grid grid-cols-3  gap-[2%] ">
              {typeSurvey.map((row, key) => (
                <div
                  key={key}
                >
                  <div className="flex flex-row justify-center items-center px-[10%] ">
                    <div className="rounded-lg shadow-lg bg-white max-w-[300px] sm:w-[300px] min-w-[80px]  "
                     onClick={() => {
                            getSurveyByIdType(row.id);
                            onJoin();
                          }}
                    >
                      <a href="#!">
                        <img
                          className="rounded-t-lg"
                          src="https://i.pinimg.com/564x/f0/6a/13/f06a13da40014d72d11bf6fddea40c28.jpg"
                          alt={"Loại khảo sát: " + row.name}
                          
                        />
                      </a>
                      <div className="p-[4%]">
                        <h5
                          className="text-gray-900 sm:text-xl font-medium mb-2 flex justify-center "
                          style={{
                            fontSize: "clamp(10px, 1.5vw, 24px)",
                          }}
                        >
                          Loại khảo sát
                        </h5>
                        <span className="flex justify-center"
                        style={{
                            fontSize: "clamp(10px, 1.5vw, 24px)",
                          }}
                        >{row.name}</span>

                       
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      <ModalLogin ref={modalLoginRef} />
    </section>
  );
}

export default TypeSurvey;
