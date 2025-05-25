"use client";

import { useCallback, useEffect, useRef } from "react";

import { handleFaceDetections } from "@/lib/face-api/handle-face-detections";
import { loadModels, handleSaveDetectionLogs } from "@/lib/face-api";
import { WebcamContainer } from "./composites/webcam-container";
import { initializeFaceEmbeddingStore } from "@/lib/libsql";
import { useAppConfig } from "@/context/app-config-context";

export const FaceRecognitionContainer = () => {
  const { config, setCurrentFaceWidth } = useAppConfig();

  const overlayRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    initializeFaceEmbeddingStore().then(loadModels);
  }, []);

  const handleDistanceCalibration = useCallback(
    (data: Awaited<ReturnType<typeof handleFaceDetections>>) => {
      if (config.calibratingDistance && data && data.length > 0) {
        const width = data[0].detection.box.width;
        setCurrentFaceWidth(width);
      }
      return data;
    },
    [config.calibratingDistance, setCurrentFaceWidth],
  );

  useEffect(() => {
    const intervalId = setInterval(
      () =>
        handleFaceDetections({ videoRef, overlayRef, config })
          .then(handleDistanceCalibration)
          .then(handleSaveDetectionLogs(config)),
      1000,
    );

    return () => clearInterval(intervalId);
  }, [videoRef, overlayRef, config, setCurrentFaceWidth]);

  return <WebcamContainer overlayRef={overlayRef} videoRef={videoRef} />;
};
