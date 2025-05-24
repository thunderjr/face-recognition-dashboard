import { doc, writeBatch } from "firebase/firestore";

import type { DetectionLog } from "@/types";
import { db, collection } from "./config";

export const addLogsBatch = async (logs: Omit<DetectionLog, "id">[]) => {
  const batch = writeBatch(db);

  logs.forEach((log) => {
    const docRef = doc(collection);
    batch.set(docRef, log);
  });

  await batch.commit();
};
