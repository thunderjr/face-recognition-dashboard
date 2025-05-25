export interface AppConfig {
  modelMinConfidence: number;
  similarityThreshold: number;

  calibrating: boolean;
  calibrationConstant: number;
  currentFaceWidth: number | null;
}
