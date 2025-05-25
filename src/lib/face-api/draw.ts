import * as faceapi from "face-api.js";

import type { FaceDetectionProps, RawDetectionResult } from "./types";
import { translateGender, translateExpression } from "../translation";
import { findSimilarFaceEmbedding } from "@/lib/libsql";
import { getHighestExpression } from "./expression";

export async function drawDetections(
  { overlayRef, videoRef }: FaceDetectionProps,
  result: RawDetectionResult[],
) {
  if (videoRef.current && overlayRef.current) {
    if (!result || result?.length === 0) return clearCanvas(overlayRef.current);

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
  return async (data: RawDetectionResult) => {
    const { expression, probability: expressionProbability } =
      getHighestExpression(data.expressions);

    const { age, gender, genderProbability } = data;
    const texts = [
      `${faceapi.utils.round(age, 0)} anos`,
      `${translateGender(gender)} (${faceapi.utils.round(genderProbability * 100)}%)`,
      `${translateExpression(expression)} (${faceapi.utils.round(expressionProbability * 100)}%)`,
    ];

    const dbData = await findSimilarFaceEmbedding(data.descriptor).catch(
      (error) => {
        console.error("Error querying face embedding:", error);
        return null;
      },
    );

    if (dbData) {
      texts.unshift(
        dbData.label ? `Nome: ${dbData.label}` : `ID: ${dbData.id}`,
      );
    }

    new faceapi.draw.DrawTextField(texts, data.detection.box.bottomLeft).draw(
      canvas,
    );
  };
}

function clearCanvas(canvas: HTMLCanvasElement): void {
  const context = canvas.getContext("2d");
  if (context) {
    context.clearRect(0, 0, canvas.width, canvas.height);
  }
}
