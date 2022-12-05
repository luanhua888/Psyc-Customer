import React from "react";
import Image from "next/image";
import profileAvatar from "../public/photos/profile-avatar.png";
import iconLoader from "../public/photos/icon/loader.png";
import {
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from "react";
import Skeleton from "@mui/material/Skeleton";
import { surveyService } from "../services/SurveyService";

function FinalPage({
  setStartPage,
  setShowFinalImgPage,
  setResultSurvey,
  resultSurvey,
}) {
  const [loading, setLoading] = useState(true);

  const handleStart = () => {
    setStartPage(true);
    setShowFinalImgPage(false);
  };

  console.log("resultSurvey  a", resultSurvey);

  useEffect(() => {
    (async () => {
      const data = await surveyService.postResultSurvey(
        localStorage.getItem("idcustomer"),
        resultSurvey
      );
      
      if (data.statusCode == 201) {
        setResultSurvey(data);
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div>
      {loading ? (
        <div className=" flex justify-between mt-[5%]">
          <div className="md:container mx-[10%]  flex flex-col justify-center items-center ">
          <div className="absolute">
          <Image src={iconLoader} alt="" className="animate-spin "/>

          </div>
            <Skeleton
              animation="wave"
              variant="rect"
              width="100%"
              height="1000px"
              className="mb-4 rounded-2xl"
            />
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center bg-[#17384e ] mr-70 ml-70 mt-5 mb-20 m-60 pb-5 pt-10 rounded-lg border-black border-2 shadow-2xl">
          <h1 className="question font-bold text-[#ff7010] text-2xl">
            Kết quả bài khảo sát của bạn
          </h1>

          <Image
            loader={() => resultSurvey.linkresult}
            src={profileAvatar}
            alt=""
            width={800}
            height={1000}
          />
          <div className="flex flex-row mt-5 ">
            <button
              className="play_again_btn mx-5 bg-orange-500 p-2 rounded-md  text-white"
              onClick={handleStart}
            >
              Làm lại bài khảo sát
            </button>
            <button
              className="play_again_btn mx-5 bg-orange-500 p-2 rounded-md  text-white"
              onClick={handleStart}
            >
              Thoát
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default FinalPage;
