import React from "react";
import "./calculator-modalbox.scss";
import { ReactComponent as CloseBtn } from "../../../../asset/icons/close.svg";
import Calculate from "./Calculate/Calculate";

const CalculatorModalBox = ({ closeModal }) => {
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
