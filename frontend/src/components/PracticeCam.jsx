import React, { useState, useRef, useEffect } from "react";
import TodoItem from "./TodoItem.jsx";
import Camerabtn from "./Camerabtn.jsx";
import Video from "./Video.jsx";

function PracticeCam() {
  const [stream, setStream] = useState(null);
  const videoRef = useRef(null);

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

  const sendFrameToAPI = async () => {
    if (stream) {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

      const dataURL = canvas.toDataURL("image/jpeg");

      // 데이터를 서버로 전송하는 코드
      try {
        const response = await fetch("http://127.0.0.1:8001/api/video-frame", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ frame: dataURL }),
        });

        if (response.ok) {
          console.log("Frame sent successfully");
        } else {
          console.error("Failed to send frame");
        }
      } catch (error) {
        console.error("Error sending frame:", error);
      }
    }
  };

  // 1초마다 sendFrameToAPI 함수 호출
  useEffect(() => {
    const intervalId = setInterval(sendFrameToAPI, 1000);

    return () => clearInterval(intervalId);
  }, [stream]);

  return (
    <div>
      <br />
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
