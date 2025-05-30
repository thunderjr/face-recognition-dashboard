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

    const distance = config.distanceCalibrationConstant
      ? calculateFaceDistance(
          faceWidthPixels,
          config.distanceCalibrationConstant,
        )
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
 * @param {number} distanceCalibrationConstant - Calibration value
 * @returns {number | null} Distance in meters
 */
function calculateFaceDistance(
  faceWidthPixels: number,
  distanceCalibrationConstant: number,
): number | null {
  if (faceWidthPixels <= 0) return null;
  return (
    Math.round((distanceCalibrationConstant / faceWidthPixels) * 100) / 100
  );
}

/**
 * Calculate calibration constant
 * @param {number} knownDistanceMeters - Actual distance in meters
 * @param {number} measuredFaceWidthPixels - Face width in pixels at that distance
 * @returns {number} Calibration constant
 */
export function getDistanceCalibrationConstant(
  knownDistanceMeters: number,
  measuredFaceWidthPixels: number,
): number {
  return knownDistanceMeters * measuredFaceWidthPixels;
}
