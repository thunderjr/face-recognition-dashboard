import * as faceapi from "face-api.js";

import { translateExpression, translateGender } from "../translation";
import { getHighestExpression } from "@/lib/face-api/expression";
import type { RawDetectionResult } from "./types";

type Props = {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  overlayRef: React.RefObject<HTMLCanvasElement | null>;
};

const options = new faceapi.SsdMobilenetv1Options({
  minConfidence: 0.3,
});

export async function handleFaceDetections({
  overlayRef,
  videoRef,
}: Props): Promise<RawDetectionResult[] | undefined> {
  if (videoRef.current && overlayRef.current) {
    const result = await faceapi
      .detectAllFaces(videoRef.current, options)
      .withFaceExpressions()
      .withAgeAndGender();

    if (result && result.length > 0) {
      const dims = faceapi.matchDimensions(
        overlayRef.current,
        videoRef.current,
        true,
      );

      const resizedResults = faceapi.resizeResults(result, dims);
      faceapi.draw.drawDetections(overlayRef.current, resizedResults);

      await Promise.allSettled(
        resizedResults.map(drawDetectionLabel(overlayRef.current)),
      );

      return result;
    }

    clearCanvas(overlayRef.current);
  }
}

/**
 * Returns a high order function to iterate the detection results.
 * The returned function returns a Promise to use with Promise.allSettled() and draw all the detection labels at once.
 * @param {HTMLCanvasElement} canvas - The camera overlay canvas.
 * @returns {(data: RawDetectionResult) => Promise<void>} High order function that will draw the detection label on the canvas
 */
function drawDetectionLabel(
  canvas: HTMLCanvasElement,
): (data: RawDetectionResult) => Promise<void> {
  return (data: RawDetectionResult) => {
    const { age, gender, genderProbability } = data;
    const { expression, probability: expressionProbability } =
      getHighestExpression(data.expressions);

    const textField = new faceapi.draw.DrawTextField(
      [
        `Idade: ${faceapi.utils.round(age, 0)}`,
        `${translateGender(gender)} (${faceapi.utils.round(genderProbability * 100)}%)`,
        `${translateExpression(expression)} (${faceapi.utils.round(expressionProbability * 100)}%)`,
      ],
      data.detection.box.bottomLeft,
    );

    textField.draw(canvas);

    return Promise.resolve();
  };
}

function clearCanvas(canvas: HTMLCanvasElement): void {
  const context = canvas.getContext("2d");
  if (context) {
    context.clearRect(0, 0, canvas.width, canvas.height);
  }
}
