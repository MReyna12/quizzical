import { useState } from "react";
import Home from "./components/home/Home";
import Quiz from "./components/quiz/Quiz";
import "./App.css";

function App() {
  // State management that determines whether or not the Home component should be displayed
  const [showQuiz, setShowQuiz] = useState(false);

  // Function that sets the state value for showQuiz--toggled once the button in the Home component is clicked
  function toggleDisplay() {
    setShowQuiz((prevShowQuiz) => !prevShowQuiz);
  }

  //console.log(showQuiz);

  return (
    <div>
      <div className="blobs yellow-blob"></div>
      <div className="blobs blue-blob"></div>
      {!showQuiz && <Home toggle={toggleDisplay} />}
      <Quiz />
    </div>
  );
}

export default App;
