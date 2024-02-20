import { useEffect, useRef, useState } from "react";
import { FaCirclePlay } from "react-icons/fa6";
import * as stream from "stream";
import { FaStopCircle } from "react-icons/fa";
import * as url from "url";

function Cam() {
  const videoRef = useRef(null);
  const [isplaying, setIsplaying] = useState(false);

  const initialImage = "/Users/ihana/Downloads/IMG_1345.JPG";

  //사용자 캠 접근
  const userCamera = () => {
    navigator.mediaDevices
      .getUserMedia({
        video: true,
      })
      .then((stream) => {
        let video = videoRef.current;
        video.srcObject = stream;

        // video.play();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    userCamera();
  }, []);

  //비디오 재생 및 중지
  const toggleBtn = () => {
    const video = videoRef.current;
    if (!isplaying) {
      setIsplaying(true);
      if (!video.srcObject) {
        navigator.mediaDevices
          .getUserMedia({
            video: true,
          })
          .then((stream) => {
            video.srcObject = stream;
            video.poster = "https://ibb.co/jvqpwm0";
            video.play(); // 비디오 재생
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        video.play();
      }
    } else {
      setIsplaying(false);
      video.pause();
    }
  };

  return (
    <div>
      <video
        ref={videoRef}
        className="text-center mt-4 rounded-lg w-22 h-auto bg-black"
        style={{ transform: "scaleX(-1)" }}
      ></video>

      <div className="text-center">
        <button onClick={toggleBtn} className="p-2">
          {isplaying ? <FaStopCircle /> : <FaCirclePlay />}
        </button>
      </div>
    </div>
  );
}

export default Cam;
