import React, { useState, useRef, useEffect } from "react";
import TodoItem from "./TodoItem.jsx";
import Camerabtn from "./Camerabtn.jsx";
import Video from "./Video.jsx";
function PracticeCam() {
  const [stream, setStream] = useState(null);
  const videoRef = useRef(null);

  //캠 시작 버튼
  const start = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(stream);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };
  //캠 중지 버튼
  const stop = () => {
    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
      setStream(null);
    }
  };

  useEffect(() => {
    start();

    return () => {
      stop();

      setStream(null);
    };
  }, []);

  return (
    <div>
      <br />
      {/*<div*/}
      {/*  className="mt-4 rounded-lg"*/}
      {/*  style={{*/}
      {/*    backgroundImage: 'url("https://ifh.cc/g/ZaA3SL.jpg")', // 이미지 URL 설정*/}
      {/*    backgroundSize: "cover",*/}
      {/*    backgroundPosition: "center",*/}
      {/*    maxWidth: "150%",*/}
      {/*    height: "50vh", // 화면 전체 높이로 설정하려면 사용*/}
      {/*    display: "flex",*/}
      {/*    justifyContent: "center",*/}
      {/*    alignItems: "center",*/}
      {/*  }}*/}
      {/*>*/}
      <video
        className="text-center rounded-lg"
        ref={videoRef}
        autoPlay
        playsInline
        style={{
          maxWidth: "100%",
          transform: "scaleX(-1)",
          paddingRight: 0,
          backgroundColor: "transparent",
        }}
      />
      {/*</div>*/}

      {stream ? (
        <button className="btn btn-outline" onClick={stop}>
          Stop
        </button>
      ) : (
        <button className="btn btn-outline" onClick={start}>
          Start
        </button>
      )}
    </div>
  );
}

export default PracticeCam;
