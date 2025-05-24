import type { Expression, Gender } from "@/types";

const expressions: Record<Expression, string> = {
  disgusted: "Revoltado",
  fearful: "Medroso",
  happy: "Feliz",
  sad: "Triste",
  neutral: "Neutro",
  surprised: "Surpreso",
  angry: "Irritado",
};

export const translateExpression = (expression: Expression): string => {
  return expressions[expression] || expression;
};

const genderTranslations: Record<Gender, string> = {
  female: "Feminino",
  male: "Masculino",
};

export const translateGender = (gender: Gender): string => {
  return genderTranslations[gender] || gender;
};
