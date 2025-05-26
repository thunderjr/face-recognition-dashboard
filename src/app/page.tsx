import { FaceRecognitionContainer } from "@/components/face-recognition-container";
import { TextAnswersComponent } from "@/components/composites/test-answers";
import { FaceDetectionsTable } from "@/components/detections-table";
import { UniqueFacesTable } from "@/components/unique-faces-table";
import { AppConfigMenu } from "@/components/app-config-menu";
import { Metrics } from "@/components/metrics";

export default function Home() {
  return (
    <div className="flex flex-col lg:flex-col min-h-screen text-white p-4 lg:p-20 gap-6">
      <div className="flex flex-1 flex-col lg:flex-row justify-center lg:px-20 gap-4">
        <FaceRecognitionContainer />
        <UniqueFacesTable />
      </div>

      <TextAnswersComponent />

      <div className="border-b border-b-gray-300 mt-2" />

      <Metrics />
      <FaceDetectionsTable />

      <AppConfigMenu />
    </div>
  );
}
