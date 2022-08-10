import React from "react";
import { v4 as uuidv4 } from "uuid";
import { decode } from "html-entities";
import "./Questions.css";

function Questions(props) {
  //console.log(props.id);

  // Create incorrect answer elements and incorrect answer class name
  const incorrectAnswersElements = props.item.incorrect_answers.map(
    (answer) => {
      const incorrectAnswerClassName = `${
        props.item.selectedAnswer === answer ? "selected-button" : "responses"
      }
        ${
          props.item.showAnswer &&
          props.item.selectedAnswer === answer &&
          "incorrect-answer"
        }`;
      return (
        <button
          key={uuidv4()}
          className={incorrectAnswerClassName}
          onClick={() => props.handleSelectedAnswer(props.item.id, answer)}
        >
          {decode(answer)}
        </button>
      );
    }
  );

  // Create correct answer element and class name
  const correctAnswerClassName = `
		${
      props.item.selectedAnswer === props.id.correct_answer
        ? "selected-button"
        : "responses"
    }
    ${props.item.showAnswer && "correct-answer"}`;

  const correctAnswerElement = (
    <button
      key={uuidv4()}
      className={correctAnswerClassName}
      onClick={() =>
        props.handleSelectedAnswer(props.item.id, props.item.correct_answer)
      }
    >
      {decode(props.item.correct_answer)}
    </button>
  );
  // Create a new array with the incorrect answers AND the correct answer element
  const responses = [...incorrectAnswersElements, correctAnswerElement];

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

  // Create the response button elements
  /*const responseButtons = responses.map((answer) => (
    <button key={uuidv4()} id={props.id} className="responses">
      {answer}
    </button>
  ));*/

  console.log("these are the buttons", responses);
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
