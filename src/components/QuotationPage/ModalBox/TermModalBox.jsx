import React from "react";
import "./modal-box.scss";
import { ReactComponent as CloseBtn } from "../../../asset/icons/close.svg";

const TermModalBox = ({
  tradeInput,
  closeModal,
  handleSubmit,
  handleInputChange,
  clearInfo,
}) => {
  return (
    <div id="myModal" className="modal">
      <div className="modal-content">
        <span className="close" onClick={closeModal}>
          <CloseBtn />
        </span>

        <form action="submit" onSubmit={handleSubmit}>
          <label>Company Title</label>
          <input
            type="text"
            name="companyName"
            value={tradeInput.companyName}
            onChange={handleInputChange}
            required="required"
          />
          <label>Contactor</label>
          <input
            type="text"
            name="contactor"
            value={tradeInput.contactor}
            onChange={handleInputChange}
            required="required"
          />
          <label>Project</label>
          <input
            type="text"
            name="project"
            value={tradeInput.project}
            onChange={handleInputChange}
            required="required"
          />
          <label>Trade Term</label>
          <select onChange={handleInputChange} name="tradeTerm">
            <option value="EXW">EXW</option>
            <option value="FOB">FOB</option>
            <option value="CIF">CIF</option>
            <option value="DDU">DDU</option>
          </select>
          <label>Payment Term</label>
          <input
            type="text"
            name="paymentTerm"
            value={tradeInput.paymentTerm}
            onChange={handleInputChange}
            required="required"
          />
          <label>Expiry Date of Quotation</label>
          <input
            type="text"
            name="exp"
            value={tradeInput.exp}
            onChange={handleInputChange}
            required="required"
          />
          <label>Ship To</label>
          <input
            type="text"
            name="destination"
            value={tradeInput.destination}
            onChange={handleInputChange}
            required="required"
          />

          <button className="updateBtb">Submit</button>
          <button className="updateBtb" onClick={clearInfo}>
            Clear
          </button>
        </form>
      </div>
    </div>
  );
};

export default TermModalBox;
