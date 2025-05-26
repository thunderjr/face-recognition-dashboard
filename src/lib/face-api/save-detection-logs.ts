"use client";

import type { RawDetectionWithTimestampAndDistance } from "@/lib/face-api/types";
import type { AppConfig, DetectionLog } from "@/types";

import { addLogsBatch } from "@/lib/firebase/batch-write";
import { getHighestExpression } from "./expression";
import {
  saveFaceEmbedding,
  type FaceEmbeddingRow,
  findSimilarFaceEmbedding,
} from "@/lib/libsql";

const faceLastSeenMap = new Map<number, number>(); // Map<FaceId, LastSeenTimestamp>

export function handleSaveDetectionLogs({
  repeatedFaceLogIntervalSeconds,
  similarityThreshold,
}: AppConfig) {
  return async (result: RawDetectionWithTimestampAndDistance[] | undefined) => {
    if (!result || result.length === 0) return;

    const logs = await Promise.all(
      result.map(async (raw) => {
        const { shouldLog, foundFace } = await shouldSaveDetection(
          raw,
          similarityThreshold,
          repeatedFaceLogIntervalSeconds,
        );

        if (!shouldLog) return;

        const { expression } = getHighestExpression(raw.expressions);

        return {
          expression,
          age: raw.age,
          gender: raw.gender,
          timestamp: raw.timestamp,
          face_label: foundFace.label,
          face_external_id: foundFace.id,
          distance_in_meters: raw.distance_in_meters,
        } as DetectionLog;
      }),
    );

    const logsToSave = logs.filter((log) => log !== undefined);
    if (logsToSave.length === 0) {
      console.log("No detections to save");
      return;
    }

    await addLogsBatch(logsToSave);
    console.log(`${logsToSave.length} detections saved`);
  };
}

/**
 * Validates if a face detection should be logged based on the last seen timestamp
 */
export const validateRepeatedDetection = (
  faceId: number,
  currentTimestamp: number,
  intervalMs: number,
): boolean => {
  const lastLoggedTime = faceLastSeenMap.get(faceId);
  if (!lastLoggedTime) return true;

  const shouldSave = currentTimestamp - lastLoggedTime >= intervalMs;

  if (shouldSave) {
    faceLastSeenMap.set(faceId, currentTimestamp);
  }

  return shouldSave;
};

/**
 * Checks if a detection should be saved based on the similarity threshold and repeated face log interval
 */
async function shouldSaveDetection(
  raw: RawDetectionWithTimestampAndDistance,
  similarityThreshold: number,
  repeatedFaceLogIntervalSeconds: number,
): Promise<{
  shouldLog: boolean;
  foundFace: FaceEmbeddingRow;
}> {
  const foundSimilarFace = await findSimilarFaceEmbedding(
    raw.descriptor,
    similarityThreshold,
  );

  if (!foundSimilarFace) {
    const faceId = await saveFaceEmbedding(raw.descriptor);
    return {
      shouldLog: true,
      foundFace: { id: faceId },
    };
  }

  if (repeatedFaceLogIntervalSeconds === 0)
    return { shouldLog: false, foundFace: foundSimilarFace };

  const shouldSave = validateRepeatedDetection(
    foundSimilarFace.id,
    raw.timestamp,
    repeatedFaceLogIntervalSeconds * 1000,
  );

  return { shouldLog: shouldSave, foundFace: foundSimilarFace };
}
