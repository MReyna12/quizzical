import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import quizImg from "/quiz.png";
import Quiz from "./components/quiz/Quiz";
import "./App.css";

function App() {
  // State management that determines whether or not the Home component should be displayed
  const [homePage, setHomePage] = useState(true);
  // Create state variables to manage the data pulled from the trivia API
  const [triviaData, setTriviaData] = useState([]);

  function handleHomePage() {
    setHomePage((prevState) => !prevState);
  }

  // Make fetch request to obtain the data to be used to populate five questions/answers
  useEffect(() => {
    console.log("useEffect just ran");
    async function trivia() {
      const res = await fetch("https://opentdb.com/api.php?amount=5");
      const data = await res.json();
      setTriviaData(data.results);
    }
    trivia();
  }, []);

  // Set data in the questionsArray
  const questions = triviaData.map((triviaObject) => {
    return <Quiz key={nanoid()} item={triviaObject} />;
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
        <div className="container centered">{questions}</div>
      )}
    </main>
  );
}

export default App;
