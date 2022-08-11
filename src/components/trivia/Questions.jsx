import React from "react";
import { useEffect } from "react";
import { nanoid } from "nanoid";
import { decode } from "html-entities";
import "./Questions.css";

function Questions(props) {
  // Create the answer elements and classNames to alter the background color of the button clicked by the user
  const correctAnswerClassName = `${
    props.item.selectedAnswer === props.item.correct_answer
      ? "selected-button responses"
      : "responses"
  } ${props.item.showAnswer && "correct-answer responses"}`;

  const correctAnswerElement = (
    <button
      key={nanoid()}
      onClick={() =>
        props.handleSelectedAnswer(props.item.id, props.item.correct_answer)
      }
      className={correctAnswerClassName}
    >
      {decode(props.item.correct_answer)}
    </button>
  );

  const incorrectAnswerElements = props.item.incorrect_answers.map((answer) => {
    const incorrectAnswerClassName = `${
      props.item.selectedAnswer === answer
        ? "selected-button responses"
        : "responses"
    } ${
      props.item.showAnswer &&
      props.item.selectedAnswer === answer &&
      "incorrect-answer responses"
    }`;
    return (
      <button
        key={nanoid()}
        onClick={() => props.handleSelectedAnswer(props.item.id, answer)}
        className={incorrectAnswerClassName}
      >
        {decode(answer)}
      </button>
    );
  });

  // Create a new array with the incorrect answers AND the correct answer element so that the element order can be randomized
  const responses = [...incorrectAnswerElements, correctAnswerElement];

  // Randomize the order of the responses so that the answer is not always the last button; apply useEffect so the shuffle is only ran once and not each time the user clicks a response button
  useEffect(() => {
    const shuffleResponses = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    };
    shuffleResponses(responses);
  }, []);

  return (
    <div>
      <section className="bottom-border">
        <p>{decode(props.item.question)}</p>
        <div className="flex-plus-gap">{responses}</div>
      </section>
    </div>
  );
}

export default Questions;
