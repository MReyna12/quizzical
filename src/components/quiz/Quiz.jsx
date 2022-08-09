import React from "react";
import Questions from "../trivia/Trivia-Questions";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import "./Quiz.css";

function Quiz() {
  // Create state variables to manage the data pulled from the trivia API
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

  // Generate five questions, correct answers, and incorrect answers to be passed as props to the Trivia-Questions component
  const questions = triviaData.map((triviaObject) => {
    const uniqueKey = uuidv4();
    return <Questions key={uniqueKey} id={uniqueKey} item={triviaObject} />;
  });
  //console.log(triviaData);

  return <main className="container">{questions}</main>;
}

export default Quiz;
