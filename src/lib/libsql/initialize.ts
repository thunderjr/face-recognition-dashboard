"use server";

import { libsqlClient, TABLE_NAME } from "./config";

/**
 * Initializes the sqlite vector database tables for face embedding storage
 */
export async function initializeFaceEmbeddingStore(): Promise<void> {
  await libsqlClient.batch(
    [
      `CREATE TABLE IF NOT EXISTS ${TABLE_NAME} (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        label TEXT,
        embedding F32_BLOB(128),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`,
      `CREATE INDEX IF NOT EXISTS ${TABLE_NAME}_idx ON ${TABLE_NAME} (libsql_vector_idx(embedding))`,
    ],
    "write",
  );
}
