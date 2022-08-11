import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import quizImg from "/quiz.png";
import Quiz from "./components/quiz/Quiz";
<<<<<<< HEAD
=======
import getQuestions from "./services/getQuestions";
>>>>>>> f7e684d (reupload of files)
import "./App.css";

function App() {
  // State management that determines whether or not the Home component should be displayed
  const [homePage, setHomePage] = useState(true);
  // Create state variables to manage the data pulled from the trivia API
  const [triviaData, setTriviaData] = useState([]);

<<<<<<< HEAD
=======
  // Create new array
  const [questionsArray, setQuestionsArray] = useState([]);

>>>>>>> f7e684d (reupload of files)
  function handleHomePage() {
    setHomePage((prevState) => !prevState);
  }

<<<<<<< HEAD
  // Make fetch request to obtain the data to be used to populate five questions/answers
  useEffect(() => {
=======
  // Call fetch function to make fetch request and set the data to triviaData
  useEffect(() => {
    getQuestions().then((questions) => {
      return setTriviaData(
        questions.map((question) => {
          return {
            ...question,
            id: nanoid(),
            selectedAnswer: "",
            showAnswer: false,
          };
        })
      );
    });
  }, []);

  // Make fetch request to obtain the data to be used to populate five questions/answers
  /*useEffect(() => {
>>>>>>> f7e684d (reupload of files)
    console.log("useEffect just ran");
    async function trivia() {
      const res = await fetch("https://opentdb.com/api.php?amount=5");
      const data = await res.json();
      setTriviaData(data.results);
    }
    trivia();
<<<<<<< HEAD
  }, []);

  // Set data in the questionsArray
  const questions = triviaData.map((triviaObject) => {
    return <Quiz key={nanoid()} item={triviaObject} />;
=======
  }, []);*/

  /*useEffect(() => {
    setQuestionsArray(triviaData);
  });*/

  //console.log(questionsArray);
  // Determine what happens when an answer is selected
  function handleSelectedAnswer(questionId, answer) {
    console.log(questionId, answer);
  }

  // Set data in the questionsArray
  const questions = triviaData.map((question) => {
    //console.log(question);
    return (
      <Quiz
        key={question.id}
        item={question}
        handleSelectedAnswer={handleSelectedAnswer}
      />
    );
>>>>>>> f7e684d (reupload of files)
  });

  return (
    <main>
      <div className="blobs yellow-blob"></div>
      <div className="blobs blue-blob"></div>
      {homePage ? (
        <section className="centered center-text">
          <img
            className="spin"
            src={quizImg}
            alt="An icon that displays the text quiz with generic boxes and lines representing text"
          />
          <h1>Quizzical</h1>
          <p className="top-bottom-spacing">Test your trivia skills!</p>
          <button onClick={handleHomePage}>Start quiz</button>
        </section>
      ) : (
<<<<<<< HEAD
        <div className="container centered">{questions}</div>
=======
        <div className="container centered">
          <div>{questions}</div>
          <button className="check-answers-button">Check Answers</button>
        </div>
>>>>>>> f7e684d (reupload of files)
      )}
    </main>
  );
}

export default App;
