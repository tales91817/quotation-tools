import { React, useState, useRef } from "react";
import { ReactComponent as ResetBtn } from "../../asset/icons/reset.svg";

const SignatureBox = () => {
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
    console.log(offsetX, offsetY);
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
    console.log(offsetX, offsetY);
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
  return (
    <div className="myCompanySingZone">
      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      />
      <div className="reset-btn">
        <ResetBtn onClick={clearCanvas} />
      </div>
    </div>
  );
};

export default SignatureBox;
