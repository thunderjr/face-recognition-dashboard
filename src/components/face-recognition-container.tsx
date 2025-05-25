"use client";

import { useEffect, useRef } from "react";

import { handleFaceDetections } from "@/lib/face-api/handle-face-detections";
import { WebcamContainer } from "./composites/webcam-container";
import { loadModels, saveDetectionLogs } from "@/lib/face-api";
import { initializeFaceEmbeddingStore } from "@/lib/libsql";

export const FaceRecognitionContainer = () => {
  const overlayRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    initializeFaceEmbeddingStore().then(loadModels);
  }, []);

  useEffect(() => {
    const intervalId = setInterval(
      () =>
        handleFaceDetections({ videoRef, overlayRef }).then(saveDetectionLogs),
      1000,
    );

    return () => clearInterval(intervalId);
  }, [videoRef, overlayRef]);

  return <WebcamContainer overlayRef={overlayRef} videoRef={videoRef} />;
};
