import { useState } from "react";
import Question from "../../components/survey/Question";
import StartPage from "../../components/StartPage";
import FinalPage from "../../components/FinalPage.js";
import TypeSurveyPage from "../../components/TypeSurvey/index.js";

export async function getServerSideProps(context) {
  const { req, res } = context;
  const { token } = req.cookies;
  if (!token) {
    res.writeHead(302, { Location: "/" });
    res.end();
  }
  return {
    props: {},
  };
}


function SurveyPage() {
  const [showStartPage, setStartPage] = useState(false);
  const [showtypeSurvey, setShowTypeSurvey] = useState(true);
  const [showQuestionPage, setShowQuestionPage] = useState(false);
  const [showFinalImgPage, setShowFinalImgPage] = useState(false);


  const [resultSurvey, setResultSurvey] = useState({});
  const [questionStart, setQuestionStart] = useState([]);
  const [listQuestionStart, setListQuestionStart] = useState([]);
  const [score, setScore] = useState(0);
  const [topScore, setTopScore] = useState(0);
  const [numberQuestion, setNumberQuestion] = useState(0);
  const [username, setUserName] = useState("");
  const [listSurvey, setListSurvey] = useState([]);
  const [idSurvey, setIdSurvey] = useState(0);

  return (
    <>
      {showtypeSurvey && (
        <TypeSurveyPage
          setStartPage={setStartPage}
          setShowQuestionPage={setShowQuestionPage}
          topScore={topScore}
          username={username}
          setUserName={setUserName}
          numberQuestion={numberQuestion}
          setNumberQuestion={setNumberQuestion}
          setQuestionStart={setQuestionStart}
          setShowTypeSurvey={setShowTypeSurvey}
          setListSurvey={setListSurvey}
          setIdSurvey={setIdSurvey}
        />
      )}

      {showStartPage && (
        <StartPage
          setStartPage={setStartPage}
          setShowQuestionPage={setShowQuestionPage}
          topScore={topScore}
          username={username}
          setUserName={setUserName}
          numberQuestion={numberQuestion}
          setNumberQuestion={setNumberQuestion}
          setQuestionStart={setQuestionStart}
          questionStart={questionStart}
          setShowTypeSurvey={setShowTypeSurvey}
          listSurvey={listSurvey}
          idSurvey={idSurvey}
          setIdSurvey={setIdSurvey}
          setListQuestionStart={setListQuestionStart}
          listQuestionStart={listQuestionStart}
          
        />
      )}
      {showQuestionPage && (
        <Question
          setShowQuestionPage={setShowQuestionPage}
          setShowFinalImgPage={setShowFinalImgPage}
          setScore={setScore}
          score={score}
          setResultSurvey={setResultSurvey}
          resultSurvey={resultSurvey}
          numberQuestion={numberQuestion}
          setNumberQuestion={setNumberQuestion}
          setQuestionStart={setQuestionStart}
          questionStart={questionStart}
          idSurvey={idSurvey}
          setIdSurvey={setIdSurvey}
          setListQuestionStart={setListQuestionStart}
          listQuestionStart={listQuestionStart}
          
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
          setResultSurvey={setResultSurvey}
          resultSurvey={resultSurvey}
        />
      )}
    </>
  );
}

export default SurveyPage;
