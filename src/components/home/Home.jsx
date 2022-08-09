import React from "react";
import "./Home.css";

function Home() {
  return (
    <div>
      <div className="blobs yellow-blob"></div>
      <div className="blobs blue-blob"></div>
      <div className="centered">
        <h1>Quizzical</h1>
        <p className="top-bottom-spacing">Test your trivia skills!</p>
        <button>Start quiz</button>
      </div>
    </div>
  );
}

export default Home;
