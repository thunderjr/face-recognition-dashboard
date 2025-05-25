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

  face_external_id: number; // ID of the face saved in the embeddings database
  face_label?: string; // Name of the face saved in the embeddings database
};
