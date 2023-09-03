import React from "react";
import { ReactComponent as CloseBtn } from "../../../asset/icons/close.svg";
import Axios from "axios";

const CurrencyModalBox = ({ handleAddProduct, closeModal }) => {
  return (
    <div id="myModal" className="modal">
      <div className="modal-content">
        <span className="close" onClick={closeModal}>
          <CloseBtn />
        </span>

        <button className="updateBtb" onClick={handleAddProduct}>
          Add Product
        </button>
        <button className="updateBtb">Clear</button>
      </div>
    </div>
  );
};

export default CurrencyModalBox;
