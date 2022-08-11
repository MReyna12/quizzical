import React from "react";
import { nanoid } from "nanoid";
// Because the questions and answers have random characters placed throughout the their respective text, I use decode to clean up both the questions and answers
import { decode } from "html-entities";
import "./Questions.css";

function Questions(props) {
  // Create the answer elements and classNames to alter the background color of the button clicked by the user and to display a different background once the user checks their responses
  const correctResponseClassName = `${
    props.item.selectedAnswer === props.item.correct_answer
      ? "selected-button responses"
      : "responses"
  } ${props.item.showAnswer && "correct-answer responses"}`;

  const correctResponseElement = (
    <button
      key={nanoid()}
      onClick={() =>
        props.handleSelectedAnswer(props.item.id, props.item.correct_answer)
      }
      className={correctResponseClassName}
    >
      {decode(props.item.correct_answer)}
    </button>
  );

  const incorrectResponseElements = props.item.incorrect_answers.map(
    (answer) => {
      const incorrectResponseClassName = `${
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
          className={incorrectResponseClassName}
        >
          {decode(answer)}
        </button>
      );
    }
  );

  // Create a new array with the incorrect answers AND the correct answer element so that the element order can be randomized
  const unsortedResponses = [
    correctResponseElement,
    ...incorrectResponseElements,
  ];

  // Randomize the order of the unsortedResponses so that the answer is not always the first button; compares the text of the correct/incorrect answers for each button (text is targeted via props.children)
  const sortedResponseElements = unsortedResponses.sort((a, b) =>
    a.props.children.localeCompare(b.props.children)
  );

  return (
    <div>
      <section className="bottom-border">
        <p>{decode(props.item.question)}</p>
        <div className="flex-plus-gap">{sortedResponseElements}</div>
      </section>
    </div>
  );
}

export default Questions;
