import { AlarmCheck, Clock, Users } from "lucide-react";

import { FaceRecognitionContainer } from "@/components/face-recognition-container";
import { FaceDetectionsTable } from "@/components/detections-table";
import { MetricsCard } from "@/components/composites/metrics-card";
import type { Metrics } from "@/types";

const metrics: Metrics = {
  totalFaces: 247,
  facesPerHour: 45,
  facesPerMinute: 3,
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-900 text-white p-6 gap-6">
      <h1 className="text-2xl font-bold">Home</h1>

      <div className="flex flex-row gap-4">
        <MetricsCard
          title="Total de Pessoas"
          value={metrics.totalFaces}
          icon={<Users className="h-6 w-6 text-blue-400 mr-2" />}
        />

        <MetricsCard
          title="Faces p/ hora"
          value={metrics.facesPerHour}
          icon={<Clock className="h-6 w-6 text-blue-400 mr-2" />}
        />

        <MetricsCard
          title="Faces p/ minuto"
          value={metrics.facesPerMinute}
          icon={<AlarmCheck className="h-6 w-6 text-blue-400 mr-2" />}
        />
      </div>

      <div className="flex flex-col lg:flex-row gap-6 flex-1">
        <FaceDetectionsTable />

        <FaceRecognitionContainer />
      </div>
    </div>
  );
}
