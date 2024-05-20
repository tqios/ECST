// model.js
import * as tmImage from "@teachablemachine/image";

export const loadModel = async (model_url) => {
  const modelURL = model_url + "model.json";
  const metadataURL = model_url + "metadata.json";
  return await tmImage.load(modelURL, metadataURL);
};
