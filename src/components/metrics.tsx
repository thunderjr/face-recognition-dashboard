"use client";
import { AlarmCheck, CircleX, Clock, Users } from "lucide-react";
import { useMemo } from "react";

import { useDetectionMetrics } from "@/hooks/use-detection-metrics";
import { MetricsCard } from "./composites/metrics-card";
import { Skeleton } from "./ui/skeleton";

export const MetricsRow = () => {
  const { data: metrics, error, isLoading } = useDetectionMetrics();

  const skeleton = useMemo(
    () => <Skeleton className="h-4 w-24 bg-white/5" />,
    [],
  );

  if (error) {
    return (
      <MetricsCard
        title="Erro ao carregar métricas"
        value={error}
        icon={<CircleX className="h-6 w-6 text-blue-400 mr-2" />}
      />
    );
  }

  return (
    <div className="flex flex-row gap-4">
      <MetricsCard
        title="Total de Pessoas"
        value={isLoading ? skeleton : metrics?.totalFaces}
        icon={<Users className="h-6 w-6 text-blue-400 mr-2" />}
      />

      <MetricsCard
        title="Faces p/ hora"
        icon={<Clock className="h-6 w-6 text-blue-400 mr-2" />}
        value={isLoading ? skeleton : Math.floor(metrics?.facesPerHour || 0)}
      />

      <MetricsCard
        title="Faces p/ minuto"
        icon={<AlarmCheck className="h-6 w-6 text-blue-400 mr-2" />}
        value={isLoading ? skeleton : Math.floor(metrics?.facesPerMinute || 0)}
      />
    </div>
  );
};
