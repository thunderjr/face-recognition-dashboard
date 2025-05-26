import useSWRSubscription, { type SWRSubscription } from "swr/subscription";
import { useCallback } from "react";
import { mutate } from "swr";
import {
  query,
  orderBy,
  onSnapshot,
  QueryConstraint,
  limit as limitConstraint,
} from "firebase/firestore";

import { collection } from "@/lib/firebase/config";
import type { DetectionLog } from "@/types";

type Props = {
  limit: number;
};

export const useDetectionLogs = ({ limit = 50 }: Props) => {
  const subscribe: SWRSubscription<string, DetectionLog[], Error> = useCallback(
    (_, { next }) => {
      const constraints: QueryConstraint[] = [
        orderBy("timestamp", "desc"),
        limitConstraint(limit),
      ];

      const unsubscribe = onSnapshot(
        query(collection, ...constraints),
        (snapshot) => {
          const logsData = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as DetectionLog[];

          next(undefined, logsData);

          mutate("faces");
          mutate("metrics");
          mutate("totalFaces");
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
