"use client";

import { AlarmCheck, CircleX, Clock, Users } from "lucide-react";
import { useMemo } from "react";
import useSWR from "swr";

import { useDetectionMetrics } from "@/hooks/use-detection-metrics";
import { MetricCard } from "./composites/metrics-card";
import { getFaceCount } from "@/lib/libsql";
import { Skeleton } from "./ui/skeleton";

export const Metrics = () => {
  const { data: metrics, error, isLoading } = useDetectionMetrics();
  const { data: totalFaces } = useSWR("totalFaces", getFaceCount);

  const skeleton = useMemo(
    () => <Skeleton className="h-4 w-24 bg-white/5" />,
    [],
  );

  if (error) {
    return (
      <MetricCard
        value={error}
        title="Erro ao carregar métricas"
        icon={<CircleX className="h-6 w-6 text-red-400 mr-2" />}
      />
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-2 lg:gap-4">
      <MetricCard
        title="Faces detectadas - Total"
        value={isLoading ? skeleton : metrics?.totalFaces}
        icon={<Users className="h-6 w-6 text-red-400 mr-2" />}
      />

      <MetricCard
        value={totalFaces}
        title="Faces únicas"
        icon={<Clock className="h-6 w-6 text-red-400 mr-2" />}
      />

      <MetricCard
        title="Detecções - Ultima hora"
        icon={<Clock className="h-6 w-6 text-red-400 mr-2" />}
        value={isLoading ? skeleton : Math.floor(metrics?.facesInLastHour || 0)}
      />

      <MetricCard
        title="Detecções - Ultimo minuto"
        icon={<AlarmCheck className="h-6 w-6 text-red-400 mr-2" />}
        value={
          isLoading ? skeleton : Math.floor(metrics?.facesInLastMinute || 0)
        }
      />
    </div>
  );
};
