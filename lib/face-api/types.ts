import { Expression, Gender } from "@/types";

export type RawDetectionResult = {
  expressions: Record<Expression, number>;
  genderProbability: number;
  gender: Gender;
  age: number;
};
