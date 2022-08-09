import React from "react";
import "./Trivia-Questions.css";

function Questions(props) {
  // Create a new array with the incorrect answers AND the correct answer
  const responses = props.incorrectAnswer.map((response) => response);
  responses.push(props.correctAnswer);

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

  // Create the respone button elements
  const responseButtons = responses.map((answer) => <button>{answer}</button>);

  return (
    <div>
      <section>
        <p>{props.question}</p>
        {responseButtons}
      </section>
    </div>
  );
}

export default Questions;
