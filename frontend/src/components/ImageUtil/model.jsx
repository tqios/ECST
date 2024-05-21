// model.js
import * as tmImage from "@teachablemachine/image";

export const loadModel = async (model_url) => {
  const modelURL = model_url + "model.json";
  const metadataURL = model_url + "metadata.json";
  return await tmImage.load(modelURL, metadataURL);
};

export const predict = async (model, webcam, setPrediction, setResult, onPredict, calculateAverage) => {
  console.log("predict");
  const prediction = await model.predict(webcam.canvas);
  prediction.sort((a, b) => parseFloat(b.probability) - parseFloat(a.probability));
  setPrediction(prediction);
  setResult(prediction);
  console.log("category", prediction);
  if (onPredict) {
    onPredict(prediction);
  }
  const concentration = prediction.find((p) => p.className === "Concentration");
  if (concentration) {
    calculateAverage(concentration.probability * 100);
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

