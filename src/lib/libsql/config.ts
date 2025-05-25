import { createClient } from "@libsql/client";

export const TABLE_NAME = "face_embeddings";

if (!process.env.TURSO_DATABASE_URL) {
  throw new Error("TURSO_DATABASE_URL is not defined");
}

/**
 * Storage for face vector data using libSQL vector extension for sqlite3.
 * @see https://github.com/tursodatabase/libsql-client-ts/blob/main/examples/vector/index.mjs
 */
export const libsqlClient = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});
