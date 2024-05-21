import React, { useState, useEffect } from "react";
import Timer from "./Timer";
import { useSelector, useDispatch } from "react-redux";
import { studyStop } from "../TodoRedux/currTodo.jsx";

function StopWatch({ concentrationLevel }) {
  const [isActive, setIsActive] = useState(false);
  const [time, setTime] = useState(
    parseInt(localStorage.getItem("timerTime")) || 0
  );
  const dispatch = useDispatch();
  const isStudy = useSelector((state) => state.todoModifier.isStudy);

  useEffect(() => {
    let interval = null;
    console.log("시간 집계여부", concentrationLevel);

    if (isActive) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          const newTime = prevTime + 1; // 초 단위 증가
          localStorage.setItem("timerTime", newTime); // Update local storage
          return newTime;
        });
      }, 1000); // 1초마다 갱신
    } else {
      clearInterval(interval);
    }

    if (isStudy && concentrationLevel) {
      console.log("타이머 시작해야지");
      handleStart();
    } else {
      console.log("타이머 멈춰야지");
      handlePause();
    }

    return () => clearInterval(interval);
  }, [isStudy, concentrationLevel, isActive]);

  const handleStart = () => {
    setIsActive(true);
  };

  const handlePause = () => {
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
