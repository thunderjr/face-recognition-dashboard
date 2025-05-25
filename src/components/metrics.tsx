"use client";

import { AlarmCheck, CircleX, Clock, Users } from "lucide-react";
import { useMemo } from "react";
import useSWR from "swr";

import { useDetectionMetrics } from "@/hooks/use-detection-metrics";
import { MetricsCard } from "./composites/metrics-card";
import { getFaceCount } from "@/lib/libsql";
import { Skeleton } from "./ui/skeleton";

export const MetricsRow = () => {
  const { data: metrics, error, isLoading } = useDetectionMetrics();
  const { data: totalFaces } = useSWR("totalFaces", getFaceCount);

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
    <div className="flex flex-col lg:flex-row gap-2 lg:gap-4">
      <MetricsCard
        title="Detecções"
        value={isLoading ? skeleton : metrics?.totalFaces}
        icon={<Users className="h-6 w-6 text-blue-400 mr-2" />}
      />

      <MetricsCard
        value={totalFaces}
        title="Faces únicas"
        icon={<Clock className="h-6 w-6 text-blue-400 mr-2" />}
      />

      <MetricsCard
        title="Faces únicas - Ultima hora"
        icon={<Clock className="h-6 w-6 text-blue-400 mr-2" />}
        value={isLoading ? skeleton : Math.floor(metrics?.facesInLastHour || 0)}
      />

      <MetricsCard
        title="Faces únicas - Ultimo minuto"
        icon={<AlarmCheck className="h-6 w-6 text-blue-400 mr-2" />}
        value={
          isLoading ? skeleton : Math.floor(metrics?.facesInLastMinute || 0)
        }
      />
    </div>
  );
};
