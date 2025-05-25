"use client";

import { useEffect, useRef } from "react";

import { handleFaceDetections } from "@/lib/face-api/handle-face-detections";
import { WebcamContainer } from "./composites/webcam-container";
import { loadModels, handleSaveDetectionLogs } from "@/lib/face-api";
import { initializeFaceEmbeddingStore } from "@/lib/libsql";
import { useAppConfig } from "@/context/app-config-context";

export const FaceRecognitionContainer = () => {
  const { config } = useAppConfig();

  const overlayRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    initializeFaceEmbeddingStore().then(loadModels);
  }, []);

  useEffect(() => {
    const intervalId = setInterval(
      () =>
        handleFaceDetections({ videoRef, overlayRef, config }).then(
          handleSaveDetectionLogs(config),
        ),
      1000,
    );

    return () => clearInterval(intervalId);
  }, [videoRef, overlayRef, config]);

  return <WebcamContainer overlayRef={overlayRef} videoRef={videoRef} />;
};
