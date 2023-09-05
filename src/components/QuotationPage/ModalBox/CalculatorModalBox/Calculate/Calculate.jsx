import React, { useState } from "react";
import Display from "../Display/Display";
import Buttons from "../Buttons/Buttons";
import "./calculate.scss";

const Calculate = () => {
  const [numberDisplay1, setNumberDisplay1] = useState("");
  const [numberDisplay2, setNumberDisplay2] = useState("");
  const [operatorClicked, setOperatorClicked] = useState("");
  const [result, setResult] = useState("");

  const [operator, setOperator] = useState(false);
  const [operator2, setOperator2] = useState(true);
  const [firstClick, setFirstClick] = useState(false);
  const [firstCalc, setFirstCalc] = useState(false);

  const [calculation, setCalculation] = useState({
    firstNum: "",
    operator: "",
    secondNum: "",
    lastNum: "",
  });

  const receivedValues = (num) => {
    if (operator === false) {
      if (firstCalc) {
        // clearValues(num, true)
        setFirstCalc(false);
      }
      if (num === ".") {
        calculation.firstNum += num;
        setNumberDisplay1(numberDisplay1 + num);
        calculation.lastNum = "";
      } else if (num === "backspace") {
        setCalculation({
          firstNum: calculation.firstNum.slice(0, -1),
          operator: "",
          secondNum: "",
        });
        setNumberDisplay1(numberDisplay1);
      }
    } else {
      if (num === ".") {
        calculation.secondNum += num;
        setNumberDisplay2(numberDisplay2 + num);
      } else if (num === "backspace") {
        setCalculation({
          firstNum: calculation.firstNum,
          operator: calculation.operator,
          secondNum: calculation.secondNum.slice(0, -1),
        });
      } else {
        calculation.secondNum += num;
        setNumberDisplay2(numberDisplay2 + num);
      }
    }
  };

  const receivedOperator = (num) => {
    calculation["operator"] = num;
    setOperatorClicked(num);
    setOperator(true);
    setOperator2(false);

    if (firstClick) {
      setCalculation({
        firstNum: calculation.lastNum,
        operator: calculation.operator,
        secondNum: "",
      });
      setNumberDisplay1(calculation.lastNum);
      setNumberDisplay2("");
    }
    setFirstClick(true);
  };
  return (
    <div>
      <section className="calculator">
        <Display />
        <Buttons />
      </section>
    </div>
  );
};

export default Calculate;
