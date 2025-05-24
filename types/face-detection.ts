export type Expression =
  | "neutral"
  | "happy"
  | "sad"
  | "angry"
  | "fearful"
  | "disgusted"
  | "surprised";

export type Gender = "male" | "female";

export type DetectionLog = {
  timestamp: string;
  distance: number;
  age: number;
  gender: Gender;
  expression: Expression;
};
