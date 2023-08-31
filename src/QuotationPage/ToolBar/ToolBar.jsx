import React from "react";
import { ReactComponent as Edit } from "../../asset/icons/edit.svg";
import { ReactComponent as Currency } from "../../asset/icons/currency.svg";
import { ReactComponent as Calculator } from "../../asset/icons/calculator.svg";
import { ReactComponent as Add } from "../../asset/icons/add.svg";
import "./toolbar.scss";

const ToolBar = ({ popupTermModal, popupProductModal }) => {
  return (
    <>
      <div className="toolBar">
        <Edit className="icon" onClick={popupTermModal} />
        <Add className="icon" onClick={popupProductModal} />
        <Currency className="icon" />
        <Calculator className="icon" />
      </div>
    </>
  );
};

export default ToolBar;
