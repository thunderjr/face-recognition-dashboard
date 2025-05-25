"use server";

import {
  TABLE_NAME,
  libsqlClient,
  DEFAULT_SIMILARITY_THRESHOLD,
} from "./config";

export type FaceEmbeddingRow = {
  id: number;
  label: string | null;
};

/**
 * Queries a similar face embedding in the database
 */
export async function findSimilarFaceEmbedding(
  embedding: Float32Array,
): Promise<FaceEmbeddingRow | undefined> {
  const embeddingArray = Array.from(embedding);
  const queryVector = `[${embeddingArray.join(",")}]`;

  const result = await libsqlClient.execute({
    sql: `
      SELECT
        id,
        label,
        vector_distance_cos(embedding, vector32(?)) as distance
      FROM ${TABLE_NAME}
      WHERE distance <= ?
      ORDER BY distance ASC LIMIT 1`,
    args: [queryVector, DEFAULT_SIMILARITY_THRESHOLD],
  });

  if (!result || result.rows.length === 0) {
    return undefined;
  }

  const data = {
    id: Number(result.rows[0]?.id) ?? 0,
    label: result.rows[0]?.label?.toString() ?? null,
  };

  return data;
}

/**
 * Queries all face saved on the database
 */
export async function getAllFaceEmbeddings(): Promise<FaceEmbeddingRow[]> {
  const result = await libsqlClient.execute({
    sql: `SELECT id, label FROM ${TABLE_NAME}`,
  });

  if (!result || result.rows.length === 0) {
    return [];
  }

  return result.rows.map((row) => ({
    id: Number(row?.id) ?? 0,
    label: row?.label?.toString() ?? null,
  }));
}

/**
 * Queries the count of face saved on the database
 */
export async function getFaceCount(): Promise<number> {
  const result = await libsqlClient.execute({
    sql: `SELECT COUNT(*) as count FROM ${TABLE_NAME}`,
  });

  if (!result || result.rows.length === 0) {
    return 0;
  }

  return Number(result.rows[0]?.count) ?? 0;
}
