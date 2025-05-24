import { Expression, Gender } from "@/types";
import * as faceapi from "face-api.js";

// Same as faceapi.WithAge<faceapi.WithGender<faceapi.WithFaceExpressions<{ detection: faceapi.FaceDetection; }>>>
export type RawDetectionResult = {
  expressions: Record<Expression, number>;
  detection: faceapi.FaceDetection;
  genderProbability: number;
  gender: Gender;
  age: number;
};
