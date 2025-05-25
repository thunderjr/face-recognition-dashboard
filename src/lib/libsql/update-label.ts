"use server";

import { libsqlClient, TABLE_NAME } from "./config";

/**
 * Updates the label column for a specific record
 */
export async function updateFaceLabel(
  id: number,
  newLabel: string,
): Promise<void> {
  await libsqlClient.execute({
    sql: `UPDATE ${TABLE_NAME} SET label = ? WHERE id = ?`,
    args: [newLabel, id],
  });
}
