import React from "react";
import Questions from "../Questions/Questions";
import { nanoid } from "nanoid";
import getQuestions from "../../services/getQuestions";
import { useState, useEffect } from "react";
import "./Quiz.css";

function Quiz(props) {
  // Create state variable to manage the data pulled from the trivia API
  const [triviaDataArray, setTriviaDataArray] = useState([]);
  // Create state variable to determine the total number of questions answered correctly -- start the count at zero and increase if user gets any answers correct
  const [correctAnswerCount, setCorrectAnswerCount] = useState(0);
  // Create state to manage if the quiz has ended or is ongoing -- default is false because the quiz is not over until the user selects all answers and presses the check answers button
  const [isQuizOver, setIsQuizOver] = useState(false);

  // Call fetch function (only once since the dependency is an empty array), which will return a fulfilled promise containing an array of objects holding trivia information and set the data to triviaDataArray;
  // because there is no unique id provided with each object returned in the array, nanoid is used to generate an id for each object;
  // selectedAnswer property is added to help hold the text value of the buttons clicked by the user;
  // showAnswer helps determine when the answers to the question should be displayed (we start off with a falsy value because answers shouldn't be displayed by default)
  useEffect(() => {
    getQuestions().then((questions) => {
      return setTriviaDataArray(
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

  // When any answer button to a question is selected, the id of the question object (questionId) and the text of the button are passed through as parameters;
  // when the question.id is matched to the id passed as a parameter, said question object and the text of the button clicked as returned
  function handleSelectedAnswer(questionId, answer) {
    if (!isQuizOver) {
      setTriviaDataArray((prevTriviaDataArray) =>
        prevTriviaDataArray.map((question) =>
          question.id === questionId
            ? { ...question, selectedAnswer: answer }
            : question
        )
      );
    }
  }

  // Check to see if all of the questions have been answered
  const allQuestionsAnswered = triviaDataArray.every(
    (question) => question.selectedAnswer !== ""
  );

  // If all questions have been answered then flip showAnswer to true;
  // this will be called when the user clicks the check answers button and the game is not over (game ends after answers have been displayed and user hits play again)
  function checkResponses() {
    if (allQuestionsAnswered) {
      setIsQuizOver(true);
      setTriviaDataArray((prevTriviaDataArray) =>
        prevTriviaDataArray.map((question) => ({
          ...question,
          showAnswer: true,
        }))
      );
    }
  }

  // Add up the total number of correct answers chosen by the user
  useEffect(() => {
    if (allQuestionsAnswered) {
      let totalCorrectAnswers = 0;
      // Check the value of selectedAnswer for each question object and if it matches the correct answer of said question object, then add 1 to the totalCorrectAnswers
      triviaDataArray.forEach((question) => {
        if (question.selectedAnswer === question.correct_answer) {
          totalCorrectAnswers += 1;
        }
      });
      setCorrectAnswerCount(totalCorrectAnswers);
    }
  }, [triviaDataArray]);

  // If the quiz is over, then this function will run to reset the state of isQuizOver;
  // the handler to start the quiz will then run, which causes the boolean value to be flipped from the previous value, thus allowing for the "home page" to be displayed
  function restartQuiz() {
    setIsQuizOver(false);
    props.handleQuizStart();
  }

  // Use the map method to create a Question component for each question object in the array (in our case this 5 because we fetch 5 questions)
  const questions = triviaDataArray.map((question) => (
    <Questions
      key={question.id}
      item={question}
      handleSelectedAnswer={handleSelectedAnswer}
    />
  ));

  return (
    <section>
      {questions}
      <div
        className={`flex-margin ${
          isQuizOver ? "play-again-container" : "check-answers-container"
        }
        }`}
      >
        {isQuizOver && (
          <h3>You got {correctAnswerCount}/5 questions correct!</h3>
        )}

        <button
          className="quiz-buttons"
          onClick={isQuizOver ? restartQuiz : checkResponses}
        >
          {isQuizOver ? "Play again" : "Check answers"}
        </button>
      </div>
    </section>
  );
}

export default Quiz;
