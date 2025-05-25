import { Expression, Gender } from "@/types";
import * as faceapi from "face-api.js";

export type FaceDetectionProps = {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  overlayRef: React.RefObject<HTMLCanvasElement | null>;
};

// Same as faceapi.WithAge<faceapi.WithGender<faceapi.WithFaceExpressions<{ detection: faceapi.FaceDetection; }>>>
export type RawDetectionResult = {
  descriptor: Float32Array<ArrayBufferLike>;
  expressions: Record<Expression, number>;
  detection: faceapi.FaceDetection;
  genderProbability: number;
  gender: Gender;
  age: number;
};

export type RawDetectionWithTimestamp = RawDetectionResult & {
  timestamp: number;
};
