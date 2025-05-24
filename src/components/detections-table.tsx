"use client";
import type { ReactNode } from "react";

import { translateExpression, translateGender } from "@/lib/translation";
import { useDetectionLogs } from "@/hooks/use-detection-logs";
import { DataTable } from "./composites/data-table";
import type { DetectionLog } from "@/types";
import { Card } from "./ui/card";

const formatDetectionData = (
  data: DetectionLog,
): Record<keyof Omit<DetectionLog, "id">, ReactNode> => {
  return {
    age: data.age,
    gender: translateGender(data.gender),
    expression: translateExpression(data.expression),
    distance_in_meters: data.distance_in_meters.toFixed(1),
    timestamp: new Date(data.timestamp).toLocaleTimeString(),
  };
};

export const FaceDetectionsTable = () => {
  const { data: logs, error } = useDetectionLogs();

  const detectionsColumns = {
    timestamp: "Horário",
    distance_in_meters: "Distância (m)",
    age: "Idade",
    gender: "Gênero",
    expression: "Expressão detectada",
  };

  if (error) {
    return (
      <div className="flex-1">
        <Card className="bg-slate-800 border-slate-700 max-h-full p-12 grid place-items-center">
          <div>Erro ao carregar detecções:</div>
          <pre>{error}</pre>
        </Card>
      </div>
    );
  }

  return (
    <DataTable
      title="Últimas Detecções"
      columns={detectionsColumns}
      isLoading={logs?.length === 0}
      data={(logs || []).map(formatDetectionData)}
    />
  );
};
