"use client";

import { useEffect, useState } from "react";
import { CameraIcon } from "lucide-react";

import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Button } from "../ui/button";

type Props = {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  overlayRef?: React.RefObject<HTMLCanvasElement | null>;
};

export const WebcamContainer = ({ videoRef, overlayRef }: Props) => {
  const [cameraActive, setCameraActive] = useState(false);

  useEffect(() => {
    let stream: MediaStream | null = null;

    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setCameraActive(true);
        }
      } catch (err) {
        console.error("Erro ao acessar a câmera:", err);
      }
    };

    if (cameraActive) {
      startCamera();
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [cameraActive]);

  return (
    <div className="w-full max-w-4xl">
      <Card>
        <CardContent className="py-4 px-1 relative">
          <Button
            size="sm"
            className="absolute right-2 top-2 z-10"
            onClick={() => setCameraActive(!cameraActive)}
            variant={cameraActive ? "destructive" : "default"}
          >
            {cameraActive ? "Desativar" : "Ativar câmera"}
          </Button>

          <div className="aspect-video bg-white rounded-lg flex items-center justify-center overflow-hidden">
            {cameraActive ? (
              <div className="relative">
                <video
                  muted
                  autoPlay
                  playsInline
                  ref={videoRef}
                  className="w-full h-full object-cover"
                />
                <canvas
                  ref={overlayRef}
                  className="absolute top-0 left-0 w-full h-full"
                />
              </div>
            ) : (
              <CameraIcon className="h-12 w-12 text-gray-500" />
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
