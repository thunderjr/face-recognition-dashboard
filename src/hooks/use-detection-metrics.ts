import useSWR from "swr";
import {
  query,
  count,
  limit,
  orderBy,
  getDocs,
  getAggregateFromServer,
} from "firebase/firestore";

import { collection } from "@/lib/firebase/config";
import type { Metrics } from "@/types";

export const useDetectionMetrics = () => {
  return useSWR("metrics", fetchDetectionMetrics);
};

export async function fetchDetectionMetrics(): Promise<Metrics> {
  const totalSnapshot = await getAggregateFromServer(collection, {
    totalFaces: count(),
  });

  const totalFaces = totalSnapshot.data().totalFaces;
  if (totalFaces === 0) {
    return {
      totalFaces: 0,
      facesPerHour: 0,
      facesPerMinute: 0,
    };
  }

  const earliestQuery = query(
    collection,
    orderBy("timestamp", "asc"),
    limit(1),
  );

  const earliestSnapshot = await getDocs(earliestQuery);
  if (earliestSnapshot.empty) {
    return {
      totalFaces,
      facesPerHour: 0,
      facesPerMinute: 0,
    };
  }

  const earliestDoc = earliestSnapshot.docs[0];
  const earliestTimestamp = earliestDoc.data().timestamp;

  const elapsedMs = Date.now() - earliestTimestamp;
  const elapsedHours = elapsedMs / (1000 * 60 * 60);
  const elapsedMinutes = elapsedMs / (1000 * 60);

  return {
    totalFaces,
    facesPerHour: elapsedHours > 0 ? totalFaces / elapsedHours : totalFaces,
    facesPerMinute:
      elapsedMinutes > 0 ? totalFaces / elapsedMinutes : totalFaces,
  };
}
