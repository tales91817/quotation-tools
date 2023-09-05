import React from "react";
import { ReactComponent as Edit } from "../../asset/icons/edit.svg";
import { ReactComponent as Currency } from "../../asset/icons/currency.svg";
import { ReactComponent as Calculator } from "../../asset/icons/calculator.svg";
import { ReactComponent as Add } from "../../asset/icons/add.svg";
import { ReactComponent as PDF } from "../../asset/icons/PDF.svg";
import { ReactComponent as Sign } from "../../asset/icons/sign.svg";

import "./toolbar.scss";

const ToolBar = ({
  popupTermModal,
  popupProductModal,
  transferToPDF,
  popupSignModal,
  popupCurrnecyModal,
  popupCalculatorModal,
}) => {
  return (
    <>
      <div className="toolBar">
        <Edit className="icon" onClick={popupTermModal} />
        <Add className="icon" onClick={popupProductModal} />
        <Sign className="icon" onClick={popupSignModal} />
        <PDF className="icon" onClick={transferToPDF} />
        <Currency className="icon" onClick={popupCurrnecyModal} />
        <Calculator className="icon" onClick={popupCalculatorModal} />
      </div>
    </>
  );
};

export default ToolBar;
