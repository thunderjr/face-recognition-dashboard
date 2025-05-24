"use client";

import { useEffect, useRef } from "react";

import type { RawDetectionWithTimestamp } from "@/lib/face-api/types";
import { WebcamContainer } from "./composites/webcam-container";
import { addLogsBatch } from "@/lib/firebase/batch-write";
import {
  loadModels,
  parseDetectionLog,
  getAndDrawFaceDetections,
} from "@/lib/face-api";

export const FaceRecognitionContainer = () => {
  const overlayRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    loadModels();
  }, []);

  useEffect(() => {
    async function saveDetections(
      detections: RawDetectionWithTimestamp[] | undefined,
    ) {
      if (!detections || detections.length === 0) return;
      await addLogsBatch(detections.map(parseDetectionLog));
      console.log(`${detections.length} detections saved`);
    }

    const intervalId = setInterval(
      () =>
        getAndDrawFaceDetections({ videoRef, overlayRef }).then(saveDetections),
      1000,
    );

    return () => clearInterval(intervalId);
  }, [videoRef, overlayRef]);

  return <WebcamContainer overlayRef={overlayRef} videoRef={videoRef} />;
};
