import React from "react";
import Questions from "../trivia/Trivia-Questions";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import "./Quiz.css";

function Quiz() {
  // Create state variables to manage the questions pulled from the trivia API
  const [triviaData, setTriviaData] = useState([]);

  // Make fetch request to obtain the data to be used to populate five questions/answers
  useEffect(() => {
    console.log("useEffect just ran");
    async function getTrivia() {
      const res = await fetch("https://opentdb.com/api.php?amount=5");
      const data = await res.json();
      setTriviaData(data.results);
    }
    getTrivia();
  }, []);

  // Generate five questions
  const questions = triviaData.map((triviaObject) => {
    return (
      <Questions
        key={uuidv4()}
        question={triviaObject.question}
        correctAnswer={triviaObject.correct_answer}
        incorrect_answer={triviaObject.incorrect_answers}
      />
    );
  });
  console.log(triviaData);

  return <main>{questions}</main>;
}

export default Quiz;
