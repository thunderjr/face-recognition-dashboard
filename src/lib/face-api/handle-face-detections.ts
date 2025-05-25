import * as faceapi from "face-api.js";

import { drawDetections } from "./draw";
import type {
  RawDetectionResult,
  FaceDetectionProps,
  RawDetectionWithTimestamp,
} from "./types";

const options = new faceapi.SsdMobilenetv1Options({
  minConfidence: 0.3,
});

export async function handleFaceDetections(
  elements: FaceDetectionProps,
): Promise<RawDetectionWithTimestamp[] | undefined> {
  const { overlayRef, videoRef } = elements;
  if (videoRef.current && overlayRef.current) {
    const result = await faceapi
      .detectAllFaces(videoRef.current, options)
      .withFaceLandmarks()
      .withFaceDescriptors()
      .withFaceExpressions()
      .withAgeAndGender();

    const timestamp = Date.now();
    await drawDetections(elements, result);

    return result.map(includeTimestamp(timestamp));
  }
}

function includeTimestamp(
  timestamp: number,
): (raw: RawDetectionResult) => RawDetectionResult & { timestamp: number } {
  return (raw) => ({
    ...raw,
    timestamp,
  });
}
