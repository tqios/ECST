// model.js
import * as tmImage from "@teachablemachine/image";

const isConcentrateTimer = (() => {
  let lastCheckTime = Date.now();
  let belowThresholdDuration = 0; // 50% 미만 지속 시간
  let aboveThresholdDuration = 0; // 50% 이상 지속 시간
  let isConcentrating = true;

  return (value) => {
    const now = Date.now();
    if (value < 50) {
      belowThresholdDuration += now - lastCheckTime;
      aboveThresholdDuration = 0; // 임계값 이상 지속 시간 초기화
      if (belowThresholdDuration >= 1000) {
        isConcentrating = false;
      }
    } else {
      aboveThresholdDuration += now - lastCheckTime;
      belowThresholdDuration = 0; // 임계값 이하 지속 시간 초기화
      if (aboveThresholdDuration >= 1000) {
        isConcentrating = true;
      }
    }
    lastCheckTime = now;
    console.log("isConcentrateTimer : ", isConcentrating)
    return isConcentrating;
  };
})();

export const loadModel = async (model_url) => {
  const modelURL = model_url + "model.json";
  const metadataURL = model_url + "metadata.json";
  return await tmImage.load(modelURL, metadataURL);
};

export const predict = async (model, webcam, setPrediction, setResult, onPredict, calculateAverage, setConcentrationLevel) => {
  //console.log("predict");
  const prediction = await model.predict(webcam.canvas);
  prediction.sort((a, b) => parseFloat(b.probability) - parseFloat(a.probability));
  setPrediction(prediction);
  setResult(prediction);
  // console.log("category", prediction);

  if (onPredict) {
    onPredict(prediction);
  }
  const concentration = prediction.find((p) => p.className === "Concentration");
  if (concentration) {
    calculateAverage(concentration.probability * 100);
    setConcentrationLevel(isConcentrateTimer(concentration.probability*100));

  }
};

export const loop = (webcam, predictFunc, interval, requestRef, intervalRef) => {
  if (webcam !== null) {
    webcam.update(); // update the webcam frame
    predictFunc();
  }
  if (interval === null) {
    requestRef.current = window.requestAnimationFrame(() => loop(webcam, predictFunc, interval, requestRef, intervalRef));
  } else {
    intervalRef.current = setTimeout(() => loop(webcam, predictFunc, interval, requestRef, intervalRef), interval);
  }
};

