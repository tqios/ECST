import React, { useEffect, useState, useRef } from "react";
import * as tmImage from "@teachablemachine/image";
import { useSelector } from "react-redux";

import {
  loadFromLocalStorage, // 로컬 스토리지에서 데이터 불러오기
  saveToLocalStorage, // 로컬 스토리지에 데이터 저장
  setupWebcam,
  loadModel,
  predict,
  loop
} from "./ImageUtil/route.ts";



const Image = ({
  model_url,
  onPredict,
  preview = true,
  size,
  info = true,
  interval = null,
  setGraphActive,
  handleStart,
  handleStop, setConcentrationLevel,
}) => {
  const [model, setModel] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [isConcentrating, setIsConcentrating] = useState(true);

  const [concentrationSum, setConcentrationSum] = useState(0);
  const [concentrationCount, setConcentrationCount] = useState(0);
  const [averageConcentration, setAverageConcentration] = useState(0);
  const [result, setResult] = useState("");
  let [webcam, setWebcam] = useState(null);
  const previewRef = useRef();
  const requestRef = useRef();
  const intervalRef = useRef();
  const isStudy = useSelector((state) => state.todoModifier.isStudy);
  const LOCAL_STORAGE_KEY = "average_concentration_data";

  useEffect(() => {
    // 컴포넌트가 마운트될 때 로컬 스토리지에서 데이터 불러오기
    const savedData = loadFromLocalStorage(LOCAL_STORAGE_KEY);
    if (savedData) {
      setConcentrationSum(savedData.sum);
      setConcentrationCount(savedData.count);
      setAverageConcentration(savedData.average);
    }
  }, []);

  const calculateAverage = (newConcentration) => {
    setConcentrationSum((prevSum) => {
      const newSum = prevSum + newConcentration;
      setConcentrationCount((prevCount) => {
        const newCount = prevCount + 1;
        const newAverage = newSum / newCount;
        setAverageConcentration(newAverage);

        // 로컬 스토리지에 데이터 저장
        saveToLocalStorage(LOCAL_STORAGE_KEY, {
          sum: newSum,
          count: newCount,
          average: newAverage,
        });

        return newCount;
      });
      return newSum;
    });
  };

  const start = async () => {
    const loadedModel = await loadModel(model_url);
    const setupWebcamInstance = await setupWebcam(size);

    setModel(loadedModel);
    setWebcam(setupWebcamInstance);

    if (interval === null) {
      requestRef.current = window.requestAnimationFrame(() =>
        loop(setupWebcamInstance, () => predict(loadedModel, setupWebcamInstance, setPrediction, setResult, onPredict, calculateAverage, setConcentrationLevel), interval, requestRef, intervalRef)
      );
      setGraphActive(true);
    } else {
      intervalRef.current = setTimeout(() =>
        loop(setupWebcamInstance, () => predict(loadedModel, setupWebcamInstance, setPrediction, setResult, onPredict, calculateAverage, setConcentrationLevel), interval, requestRef, intervalRef), interval);
    }

    if (preview) {
      previewRef.current.replaceChildren(setupWebcamInstance.canvas);
    }
  };

  const stop = async () => {
    if (webcam) {
      webcam.stop(); // 웹캠 정지
      setWebcam(null); // 웹캠 상태 초기화
      console.log("그래프 멈추라");
    }
  };

  useEffect(() => {
    if (!isStudy) {
      setGraphActive(false);
      console.log("Stop state detected");
      stop();
      setGraphActive(false); // 웹캠이 정지될 때 그래프도 비활성화
    } else {
      console.log("Start state detected=========");
      start();
    }



    return () => {
      stop(); // 컴포넌트가 언마운트될 때 웹캠 정지
      if (interval === null) {
        cancelAnimationFrame(requestRef.current);
      } else {
        clearTimeout(intervalRef.current);
      }
    };
  }, [model_url, isStudy, setGraphActive]);

  return (
      <div>

        <div id="webcam-container" ref={previewRef} className="rounded-lg"/>
        {result && (
            <div>
              현재 상태 : {result[0].className} {(result[0].probability * 100).toFixed(1) + "%"}
            </div>
        )}
        {info && (
            <div>
              {/*<p>Average Concentration: {averageConcentration.toFixed(2)}%</p>*/}
              {/* 로컬 스토리지에 저장된 오늘 하루 평균 집중도 표시 */}
            </div>
        )}
      </div>
  );

};

export default Image;
