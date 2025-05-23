"use client";

import { useRef } from "react";

import { WebcamContainer } from "./composites/webcam-container";

export const FaceRecognitionContainer = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  return <WebcamContainer videoRef={videoRef} />;
};
