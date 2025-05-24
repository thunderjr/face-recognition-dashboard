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
  id?: string;
  timestamp: number;
  distance_in_meters: number;
  age: number;
  gender: Gender;
  expression: Expression;
};
