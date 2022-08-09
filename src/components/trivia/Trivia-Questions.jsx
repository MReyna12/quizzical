import React from "react";
import { v4 as uuidv4 } from "uuid";
import "./Trivia-Questions.css";

function Questions(props) {
  //console.log(props.id);
  // Create a new array with the incorrect answers AND the correct answer
  const responses = props.item.incorrect_answers.map((response) => response);
  responses.push(props.item.correct_answer);

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
  const responseButtons = responses.map((answer) => (
    <button key={uuidv4()} className="responses">
      {answer}
    </button>
  ));

  //console.log("these are the buttons", responseButtons);
  return (
    <div>
      <section className="bottom-border">
        <p>{props.item.question}</p>
        <div className="flex-plus-gap">{responseButtons}</div>
      </section>
    </div>
  );
}

export default Questions;
