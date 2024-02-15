import {useEffect, useRef, useState} from 'react';
import {FaCirclePlay} from "react-icons/fa6";
import * as stream from "stream";
import {FaStopCircle} from "react-icons/fa";

function Cam() {
    const videoRef = useRef(null);
    const [isplaying, setIsplaying] = useState(false);

    //사용자 캠 접근
    const userCamera = () => {
        navigator.mediaDevices.getUserMedia({
            video: true
        }).then((stream) => {
            let video = videoRef.current;
            video.srcObject = stream;

            video.play();
        }).catch((error) => {
            console.log(error);
        })

    }

    useEffect(() => {
        userCamera()
    }, [videoRef]);






    //비디오 재생 및 중지
    const toggleBtn = () => {
         setIsplaying(!isplaying);
        const video = videoRef.current;
        if (video) {
            if (isplaying) {
                video.pause();
            } else {
                video.play();
            }

        }
    }


    return (
        <div>
<video ref={videoRef} className="text-center mt-4 rounded-lg w-22 h-auto" style={{transform: 'scaleX(-1)'}}></video>
            <div className="text-center">
                <button onClick={toggleBtn} className="p-2">
                    {isplaying ? <FaStopCircle/> : <FaCirclePlay/>}
                </button>



            </div>
        </div>

    );
}


export default Cam;