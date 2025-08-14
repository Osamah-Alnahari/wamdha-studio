import {
  Book,
  BookContent,
  PageSummary,
  SummarizeResponse,
  GenerateImageResponse,
} from "@/types";

// Re-export types for use in other modules
export type {
  Book,
  BookContent,
  PageSummary,
  SummarizeResponse,
  GenerateImageResponse,
};

// Get a new empty book template
export function getNewBookTemplate(): Book {
  return {
    id: `book-${Date.now()}`,
    title: "",
    author: "",
    description: "",
    coverImageUrl: undefined,
    isOwnedByUser: false,
    createdAt: Date.now(),
  };
}
