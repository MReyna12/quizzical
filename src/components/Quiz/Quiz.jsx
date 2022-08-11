import React from "react";
import Questions from "../Questions/Questions";
import { nanoid } from "nanoid";
import getQuestions from "../../services/getQuestions";
import { useState, useEffect } from "react";
import "./Quiz.css";

function Quiz(props) {
  // Create state variable to manage the data pulled from the trivia API
  const [triviaData, setTriviaData] = useState([]);
  // Create state variable to determine the total number of questions answered correctly
  const [correctAnswerCount, setCorrectAnswerCount] = useState(0);
  // Create state to manage if the quiz has ended or is ongoing
  const [isQuizOver, setIsQuizOver] = useState(false);

  // Call fetch function to make fetch request and set the data to triviaData
  useEffect(() => {
    getQuestions().then((questions) => {
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
    if (!isQuizOver) {
      setTriviaData((prevTriviaData) =>
        prevTriviaData.map((question) =>
          question.id === questionId
            ? { ...question, selectedAnswer: answer }
            : question
        )
      );
    }
  }

  // Check to see if all of the questions have been answered
  const allQuestionsAnswered = triviaData.every(
    (question) => question.selectedAnswer !== ""
  );

  // If all questions have been answered then flip showAnswer to true;
  // this will be called when the user clicks the check answers button and the game is not over (game ends after answers have been displayed and user hits play again)
  function checkResponses() {
    if (allQuestionsAnswered) {
      setIsQuizOver(true);
      setTriviaData((prevTriviaData) =>
        prevTriviaData.map((question) => ({
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

      triviaData.forEach((question) => {
        if (question.selectedAnswer === question.correct_answer) {
          totalCorrectAnswers += 1;
        }
      });
      setCorrectAnswerCount(totalCorrectAnswers);
    }
  }, [triviaData]); // Why use the data array?

  // If the quiz is over, then this function will run to reset the state of isQuizOver;
  // the handler to start the quiz will then run, which causes the boolean value to be flipped from the previous value, thus allowing for the "home page" to be displayed
  function restartQuiz() {
    setIsQuizOver(false);
    props.handleQuizStart();
  }

  // Set data in the questionsArray
  const questions = triviaData.map((question) => (
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
