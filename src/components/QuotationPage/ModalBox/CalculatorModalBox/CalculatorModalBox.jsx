import React, { useState } from "react";
import "./calculator-modalbox.scss";
import { ReactComponent as CloseBtn } from "../../../../asset/icons/close.svg";
import Calculate from "./Calculate/Calculate";

const CalculatorModalBox = ({ closeModal }) => {
  const [result, setResult] = useState("");
  const handleClick = (e) => {
    setResult(result.concat(e.target.name));
  };

  const clear = () => {
    setResult("");
  };

  const backspace = () => {
    setResult(result.slice(0, -1));
  };

  const calculate = () => {
    try {
      setResult(eval(result).toString());
    } catch (err) {
      setResult("Error");
    }
  };
  return (
    <div id="myModal" className="modal">
      <div className="modal-content">
        <span className="close" onClick={closeModal}>
          <CloseBtn />
        </span>
        <div className="calculator-container">
          <Calculate />
        </div>
      </div>
    </div>
  );
};

export default CalculatorModalBox;
