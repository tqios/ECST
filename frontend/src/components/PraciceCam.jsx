import React, { useState, useRef, useEffect } from "react";

function PracticeCam() {
  const [stream, setStream] = useState(null);
  const videoRef = useRef(null);

  const startCamera = async () => {
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

  const stopCamera = () => {
    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
      setStream(null);
    }
  };

  return (
    <div>
      <br />
      <video
        className="text-center  rounded-lg w-22"
        ref={videoRef}
        autoPlay
        playsInline
        style={{
          maxWidth: "100%",
          transform: "scaleX(-1)",
        }}
      />
      {stream ? (
        <button className="btn btn-outline" onClick={stopCamera}>
          Stop Camera
        </button>
      ) : (
        <button className="btn btn-outline" onClick={startCamera}>
          Start Camera
        </button>
      )}
    </div>
  );
}
export default PracticeCam;
