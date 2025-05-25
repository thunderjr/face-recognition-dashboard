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
    <div className="w-full lg:w-[30%]">
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader className="p-4 pb-0">
          <CardTitle className="flex justify-between items-center">
            <span>Câmera</span>
            <Button
              variant={cameraActive ? "destructive" : "default"}
              onClick={() => setCameraActive(!cameraActive)}
              size="sm"
            >
              {cameraActive ? "Desativar" : "Ativar"}
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-3">
          <div className="aspect-video bg-slate-700 rounded-lg flex items-center justify-center overflow-hidden">
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
              <CameraIcon className="h-12 w-12 text-slate-500" />
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
