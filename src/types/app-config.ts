export interface AppConfig {
  modelMinConfidence: number;
  similarityThreshold: number;

  calibratingDistance: boolean;
  currentFaceWidth: number | null;
  distanceCalibrationConstant: number;
}
