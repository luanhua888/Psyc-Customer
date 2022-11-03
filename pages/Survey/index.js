import { useState } from "react";
import Question from "../../components/survey/Question";
import StartPage from "../../components/StartPage";
import FinalPage from "../../components/FinalPage.js";

function SurveyPage() {
  const [showStartPage, setStartPage] = useState(true);
  const [showQuestionPage, setShowQuestionPage] = useState(false);
  const [showFinalImgPage, setShowFinalImgPage] = useState(false);

  const [score, setScore] = useState(0);
  const [topScore, setTopScore] = useState(0);

  const [username, setUserName] = useState("");

  return (
    <>
        {showStartPage && (
            <StartPage
                setStartPage={setStartPage}
                setShowQuestionPage={setShowQuestionPage}
                topScore={topScore}
                username={username}
                setUserName={setUserName}
            />
        )}
        {showQuestionPage && (
            <Question
                setShowQuestionPage={setShowQuestionPage}
                setShowFinalImgPage={setShowFinalImgPage}
                setScore={setScore}
                score={score}
            />
        )}
        {showFinalImgPage && (
            <FinalPage
                score={score}
                setScore={setScore}
                topScore={topScore}
                setTopScore={setTopScore}
                setShowFinalImgPage={setShowFinalImgPage}   
                setStartPage={setStartPage}
                username={username}
                setUserName={setUserName}
            />
        )}
    </>
  );
}

export default SurveyPage;
