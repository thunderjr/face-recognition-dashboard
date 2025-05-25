import useSWR from "swr";
import {
  query,
  count,
  where,
  getAggregateFromServer,
} from "firebase/firestore";

import { collection } from "@/lib/firebase/config";
import type { Metrics } from "@/types";

export const useDetectionMetrics = () => {
  return useSWR("metrics", fetchDetectionMetrics);
};

async function fetchDetectionMetrics(): Promise<Metrics> {
  const currentDate = new Date();

  const currentMinute = currentDate.setSeconds(0, 0);
  const minuteQuery = query(
    collection,
    where("timestamp", ">=", currentMinute),
  );

  const currentHour = currentDate.setMinutes(0, 0, 0);
  const hourQuery = query(collection, where("timestamp", ">=", currentHour));

  const [totalSnapshot, hourSnapshot, minuteSnapshot] = await Promise.all([
    getAggregateFromServer(collection, { totalFaces: count() }),
    getAggregateFromServer(hourQuery, { facesInLastHour: count() }),
    getAggregateFromServer(minuteQuery, { facesInLastMinute: count() }),
  ]);

  const totalFaces = totalSnapshot.data().totalFaces;
  const facesInLastHour = hourSnapshot.data().facesInLastHour;
  const facesInLastMinute = minuteSnapshot.data().facesInLastMinute;

  return {
    totalFaces,
    facesInLastHour,
    facesInLastMinute,
  };
}
