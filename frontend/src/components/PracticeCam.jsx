import React, { useState, useRef, useEffect } from "react";
import TodoItem from "./TodoItem.jsx";
import Camerabtn from "./Camerabtn.jsx";
import Video from "./Video.jsx";
// import modelURL from "../my_model/model.json"
// import metadataURL from "../my_model/metadata.json"
import {ImageModel} from 'react-teachable-machine';

import * as tmImage from "@teachablemachine/image";
import axios from "axios";

// the link to your model provided by Teachable Machine export panel
// const URL = "../my_model/";
let model, webcam, labelContainer, maxPredictions;

function PracticeCam() {


  const start = async () => {
          // const URL = await axios.get("http://127.0.0.1:8081/my_model/")
      console.log("start")
          // console.log(URL);
          const modelURL = await axios.get("http://127.0.0.1:8081/model.json")
          const metadataURL = await axios.get("http://127.0.0.1:8081/metadata.json")
        console.log(modelURL)
        // load the model and metadata
        // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
        // or files from your local hard drive
        // Note: the pose library adds "tmImage" object to your window (window.tmImage)
        model = await tmImage.load(modelURL, metadataURL);
      console.log("dlrpdkseho")
        maxPredictions = model.getTotalClasses();

        // Convenience function to setup a webcam
        const flip = true; // whether to flip the webcam
        webcam = new tmImage.Webcam(200, 200, flip); // width, height, flip
        await webcam.setup(); // request access to the webcam
        await webcam.play();
        window.requestAnimationFrame(loop);

        // append elements to the DOM
        document.getElementById("webcam-container").appendChild(webcam.canvas);
        labelContainer = document.getElementById("label-container");
        for (let i = 0; i < maxPredictions; i++) { // and class labels
            labelContainer.appendChild(document.createElement("div"));
        }
  };

  const loop = async() => {
        webcam.update(); // update the webcam frame
        await predict();
        window.requestAnimationFrame(loop);
  }

  const predict = async() => {
    // predict can take in an image, video or canvas html element
        const prediction = await model.predict(webcam.canvas);
        for (let i = 0; i < maxPredictions; i++) {
            const classPrediction =
                prediction[i].className + ": " + prediction[i].probability.toFixed(2);
            labelContainer.childNodes[i].innerHTML = classPrediction;
        }
  }

  //캠 중지 버튼
  const stop = () => {
    // if (stream) {
    //   const tracks = stream.getTracks();
    //   tracks.forEach((track) => track.stop());
    //   setStream(null);
    // }
  };

  // useEffect(() => {
  //   start();
  //
  //   return () => {
  //     stop();
  //
  //     setStream(null);
  //   };
  // }, []);


  // 1초마다 sendFrameToAPI 함수 호출
  // useEffect(() => {
  //   const intervalId = setInterval(sendFrameToAPI, 1000);
  //
  //   return () => clearInterval(intervalId);
  // }, [stream]);

  return (
      <div>
          <button type="button" onClick={start}>Start</button>

          <div id="webcam-container"></div>
          <div id="label-container"></div>


          {/*{stream ? (*/}
          {/*  <button className="btn btn-outline" onClick={stop}>*/}
          {/*    Stop*/}
          {/*  </button>*/}
          {/*) : (*/}
          {/*  <button className="btn btn-outline" onClick={start}>*/}
          {/*    Start*/}
          {/*  </button>*/}
          {/*)}*/}
      </div>
  );
}

export default PracticeCam;
