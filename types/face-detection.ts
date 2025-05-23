export type Expression = "happy" | "sad" | "neutral" | "surprised" | "angry";
type Gender = "male" | "female";

export type FaceDetectionData = {
  timestamp: string;
  distance: number;
  age: number;
  gender: Gender;
  expression: Expression;
};
