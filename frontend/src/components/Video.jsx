import React, { useRef, useEffect, useState } from "react";
import Camerabtn from "./Camerabtn.jsx";

const Video = ({ stream }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (stream && videoRef.current) {
      videoRef.current.srcObject = stream;
    }

    return () => {
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    };
  }, [stream]);

  return (
    <div
      className="mt-4 w-full"
      style={{
        backgroundImage: 'url("https://ifh.cc/g/ZaA3SL.jpg")', // 이미지 URL 설정
        backgroundSize: "cover",
        backgroundPosition: "center",
        maxWidth: "100%",
        height: "50vh", // 화면 전체 높이로 설정하려면 사용
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <video
        className="text-center rounded-lg  mt-4"
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
    </div>
  );
};

export default Video;
