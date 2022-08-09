import React from "react";

function Questions(props) {
  console.log(props);
  return (
    <div>
      <section>
        <p>{props.question}</p>
      </section>
    </div>
  );
}

export default Questions;
