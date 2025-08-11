import {
  Book,
  BookContent,
  PageSummary,
  SummarizeResponse,
  GenerateImageResponse,
} from "@/types";

// Re-export types for use in other modules
export type { Book, BookContent, PageSummary, SummarizeResponse, GenerateImageResponse };

// Summarize text
export async function summarizeText(text: string): Promise<SummarizeResponse> {
  // Validate input text
  if (!text || typeof text !== "string" || text.trim().length === 0) {
    throw new Error("Input text must be a non-empty string");
  }
  const url =
    "https://jdypktcpowwsg6wgx7onburtsy0nsuem.lambda-url.me-south-1.on.aws/";

  // Set up AbortController for timeout
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 1000 * 60 * 2); // 2 minutes

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Origin: "http://localhost:3000",
      },
      body: JSON.stringify({ text }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    // Handle specific status codes
    if (!response.ok) {
      const errorText = await response.text();
      switch (response.status) {
        case 400:
          throw new Error("Missing or invalid text in request body");
        case 403:
          throw new Error("Request origin not allowed");
        case 405:
          throw new Error("Invalid HTTP method");
        case 500:
          throw new Error(`Server error: ${errorText}`);
        default:
          throw new Error(`HTTP error ${response.status}: ${errorText}`);
      }
    }

    const data = await response.json();

    // Validate response structure
    if (
      !data ||
      typeof data.imageTitle !== "string" ||
      typeof data.summary !== "string" ||
      !data.imageTitle.trim() ||
      !data.summary.trim()
    ) {
      throw new Error("Invalid response format from server");
    }

    console.log("Summary received:", {
      imageTitle: data.imageTitle,
      summaryLength: data.summary.length,
    });

    return {
      imageTitle: data.imageTitle,
      summary: data.summary,
    };
  } catch (error) {
    // Handle specific errors
    let errorMessage = "Failed to summarize text";
    if ((error as Error).name === "AbortError") {
      errorMessage = "Request timed out";
    } else if ((error as Error).message) {
      errorMessage = (error as Error).message;
    }

    console.error("Summarization error:", errorMessage);
    throw new Error(errorMessage);
  }
}

// Generate image
export async function generateImageFromPrompt(
  prompt: string
): Promise<GenerateImageResponse> {
  // Validate input prompt
  if (!prompt || typeof prompt !== "string" || prompt.trim().length === 0) {
    throw new Error("Input prompt must be a non-empty string");
  }

  const url =
    "https://bvi4upsf3ahhys37bs3knikkge0poftv.lambda-url.me-south-1.on.aws/";

  // Set up AbortController for timeout
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 1000 * 60 * 2); // 2 minutes

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Origin: "http://localhost:3000",
      },
      body: JSON.stringify({ prompt }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    // Handle specific status codes
    if (!response.ok) {
      const errorText = await response.text();
      switch (response.status) {
        case 400:
          throw new Error("Missing or invalid prompt in request body");
        case 403:
          throw new Error("Request origin not allowed");
        case 405:
          throw new Error("Invalid HTTP method");
        case 500:
          throw new Error(`Server error: ${errorText}`);
        default:
          throw new Error(`HTTP error ${response.status}: ${errorText}`);
      }
    }

    const data = await response.json();

    // Validate response structure
    if (!data || typeof data.imageUrl !== "string" || !data.imageUrl.trim()) {
      throw new Error("Invalid response format from server");
    }

    console.log("Image URL received:", data.imageUrl);

    return {
      imageUrl: data.imageUrl,
    };
  } catch (error) {
    // Handle specific errors
    let errorMessage = "Failed to generate image";
    if ((error as Error).name === "AbortError") {
      errorMessage = "Request timed out";
    } else if ((error as Error).message) {
      errorMessage = (error as Error).message;
    }

    console.error("Image generation error:", errorMessage);
    throw new Error(errorMessage);
  }
}

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
