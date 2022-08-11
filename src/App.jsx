import { useState } from "react";
import quizImg from "/quiz.png";
import Quiz from "./components/Quiz/Quiz";
import "./App.css";

function App() {
  // State management that determines whether or not the Quiz component should be displayed
  const [quizStart, setQuizStart] = useState(false);

  // Function handler that swaps the state of quizStart--this determines if the Quiz component is displayed or if the "home page" is displayed;
  // state swaps once the user presses the Start quiz button and play again button (found in Quiz component)
  function handleQuizStart() {
    setQuizStart((prevState) => !prevState);
  }

  return (
    <main>
      <div className="blobs yellow-blob"></div>
      <div className="blobs blue-blob"></div>
      {quizStart ? (
        <div className="container centered">
          <div>
            <Quiz handleQuizStart={handleQuizStart} />
          </div>
        </div>
      ) : (
        <section className="centered center-text">
          <img
            className="spin"
            src={quizImg}
            alt="An icon that displays the text quiz with generic boxes and lines representing text"
          />
          <h1>Quizzical</h1>
          <p className="home-page-paragraph-margin">Test your trivia skills!</p>
          <button onClick={handleQuizStart}>Start quiz</button>
        </section>
      )}
    </main>
  );
}

export default App;
