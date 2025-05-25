"use server";

import { libsqlClient, TABLE_NAME } from "./config";

/**
 * Stores a face embedding in the database
 */
export async function saveFaceEmbedding(data: Float32Array): Promise<number> {
  const embeddingVector = `[${Array.from(data).join(",")}]`;

  const result = await libsqlClient.execute({
    sql: `INSERT INTO ${TABLE_NAME} (embedding) VALUES (vector32(?))`,
    args: [embeddingVector],
  });

  return Number(result.lastInsertRowid);
}
