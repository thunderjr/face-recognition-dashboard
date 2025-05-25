export interface FaceRecord {
  embedding: Float32Array;
}

export interface FaceEmbeddingStoreConfig {
  similarityThreshold?: number;
}
