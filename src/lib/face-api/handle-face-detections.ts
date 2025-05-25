import * as faceapi from "face-api.js";

import type {
  RawDetectionResult,
  FaceDetectionParams,
  RawDetectionWithTimestamp,
  RawDetectionWithTimestampAndDistance,
} from "./types";

import { includeDistance } from "./distance";
import { drawDetections } from "./draw";

export async function handleFaceDetections(
  params: FaceDetectionParams,
): Promise<RawDetectionWithTimestampAndDistance[] | undefined> {
  const { overlayRef, videoRef } = params;
  if (videoRef.current && overlayRef.current) {
    const options = new faceapi.SsdMobilenetv1Options({
      minConfidence: params.config.modelMinConfidence,
    });

    const result = await faceapi
      .detectAllFaces(videoRef.current, options)
      .withFaceLandmarks()
      .withFaceDescriptors()
      .withFaceExpressions()
      .withAgeAndGender();

    const timestamp = Date.now();
    await drawDetections(params, result);

    const resultWithTimestamp = result.map(includeTimestamp(timestamp));

    return Promise.all(resultWithTimestamp.map(includeDistance));
  }
}

/**
 * Returns a high-order function to include a timestamp in the detections.
 * @param timestamp - The timestamp to include in the detection result.
 * @returns A function that takes a raw detection result and returns it with the timestamp included.
 */
function includeTimestamp(
  timestamp: number,
): (raw: RawDetectionResult) => RawDetectionWithTimestamp {
  return (raw) => ({
    ...raw,
    timestamp,
  });
}
