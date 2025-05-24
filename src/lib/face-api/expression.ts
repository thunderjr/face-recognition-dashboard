import { Expression } from "@/types";

type ExpressionResult = {
  expression: Expression;
  probability: number;
};

export const getHighestExpression = (
  data: Record<Expression, number>,
): ExpressionResult => {
  const [expression, expressionProbability] = Object.entries(data).reduce(
    (acc, [expression, probability]) => {
      if (probability > acc[1]) {
        return [expression, probability];
      }
      return acc;
    },
  ) as [Expression, number];

  return {
    expression,
    probability: expressionProbability,
  };
};
