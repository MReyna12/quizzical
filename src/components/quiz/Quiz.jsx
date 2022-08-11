import React from "react";
//import Questions from "../trivia/Questions";
import { nanoid } from "nanoid";
import getQuestions from "../../services/getQuestions";
import { useState, useEffect } from "react";
import "./Quiz.css";

function Quiz() {
  // Create state variables to manage the data pulled from the trivia API
  const [triviaData, setTriviaData] = useState([]);

  // Call fetch function to make fetch request and set the data to triviaData
  useEffect(() => {
    getQuestions().then((questions) => {
      console.log("fetch effect called");
      console.log(questions.length);
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

  // Determine what happens when an answer is selected
  function handleSelectedAnswer(questionId, answer) {
    console.log("handleSelectedAnswer called");
    //console.log(questionId, answer);
    setTriviaData((prevTriviaData) => {
      prevTriviaData.map((question) =>
        question.id === questionId
          ? { ...question, selectedAnswer: answer }
          : question
      );
    });
  }

  // Set data in the questionsArray
  const questions = triviaData.map((question) => {
    console.log("questions component function called");
    //console.log(question);
    <Quiz
      key={question.id}
      item={question}
      handleSelectedAnswer={handleSelectedAnswer}
    />;
  });

  return <section>{questions}</section>;
}

export default Quiz;
