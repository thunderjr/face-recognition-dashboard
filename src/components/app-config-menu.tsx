"use client";

import { Settings, RotateCcw } from "lucide-react";

import { useAppConfig } from "../context/app-config-context";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";
import { Label } from "./ui/label";
import {
  DropdownMenu,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";

export const AppConfigMenu = () => {
  const { config, resetConfig, setModelMinConfidence, setSimilarityThreshold } =
    useAppConfig();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="fixed bottom-4 right-4" asChild>
        <Button className="rounded-full" variant="outline" asChild>
          <Settings className="w-14 h-14" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 rounded-lg">
        <DropdownMenuLabel>Configurações</DropdownMenuLabel>

        <DropdownMenuSeparator />

        <div className="px-4 py-6 space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label
                htmlFor="confidence-slider"
                className="text-sm font-medium"
              >
                Confiança para detecção de faces
              </Label>
              <span className="text-sm text-muted-foreground">
                {config.modelMinConfidence.toFixed(2)}
              </span>
            </div>

            <Slider
              id="confidence-slider"
              max={0.99}
              min={0.01}
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
