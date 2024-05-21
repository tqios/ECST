import React from "react";
// import "./Timer.css";

export default function Timer(props) {
    return (
        <div className="timer">
            <span className="digits">
                {("0" + Math.floor((props.time / 1800000) % 24)).slice(-2)}:
            </span>
            <span className="digits">
                {("0" + Math.floor((props.time / 30000) % 60)).slice(-2)}:
            </span>
            <span className="digits">
                {("0" + Math.floor((props.time / 500) % 60)).slice(-2)}
            </span>
        </div>
    );
}
