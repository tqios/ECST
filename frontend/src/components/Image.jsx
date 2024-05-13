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
  setGraphActive,
  handleStart,
  handleStop,
}) => {
  const [prediction, setPrediction] = useState(null);
  let [webcam, setWebcam] = useState(null);
  const previewRef = React.useRef();
  const requestRef = React.useRef();
  const intervalRef = React.useRef();
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

    if (interval === null) {
      requestRef.current = window.requestAnimationFrame(loop);
      console.log("1");
    } else {
      intervalRef.current = setTimeout(loop, interval);
      console.log("2");
    }

    if (preview) {
      previewRef.current.replaceChildren(webcam.canvas);
      console.log("3");
    }

    async function loop() {
      console.log("loop");
      if (webcam !== null) {
        webcam.update(); // update the webcam frame
        await predict();
        console.log("await predict");
      }
      if (interval === null) {
        requestRef.current = window.requestAnimationFrame(loop);
        console.log("4");
      } else {
        intervalRef.current = setTimeout(loop, interval);
        console.log("5");
      }
    }
    async function predict() {
      console.log("predict");
      // predict can take in an image, video or canvas html element
      const prediction = await model.predict(webcam.canvas);
      setPrediction(prediction);
      if (onPredict) {
        onPredict(prediction);
      }
    }
  }

  async function stop() {
    if (webcam) {
      webcam.stop(); // 웹캠 정지
      setWebcam(null); // 웹캠 상태 초기화
      //handleStop();
      console.log("그래프 멈추라");
    }
  }
  async function start() {
    init();
  }
  useEffect(() => {
    if (!isStudy) {
      console.log("Stop state detected");
      stop();
      setGraphActive(false); // 웹캠이 정지될 때 그래프도 비활성화
    } else {
      console.log("Start state detected");
      start();
      setGraphActive(true); // 웹캠이 시작될 때 그래프도 활성화
    }

    return () => {
      stop(); // 컴포넌트가 언마운트될 때 웹캠 정지
      setGraphActive(false); // 그래프 비활성화
      if (interval === null) {
        cancelAnimationFrame(requestRef.current);
      } else {
        clearTimeout(intervalRef.current);
      }
    };
  }, [model_url, isStudy, setGraphActive]);

  let label = [];
  if (info && prediction) {
    label = (
      <table id="label-container">
        <thead>
          <tr>
            <td>class name</td>
            <td>probability</td>
          </tr>
        </thead>
        <tbody>
          {prediction.map((p, i) => (
            <tr key={i}>
              <td>{p.className}</td>
              <td>{p.probability.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
  return (
    <div>
      <div id="webcam-container" ref={previewRef} />
      {/*<div> status: {label}</div>*/}
    </div>
  );
};
export default Image;
