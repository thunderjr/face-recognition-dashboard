import type { RawDetectionWithTimestamp } from "@/lib/face-api/types";
import type { DetectionLog } from "@/types";

import { getHighestExpression } from "./expression";

export const parseDetectionLog = (
  raw: RawDetectionWithTimestamp,
): DetectionLog => {
  const { expression } = getHighestExpression(raw.expressions);
  return {
    distance_in_meters: 0, // TODO
    timestamp: raw.timestamp,
    gender: raw.gender,
    age: raw.age,
    expression,
  };
};
