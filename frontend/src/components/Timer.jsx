import React from "react";
// import "./Timer.css";

export default function Timer({ time }) {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;

  return (
    <div className="timer">
      <span className="digits">{("0" + hours).slice(-2)}:</span>
      <span className="digits">{("0" + minutes).slice(-2)}:</span>
      <span className="digits">{("0" + seconds).slice(-2)}</span>
    </div>
  );
}
