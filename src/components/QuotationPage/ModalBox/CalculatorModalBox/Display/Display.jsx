import React from "react";
import "./display.scss";

const Display = ({ result, number1, number2, operator }) => {
  return (
    <div className="display-container">
      <p className="numbers">
        {number1} {operator} {number2}
      </p>
      <p className="results">{result}</p>
    </div>
  );
};

export default Display;
