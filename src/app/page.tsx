import { FaceRecognitionContainer } from "@/components/face-recognition-container";
import { FaceDetectionsTable } from "@/components/detections-table";
import { MetricsRow } from "@/components/metrics";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-900 text-white p-6 gap-6">
      <h1 className="text-2xl font-bold">Home</h1>

      <MetricsRow />

      <div className="flex flex-col lg:flex-row gap-6 flex-1">
        <FaceDetectionsTable />
        <FaceRecognitionContainer />
      </div>
    </div>
  );
}
