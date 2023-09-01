import React from "react";
import "./modal-box.scss";
import SignatureBox from "../SignatureBox/SignatureBox";
import { ReactComponent as CloseBtn } from "../../../asset/icons/close.svg";

const SignModal = ({ closeModal, onSignatureDataChange }) => {
  return (
    <div id="myModal" className="modal">
      <div className="modal-content">
        <span className="close" onClick={closeModal}>
          <CloseBtn />
        </span>
        <div className="sign">
          <div className="singZone">
            <SignatureBox onSignatureDataChange={onSignatureDataChange} />
          </div>

          {/* <div className="singZone">
            <SignatureBox />
            <p>CenterPeer.</p>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default SignModal;
