"use client";

import { useEffect, useRef } from "react";

import { handleFaceDetections } from "@/lib/face-api/handle-face-detections";
import { WebcamContainer } from "./composites/webcam-container";
import { loadModels } from "@/lib/face-api/load-models";

export const FaceRecognitionContainer = () => {
  const overlayRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    loadModels();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(
      () => handleFaceDetections({ videoRef, overlayRef }),
      500,
    );

    return () => clearInterval(intervalId);
  }, [videoRef, overlayRef]);

  return <WebcamContainer overlayRef={overlayRef} videoRef={videoRef} />;
};
