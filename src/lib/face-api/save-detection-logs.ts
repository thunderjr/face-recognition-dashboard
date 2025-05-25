import type { RawDetectionWithTimestamp } from "@/lib/face-api/types";
import type { DetectionLog } from "@/types";

import { findSimilarFaceEmbedding, saveFaceEmbedding } from "@/lib/libsql";
import { addLogsBatch } from "@/lib/firebase/batch-write";
import { getHighestExpression } from "./expression";

export async function saveDetectionLogs(
  result: RawDetectionWithTimestamp[] | undefined,
) {
  if (!result || result.length === 0) return;

  const logs = await Promise.all(
    result.map(async (raw) => {
      // TODO: make a config for the interval to save a repeated face log
      // Check continously for when a face goes out of the frame and save again when it comes back

      const foundSimilarFace = await findSimilarFaceEmbedding(raw.descriptor);

      if (foundSimilarFace) return;

      const newFaceId = await saveFaceEmbedding(raw.descriptor);
      const { expression } = getHighestExpression(raw.expressions);

      return {
        distance_in_meters: 0, // TODO
        face_external_id: newFaceId,
        timestamp: raw.timestamp,
        gender: raw.gender,
        age: raw.age,
        expression,
      } as DetectionLog;
    }),
  ).then((logs) => logs.filter((log) => log !== undefined));

  await addLogsBatch(logs);
  console.log(`${logs.length} detections saved`);
}
