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
        clearValues(num, true);
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
      } else {
        calculation.firstNum += num;
        setNumberDisplay1(numberDisplay1 + num);
        calculation.lastNum = "";
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
  //Function to do the calculation with the received values
  const operate = (num) => {
    const operators = {
      "+": (num1, num2) => parseFloat(num1) + parseFloat(num2),
      "-": (num1, num2) => parseFloat(num1) - parseFloat(num2),
      "/": (num1, num2) => parseFloat(num1) / parseFloat(num2),
      "%": (num1, num2) => parseFloat(num1) % parseFloat(num2),
      "*": (num1, num2) => parseFloat(num1) * parseFloat(num2),
    };

    let result = operators[calculation["operator"]](
      calculation.firstNum,
      calculation.secondNum
    );
    calculation.lastNum = result;
    setResult(result);

    setOperator2(true);
    setOperator(false);
    setFirstCalc(true);
  };

  //Function to clear the display and values of the object, for the next operation
  const clearValues = (num, calculateDnv) => {
    //If you are going to check if you have a result on the screen and click on a number, you will clear and enter the entered number.
    if (calculateDnv) {
      setCalculation({
        firstNum: num,
        operator: calculation.operator,
        secondNum: "",
      });
      setFirstClick(false);
      setResult("");
      setNumberDisplay1("");
      setNumberDisplay2("");
      setOperatorClicked("");
    } else {
      setCalculation({
        firstNum: "",
        operator: calculation.operator,
        secondNum: "",
      });
      setFirstClick(false);
      setResult("");
      setNumberDisplay1("");
      setNumberDisplay2("");
      setOperatorClicked("");
    }
  };

  const showError = () => {
    setResult("Error");
  };

  const calculateValue = (num) => {
    if (!isNaN(num) || num === "." || num === "backspace") {
      receivedValues(num);
    } else if (
      (num === "+" ||
        num === "-" ||
        num === "/" ||
        num === "*" ||
        num === "%") & operator2
    ) {
      receivedOperator(num);
    } else if (num === "C") {
      clearValues();
    } else if (num === "=") {
      if (calculation.secondNum !== "") {
        operate(num);
      } else {
        showError();
      }
    }
  };
  return (
    <div className="calculator-wrapper">
      <section className="calculator">
        <Display
          result={result}
          number1={calculation.firstNum}
          number2={calculation.secondNum}
          operator={operatorClicked}
        />
        <Buttons calculateBtn={calculateValue} />
      </section>
    </div>
  );
};

export default Calculate;
