import React from "react";

function StartPage({
  setStartPage,
  setShowQuestionPage,
  topScore,
  username,
  setUserName,
}) {
  const startSurvey = () => {
    if (username === "") {
      alert("Please enter your name");
    }else{
      setStartPage(false);
      setShowQuestionPage(true);
    }
  };
  return (
    <div>
      <div className="flex flex-col justify-center items-center bg-sky-100 mr-70 ml-70 mt-40 mb-20 m-60 pb-5 pt-10 rounded-lg border-black border-2 shadow-2xl">
        <h1 className="question font-bold text-2xl">Wel come to survey</h1>
        <h3> Hãy nhập tên của bạn</h3>
        <input
          type="text"
          className="username_input bg-white outline-none rounded-3xl p-2 mx-auto my-2 w-60%"
          placeholder="Nhập tên"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
        />
        <button className="start_bnt text-2xl bg-orange-500 p-2 rounded-md  text-white" onClick={startSurvey}>
          Bắt đầu
        </button>
        <p className="top_score">
          Top score: <span>{topScore}</span>
        </p>
      </div>
    </div>
  );
}

export default StartPage;
