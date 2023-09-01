import { React, useState, useRef } from "react";
import { ReactComponent as ResetBtn } from "../../../asset/icons/reset.svg";
import { ReactComponent as CompleteBtn } from "../../../asset/icons/complete.svg";
import "./signature-box.scss";

const SignatureBox = ({ onSignatureDataChange }) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const canvasRef = useRef(null);
  const [signature, setSignature] = useState(null);

  //Signing Function
  const handleMouseDown = (e) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const { offsetX, offsetY } = e.nativeEvent;
    context.beginPath();
    context.moveTo(offsetX, offsetY);
  };

  const handleMouseMove = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const { offsetX, offsetY } = e.nativeEvent;
    context.lineCap = "round";
    context.lineJoin = "round";
    context.strokeStyle = "black";
    context.lineWidth = 2;
    context.lineTo(offsetX, offsetY);
    context.stroke();
  };

  const handleMouseUp = (e) => {
    setIsDrawing(false);
  };

  const handleMouseLeave = (e) => {
    if (isDrawing) {
      setIsDrawing(false);
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    setSignature(null);
  };

  const handleDownloadSignature = (e) => {
    const canvas = canvasRef.current;
    const dataURL = canvas.toDataURL("image/png");
    onSignatureDataChange(dataURL);
  };

  return (
    <div className="singZone">
      <canvas
        ref={canvasRef}
        width={700}
        height={300}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      />

      <div className="reset-btn">
        <ResetBtn onClick={clearCanvas} />
        <CompleteBtn onClick={handleDownloadSignature} />
      </div>
    </div>
  );
};

export default SignatureBox;
