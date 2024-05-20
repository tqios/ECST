import React, { useState, useEffect } from "react";
import Timer from "./Timer";
import { useSelector, useDispatch } from "react-redux";
import { studyStop } from "../TodoRedux/currTodo.jsx";

function StopWatch() {
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [time, setTime] = useState(
    parseInt(localStorage.getItem("timerTime")) || 0
  );
  const dispatch = useDispatch();
  const isStudy = useSelector((state) => state.todoModifier.isStudy);

  useEffect(() => {
    let interval = null;

    if (isActive && !isPaused) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          const newTime = prevTime + 10;
          localStorage.setItem("timerTime", newTime); // Update local storage
          return newTime;
        });
      }, 10);
    } else {
      clearInterval(interval);
    }

    if (isStudy) {
      handleStart();
    } else {
      handlePauseResume();
    }

    return () => clearInterval(interval);
  }, [isActive, isPaused, isStudy]);

  const handleStart = () => {
    setIsActive(true);
    setIsPaused(false);
  };

  const handlePauseResume = () => {
    setIsActive(false);
  };

  const handleReset = () => {
    setIsActive(false);
    dispatch(studyStop());
    setTime(0);
    localStorage.setItem("timerTime", 0); // Reset local storage
  };

  return (
    <div className="stop-watch">
      <Timer time={time} />
    </div>
  );
}

export default StopWatch;
