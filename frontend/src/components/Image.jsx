import React, { useEffect, useState } from "react";
import * as tmImage from "@teachablemachine/image";
import { useDispatch, useSelector, connect } from "react-redux";

import { todoElementMutator, studyStop, studyStart} from "../TodoRedux/currTodo.jsx";

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
    onStart
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
    setGraphActive(true);

    dispatch(studyStart())

    if (interval === null) {
      requestRef.current = window.requestAnimationFrame(loop);
    } else {
      intervalRef.current = setTimeout(loop, interval);
    }

    if (preview) {
      previewRef.current.replaceChildren(webcam.canvas);
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


  }


   async function stop() {
      if (webcam) {
        webcam.stop(); // 웹캠 정지
        setWebcam(null); // 웹캠 상태 초기화
                setGraphActive(false); // 그래프 업데이트 비활성화
        dispatch(studyStop())
      } else {
        setWebcam(webcam);
        setGraphActive(false); // 그래프 업데이트 중단
      }
    }
    async function start() {

      init();
    }
  useEffect(() => {
    // init();
    if (!isStudy) {
      console.log("공분ㄴㄴㄴ")
      stop()
    } else {
      console.log("시작햇지!")
      start()
      // webcam.stop()
    }

    return () => {
      if (interval === null) {
        cancelAnimationFrame(requestRef.current);
      } else {
        clearTimeout(intervalRef.current);
      }
      // document.querySelector('#webcam-container').firstChild?.remove();
    };
  }, [model_url, isStudy]);

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
