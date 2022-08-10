import React from "react";
//import Questions from "../trivia/Questions";
import { nanoid } from "nanoid";
import { decode } from "html-entities";
import { useState, useEffect } from "react";
import "./Quiz.css";

function Quiz(props) {
  console.log(props.item);
  // Create the answer elements
  const correctAnswerElement = (
    <button key={nanoid()} className="responses">
      {decode(props.item.correct_answer)}
    </button>
  );

  const incorrectAnswerElements = props.item.incorrect_answers.map((answer) => {
    return (
      <button key={nanoid()} className="responses">
        {decode(answer)}
      </button>
    );
  });

  // Create a new array with the incorrect answers AND the correct answer element
  const responses = [...incorrectAnswerElements, correctAnswerElement];

  // Randomize the order of the responses so that the answer is not always the last button
  const shuffleRespones = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  };
  shuffleRespones(responses);

  return (
    <section className="bottom-border">
      <p>{decode(props.item.question)}</p>
      <div className="flex-plus-gap">{responses}</div>
    </section>
  );
}

export default Quiz;
