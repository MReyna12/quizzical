import React from "react";
import quizImg from "/quiz.png";
import "./Home.css";

function Home(props) {
  return (
    <div>
      <div className="centered">
        <img
          className="spin"
          src={quizImg}
          alt="An icon that displays the text quiz with generic boxes and lines representing text"
        />
        <h1>Quizzical</h1>
        <p className="top-bottom-spacing">Test your trivia skills!</p>
        <button onClick={props.toggle}>Start quiz</button>
      </div>
    </div>
  );
}

export default Home;
