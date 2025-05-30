"use client";

import { Settings, RotateCcw, Ruler } from "lucide-react";
import { useState } from "react";

import { getDistanceCalibrationConstant } from "@/lib/face-api/distance";
import { useAppConfig } from "../context/app-config-context";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import {
  DropdownMenu,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";

export const AppConfigMenu = () => {
  const {
    config,
    resetConfig,
    setModelMinConfidence,
    setCalibratingDistance,
    setSimilarityThreshold,
    setDistanceCalibrationConstant,
    setRepeatedFaceLogIntervalSeconds,
  } = useAppConfig();

  const [knownDistance, setKnownDistance] = useState<number>(0);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="fixed bottom-3 right-3" asChild>
        <Button className="rounded-full" asChild>
          <Settings className="w-14 h-14" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-96 rounded-lg">
        <DropdownMenuLabel>Configurações</DropdownMenuLabel>

        <DropdownMenuSeparator />

        <div className="p-4 space-y-5">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label
                htmlFor="confidence-slider"
                className="text-sm font-medium"
              >
                Qualidade minima para detecção
              </Label>
              <span className="text-sm text-muted-foreground">
                {config.modelMinConfidence.toFixed(2)}
              </span>
            </div>

            <Slider
              id="confidence-slider"
              max={0.99}
              min={0.1}
              step={0.01}
              className="w-full"
              value={[config.modelMinConfidence]}
              onValueChange={(value) => setModelMinConfidence(value[0])}
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="threshold-slider" className="text-sm font-medium">
                Similaridade para o face match
              </Label>
              <span className="text-sm text-muted-foreground">
                {config.similarityThreshold.toFixed(2)}
              </span>
            </div>

            <Slider
              id="threshold-slider"
              min={0}
              max={0.2}
              step={0.01}
              className="w-full"
              value={[config.similarityThreshold]}
              onValueChange={(value) => setSimilarityThreshold(value[0])}
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="interval-slider" className="text-sm font-medium">
                Intervalo para salvar face repetida
              </Label>

              <span className="text-sm text-muted-foreground">
                {config.repeatedFaceLogIntervalSeconds === 0
                  ? "Desativado"
                  : `${config.repeatedFaceLogIntervalSeconds}s`}
              </span>
            </div>

            <div className="text-xs text-muted-foreground mb-2">
              {config.repeatedFaceLogIntervalSeconds === 0
                ? "Faces repetidas não serão salvas"
                : "Intervalo mínimo entre logs da mesma face"}
            </div>

            <Slider
              id="interval-slider"
              min={0}
              max={300}
              step={5}
              className="w-full"
              value={[config.repeatedFaceLogIntervalSeconds]}
              onValueChange={(value) =>
                setRepeatedFaceLogIntervalSeconds(value[0])
              }
            />
          </div>

          <div className="space-y-3">
            <Label className="text-sm font-medium">
              Calibração de Distância
            </Label>

            {!config.calibratingDistance ? (
              <div className="space-y-2">
                <div className="text-xs text-muted-foreground">
                  Para calibrar a medição de distância, posicione-se a uma
                  distância conhecida da câmera.
                </div>

                <div className="flex gap-2">
                  <Input
                    min="0.1"
                    step="0.1"
                    type="number"
                    className="flex-1"
                    value={knownDistance || ""}
                    placeholder="Distância em metros"
                    onChange={(e) =>
                      setKnownDistance(parseFloat(e.target.value) || 0)
                    }
                  />

                  <Button
                    size="sm"
                    onClick={() => setCalibratingDistance(true)}
                    disabled={!knownDistance || knownDistance <= 0}
                  >
                    <Ruler className="h-4 w-4 mr-1" />
                    Calibrar
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="text-xs text-green-600">
                  Modo de calibração ativo. Mantenha-se na posição até detectar
                  seu rosto.
                </div>

                <div className="flex gap-2">
                  <div className="text-xs text-muted-foreground flex-1">
                    Largura do rosto:{" "}
                    {config.currentFaceWidth
                      ? `${config.currentFaceWidth?.toFixed(1)} px`
                      : "Detectando..."}
                  </div>

                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      if (config.currentFaceWidth && knownDistance) {
                        const constant = getDistanceCalibrationConstant(
                          knownDistance,
                          config.currentFaceWidth,
                        );

                        setDistanceCalibrationConstant(constant);
                        setCalibratingDistance(false);
                        setKnownDistance(0);
                      }
                    }}
                    disabled={!config.currentFaceWidth}
                  >
                    Confirmar
                  </Button>

                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      setCalibratingDistance(false);
                      setKnownDistance(0);
                    }}
                  >
                    Cancelar
                  </Button>
                </div>
              </div>
            )}

            {config.distanceCalibrationConstant && (
              <div className="text-xs text-muted-foreground">
                Constante de calibração:{" "}
                {config.distanceCalibrationConstant.toFixed(2)}
              </div>
            )}
          </div>
        </div>

        <DropdownMenuSeparator />

        <Button variant="ghost" className="w-full" onClick={resetConfig}>
          <RotateCcw className="h-4 w-4" />
          Restaurar configuração padrão
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
