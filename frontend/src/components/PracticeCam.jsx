import React, { useState, useRef, useEffect } from "react";
import TodoItem from "./TodoItem.jsx";
import Camerabtn from "./Camerabtn.jsx";
import Video from "./Video.jsx";
function PracticeCam() {
  const [stream, setStream] = useState(null);
  const videoRef = useRef(null);

  // //캠 시작 버튼
  // const start = async () => {
  //   try {
  //     const stream = await navigator.mediaDevices.getUserMedia({ video: true });
  //     setStream(stream);
  //     if (videoRef.current) {
  //       videoRef.current.srcObject = stream;
  //     }
  //   } catch (error) {
  //     console.error("Error accessing camera:", error);
  //   }
  // };
  // //캠 중지 버튼
  // const stop = () => {
  //   if (stream) {
  //     const tracks = stream.getTracks();
  //     tracks.forEach((track) => track.stop());
  //     setStream(null);
  //   }
  // };

  // useEffect(() => {
  //   start();
  //
  //   return () => {
  //     stop();
  //
  //     setStream(null);
  //   };
  // }, []);
  // const CameraButton = ({ onClick }) => {
  //   if (!stream) {
  //     return (
  //       <button className="btn btn-outline" onClick={start}>
  //         Start
  //       </button>
  //     );
  //   } else {
  //     return (
  //       <button className="btn btn-outline" onClick={stop}>
  //         Stop
  //       </button>
  //     );
  //   }
  // };

  return (
    <div>
      <br />
      <Video stream={stream} />
      {/*<Camerabtn*/}
      {/*  onClick={stream ? stop : start}*/}
      {/*  label={stream ? "Stop" : "Start"}*/}
      {/*/>*/}

      {/*{stream ? (*/}
      {/*  <button className="btn btn-outline" onClick={stopCamera}>*/}
      {/*    Stop*/}
      {/*  </button>*/}
      {/*) : (*/}
      {/*  <button className="btn btn-outline" onClick={startCamera}>*/}
      {/*    Start*/}
      {/*  </button>*/}
      {/*)}*/}
      {/*<CameraButton />*/}
    </div>
  );
}

export default PracticeCam;
