import React, { useEffect, useState } from "react";
import * as tmImage from "@teachablemachine/image";

import {} from //camState, STUDY_STATE
"../TodoRedux/Actions.jsx";
const Image = ({
  model_url,
  onPredict,
  preview = true,
  size = 200,
  info = true,
  interval = null,
}) => {
  const [prediction, setPrediction] = useState(null);
  let [webcam, setWebcam] = useState(null);
  const previewRef = React.useRef();
  const requestRef = React.useRef();
  const intervalRef = React.useRef();

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
    } else {
      intervalRef.current = setTimeout(loop, interval);
    }

    if (preview) {
      previewRef.current.replaceChildren(webcam.canvas);
    }

    if (!STUDY_STATE) {
      webcam.stop();
      console.log("stop");
    }

    async function loop() {
      if (webcam === null) {
      } else {
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
      setPrediction(prediction);
      if (onPredict) {
        onPredict(prediction);
      }
    }

    async function stop() {
      if (webcam) {
        webcam.stop(); // 웹캠 정지
        setWebcam(null); // 웹캠 상태 초기화
      } else {
        props.setGraphActive(false); // 그래프 업데이트 비활성화
        setWebcam(webcam);
        props.setGraphActive(false); // 그래프 업데이트 중단
      }
    }
    async function start() {
      const modelURL = model_url + "model.json";
      const metadataURL = model_url + "metadata.json";
      const model = await tmImage.load(modelURL, metadataURL);

      const flip = true; // whether to flip the webcam
      webcam = new tmImage.Webcam(size, size, flip); // width, height, flip
      await webcam.setup(); // request access to the webcam
      await webcam.play();
      setWebcam(webcam);

      props.setGraphActive(true); // 그래프 활성화

      if (interval === null) {
        requestRef.current = window.requestAnimationFrame(loop);
      } else {
        intervalRef.current = setTimeout(loop, interval);
      }

      if (preview) {
        previewRef.current.replaceChildren(webcam.canvas);
      }
    }
  }

  useEffect(() => {
    // init();
    return () => {
      if (interval === null) {
        cancelAnimationFrame(requestRef.current);
      } else {
        clearTimeout(intervalRef.current);
      }
      // document.querySelector('#webcam-container').firstChild?.remove();
    };
  }, [model_url]);

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
