import * as faceapi from "face-api.js";

const MODELS_URL = "/models";

export const loadModels = async () => {
  await faceapi.loadAgeGenderModel(MODELS_URL);
  await faceapi.loadFaceExpressionModel(MODELS_URL);
  await faceapi.loadFaceRecognitionModel(MODELS_URL);
  await faceapi.loadSsdMobilenetv1Model(MODELS_URL);

  console.log("face-api.js models loaded successfully!");
};
