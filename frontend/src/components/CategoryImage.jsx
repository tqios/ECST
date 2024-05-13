import React, { useEffect, useState } from "react";
import * as tmImage from "@teachablemachine/image";
import { useDispatch, useSelector, connect } from "react-redux";

import {
  todoElementMutator,
  studyStop,
  studyStart,
} from "../TodoRedux/currTodo.jsx";

import {} from //camState, STUDY_STATE
"../TodoRedux/Actions.jsx";
const Image = ({
  model_url,
  onPredict,
  preview = true,
  size,
  info = true,
  interval = null,

}) => {
  const [prediction, setPrediction] = useState(null);
  let [webcam, setWebcam] = useState(null);
  let [result, setResult] = useState("");
  const previewRef = React.useRef();
  const requestRef = React.useRef();
  const intervalRef = React.useRef();
  const dispatch = useDispatch();
  const isStudy = useSelector((state) => state.todoModifier.isStudy);

  async function init() {
    const modelURL = model_url + "model.json";
    const metadataURL = model_url + "metadata.json";
    const model = await tmImage.load(modelURL, metadataURL);

    const flip = true; // whether to flip the webcam
    webcam = new tmImage.Webcam(size, size, flip); // width, height, flip
    await webcam.setup(); // request access to the webcam
    await webcam.play();

    setWebcam(webcam);

    // setGraphActive(true); // 그래프 활성화

    if (interval === null) {
      requestRef.current = window.requestAnimationFrame(loop);
    } else {
      intervalRef.current = setTimeout(loop, interval);
    }

    if (preview) {
      previewRef.current.replaceChildren(webcam.canvas);
    }

    async function loop() {
      if (webcam !== null) {
        webcam.update(); // update the webcam frame
        await predict();
      }
      if (interval === null) {
        requestRef.current = window.requestAnimationFrame(loop);
      } else {
        intervalRef.current = setTimeout(loop, interval);
      }

    }
    async function predict() {
      // predict can take in an image, video or canvas html element
      const prediction = await model.predict(webcam.canvas);

      prediction.sort((a, b) => parseFloat(b.probability) - parseFloat(a.probability));
      setPrediction(prediction);
      setResult(prediction);
      console.log("category" ,prediction);
      if (onPredict) {
        onPredict(prediction);
      }
    }
  }

  async function stop() {
    if (webcam) {
      webcam.stop(); // 웹캠 정지
      setWebcam(null); // 웹캠 상태 초기화
      // setGraphActive(false);
    }

  }
  async function start() {
    init();
  }
  useEffect(() => {
    if (!isStudy) {
      console.log("Stop state detected");
      stop();
    } else {
      console.log("Start state detected");
      start();
    }

    return () => {
      if (interval === null) {
        cancelAnimationFrame(requestRef.current);
      } else {
        clearTimeout(intervalRef.current);
      }
    };
  }, [model_url, isStudy]);

  return (
    <div>
      <div id="webcam-container" ref={previewRef} />
      {
        result && <div>
            현재 상태 : {result[0].className} {(result[0].probability * 100).toFixed(1) + '%'}
          </div>
      }

    </div>
  );
};
export default Image;
