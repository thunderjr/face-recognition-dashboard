"use client";

import type { RawDetectionWithTimestampAndDistance } from "@/lib/face-api/types";
import type { AppConfig, DetectionLog } from "@/types";

import { findSimilarFaceEmbedding, saveFaceEmbedding } from "@/lib/libsql";
import { addLogsBatch } from "@/lib/firebase/batch-write";
import { getHighestExpression } from "./expression";

export function handleSaveDetectionLogs({ similarityThreshold }: AppConfig) {
  return async (result: RawDetectionWithTimestampAndDistance[] | undefined) => {
    if (!result || result.length === 0) return;

    const logs = await Promise.all(
      result.map(async (raw) => {
        // TODO: make a config for the interval to save a repeated face log
        // Check continously for when a face goes out of the frame and save again when it comes back

        const foundSimilarFace = await findSimilarFaceEmbedding(
          raw.descriptor,
          similarityThreshold,
        );

        if (foundSimilarFace) return;

        const newFaceId = await saveFaceEmbedding(raw.descriptor);
        const { expression } = getHighestExpression(raw.expressions);

        return {
          expression,
          age: raw.age,
          gender: raw.gender,
          timestamp: raw.timestamp,
          face_external_id: newFaceId,
          distance_in_meters: raw.distance_in_meters,
        } as DetectionLog;
      }),
    ).then((logs) => logs.filter((log) => log !== undefined));

    await addLogsBatch(logs);
    console.log(`${logs.length} detections saved`);
  };
}
