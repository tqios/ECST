// webcam.js
import * as tmImage from "@teachablemachine/image";

export const setupWebcam = async (size) => {
  const flip = true; // whether to flip the webcam
  const webcam = new tmImage.Webcam(size, size, flip); // width, height, flip
  await webcam.setup(); // request access to the webcam
  await webcam.play();
  return webcam;
};
