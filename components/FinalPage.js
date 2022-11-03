import React from "react";
import Image from "next/image";
import profileAvatar from "../public/photos/profile-avatar.png";



function FinalPage({
  setStartPage,
  setShowFinalImgPage,
  setResultSurvey,
  resultSurvey,
}) {

  const handleStart = () => {
    setStartPage(true);
    setShowFinalImgPage(false);
  }

  // console.log("resultSurvey1", resultSurvey.linkresult);  
  return (
    <div>
      <div className="flex flex-col justify-center items-center bg-sky-100 mr-70 ml-70 mt-5 mb-20 m-60 pb-5 pt-10 rounded-lg border-black border-2 shadow-2xl">
        <h1 className="question font-bold text-2xl">Kết quả bài khảo sát của bạn</h1>

        <Image
                      loader={() => resultSurvey.linkresult}
                      src={profileAvatar}
                      alt=""
                      width={800}
                      height={1000}
                    />
        <div className="flex flex-row mt-5 ">
        <button className="play_again_btn mx-5 bg-orange-500 p-2 rounded-md  text-white" onClick={handleStart}>
          Làm lại bài khảo sát
        </button>
        <button className="play_again_btn mx-5 bg-orange-500 p-2 rounded-md  text-white" onClick={handleStart}>
          Thoát
        </button>
        </div>
     
      </div>
    </div>
  );
}

export default FinalPage;
