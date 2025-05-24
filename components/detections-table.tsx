import type { ReactNode } from "react";

import { DataTable } from "./composites/data-table";
import type { DetectionLog, Expression } from "@/types";

const detections: DetectionLog[] = [
  {
    timestamp: "2025-05-23T14:32:15Z",
    distance: 2.3,
    age: 28,
    gender: "male",
    expression: "surprised",
  },
  {
    timestamp: "2025-05-23T14:31:42Z",
    distance: 1.8,
    age: 34,
    gender: "female",
    expression: "happy",
  },
  {
    timestamp: "2025-05-23T14:30:18Z",
    distance: 3.1,
    age: 42,
    gender: "male",
    expression: "neutral",
  },
  {
    timestamp: "2025-05-23T14:29:55Z",
    distance: 2.5,
    age: 19,
    gender: "female",
    expression: "neutral",
  },
  {
    timestamp: "2025-05-23T14:28:30Z",
    distance: 1.5,
    age: 31,
    gender: "male",
    expression: "happy",
  },
  {
    timestamp: "2025-05-23T14:27:12Z",
    distance: 2.8,
    age: 25,
    gender: "female",
    expression: "surprised",
  },
  {
    timestamp: "2025-05-23T14:26:45Z",
    distance: 3.2,
    age: 50,
    gender: "male",
    expression: "sad",
  },
  {
    timestamp: "2025-05-23T14:25:20Z",
    distance: 2.0,
    age: 37,
    gender: "female",
    expression: "happy",
  },
];

const formatTimestamp = (timestamp: string) => {
  const date = new Date(timestamp);
  return date.toLocaleTimeString();
};

const expressions: Record<Expression, string> = {
  disgusted: "Revoltado",
  fearful: "Medroso",
  happy: "Feliz",
  sad: "Triste",
  neutral: "Neutro",
  surprised: "Surpreso",
  angry: "Irritado",
};

const formatDetectionData = (
  data: DetectionLog,
): Record<keyof DetectionLog, ReactNode> => {
  return {
    age: data.age,
    distance: data.distance.toFixed(1),
    timestamp: formatTimestamp(data.timestamp),
    gender: data.gender === "male" ? "Masculino" : "Feminino",
    expression: expressions[data.expression] || data.expression,
  };
};

export const FaceDetectionsTable = () => {
  const detectionsColumns = {
    timestamp: "Horário",
    distance: "Distância (m)",
    age: "Idade Est.",
    gender: "Gênero",
    expression: "Expressão detectada",
  };

  return (
    <DataTable
      title="Últimas Detecções"
      columns={detectionsColumns}
      data={detections.map(formatDetectionData)}
    />
  );
};
