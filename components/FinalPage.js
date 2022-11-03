import React from "react";

function FinalPage({
  setStartPage,
  setShowFinalImgPage
}) {

  const handleStart = () => {
    setStartPage(true);
    setShowFinalImgPage(false);
  }
  return (
    <div>
      <div className="flex flex-col justify-center items-center bg-sky-100 mr-70 ml-70 mt-40 mb-20 m-60 pb-5 pt-10 rounded-lg border-black border-2 shadow-2xl">
        <h1 className="question font-bold text-2xl">
          You have completed the survey
        </h1>

        <h2>Your score is:</h2>

        <h3 className="final_score">100</h3>

        <button className="play_again_btn bg-orange-500 p-2 rounded-md  text-white" onClick={handleStart}>
          Play again
        </button>
      </div>
    </div>
  );
}

export default FinalPage;
