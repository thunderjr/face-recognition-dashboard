import { FaceRecognitionContainer } from "@/components/face-recognition-container";
import { FaceDetectionsTable } from "@/components/detections-table";
import { UniqueFacesTable } from "@/components/unique-faces-table";
import { MetricsRow } from "@/components/metrics";

export default function Home() {
  return (
    <div className="flex flex-col-reverse lg:flex-col min-h-screen bg-slate-900 text-white p-6 gap-6">
      <MetricsRow />

      <div className="flex flex-col-reverse lg:flex-row gap-6 flex-1">
        <FaceDetectionsTable />
        <UniqueFacesTable />

        <FaceRecognitionContainer />
      </div>
    </div>
  );
}
