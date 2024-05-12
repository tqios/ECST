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
}) => {
  const [prediction, setPrediction] = useState(null);
  let [webcam, setWebcam] = useState(null);
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

    setGraphActive(true); // 그래프 활성화

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
      // if (webcam !== null && setGraphActive) {
      //   webcam.update(); // update the webcam frame
      //   await predict();
      //   if (interval === null) {
      //     requestRef.current = window.requestAnimationFrame(loop);
      //   } else {
      //     intervalRef.current = setTimeout(loop, interval);
      //   }
      // } else {
      //   // 그래프 비활성화 상태거나 웹캠이 없으면 루프 중지
      //   if (interval === null) {
      //     cancelAnimationFrame(requestRef.current);
      //   } else {
      //     clearTimeout(intervalRef.current);
      //   }
      // }
    }
    async function predict() {
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
      setGraphActive(false);
    }
    // else {
    //   setGraphActive(false); // 그래프 업데이트 비활성화
    //   setWebcam(webcam);
    //   setGraphActive(false); // 그래프 업데이트 비활성화
    //   //props.setGraphActive(false); // 그래프 업데이트 중단
    // }
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
      <button onClick={init}>START</button>
      <button onClick={stop}>STOP</button>
      <div id="webcam-container" ref={previewRef} />
      <div> status: {label}</div>
    </div>
  );
};
export default Image;
