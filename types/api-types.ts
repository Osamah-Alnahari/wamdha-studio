// API response types
export interface SummarizeResponse {
  imageTitle: string;
  summary: string;
}

export interface GenerateImageResponse {
  imageUrl: string;
}

// API function types
export interface SummarizeTextFunction {
  (text: string): Promise<SummarizeResponse>;
}

export interface GenerateImageFunction {
  (prompt: string): Promise<GenerateImageResponse>;
}
