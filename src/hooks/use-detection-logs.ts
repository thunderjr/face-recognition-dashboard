import useSWRSubscription, { type SWRSubscription } from "swr/subscription";
import { useCallback } from "react";
import { mutate } from "swr";
import {
  query,
  orderBy,
  onSnapshot,
  QueryConstraint,
} from "firebase/firestore";

import { collection } from "@/lib/firebase/config";
import type { DetectionLog } from "@/types";

export const useDetectionLogs = () => {
  const subscribe: SWRSubscription<string, DetectionLog[], Error> = useCallback(
    (_, { next }) => {
      const constraints: QueryConstraint[] = [orderBy("timestamp", "desc")];

      const unsubscribe = onSnapshot(
        query(collection, ...constraints),
        (snapshot) => {
          const logsData = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as DetectionLog[];

          next(undefined, logsData);
          mutate("metrics");
        },
        (err) => {
          next(err);
        },
      );

      return () => {
        unsubscribe();
      };
    },
    [],
  );

  return useSWRSubscription<DetectionLog[]>("detections", subscribe);
};
