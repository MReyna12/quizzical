import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import quizImg from "/quiz.png";
import Quiz from "./components/quiz/Quiz";
import "./App.css";

function App() {
  // State management that determines whether or not the Home component should be displayed
  const [homePage, setHomePage] = useState(true);
  function handleHomePage() {
    setHomePage((prevState) => !prevState);
  }

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
        <div className="container centered">
          <div>
            <Quiz />
          </div>
          <button className="check-answers-button">Check Answers</button>
        </div>
      )}
    </main>
  );
}

export default App;
