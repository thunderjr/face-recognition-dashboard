import type { AppConfig } from "@/types";
import type {
  RawDetectionWithTimestamp,
  RawDetectionWithTimestampAndDistance,
} from "./types";

/**
 * Return an async high-order function to calculate and include distance in the detection result using the calibration constant from AppConfi using from AppConfig
 */
export function includeDistance(config: AppConfig) {
  return async (
    detection: RawDetectionWithTimestamp,
  ): Promise<RawDetectionWithTimestampAndDistance> => {
    const faceWidthPixels = detection.detection.box.width;

    const distance = config.calibrationConstant
      ? calculateFaceDistance(faceWidthPixels, config.calibrationConstant)
      : null;

    return {
      ...detection,
      distance_in_meters: distance,
    };
  };
}

/**
 * Calculate face distance in meters
 * @param {number} faceWidthPixels - Width of detected face in pixels
 * @param {number} calibrationConstant - Calibration value
 * @returns {number | null} Distance in meters
 */
function calculateFaceDistance(
  faceWidthPixels: number,
  calibrationConstant: number,
): number | null {
  if (faceWidthPixels <= 0) return null;
  return Math.round((calibrationConstant / faceWidthPixels) * 100) / 100;
}

/**
 * Calculate calibration constant
 * @param {number} knownDistanceMeters - Actual distance in meters
 * @param {number} measuredFaceWidthPixels - Face width in pixels at that distance
 * @returns {number} Calibration constant
 */
export function getCalibrationConstant(
  knownDistanceMeters: number,
  measuredFaceWidthPixels: number,
): number {
  return knownDistanceMeters * measuredFaceWidthPixels;
}
