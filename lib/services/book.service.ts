import {
  createSlide,
  deleteSlide,
  deleteRead,
  createRead,
  updateRead,
} from "@/src/graphql/mutations";
import { getRead, listReads, listSlides } from "@/src/graphql/queries";
import { PageSummary } from "../api-client";

// Book CRUD Operations
export const createBook = async (client: any, input: any) => {
  try {
    const response = await client.graphql({
      query: createRead,
      variables: { input },
      authMode: "userPool",
    });
    return response.data?.createRead || null;
  } catch (error: any) {
    console.log("Error creating book:", error);
    throw error;
  }
};

export const getBookById = async (client: any, bookId: string) => {
  try {
    const response = await client.graphql({
      query: getRead,
      variables: { id: bookId },
      authMode: "userPool",
    });
    return response.data?.getRead || null;
  } catch (error: any) {
    console.log("Error fetching book by ID:", error);
    return null;
  }
};

export const updateBook = async (client: any, input: any) => {
  try {
    const response = await client.graphql({
      query: updateRead,
      variables: { input },
      authMode: "userPool",
    });
    return response.data?.updateRead || null;
  } catch (error: any) {
    console.log("Error updating book:", error);
    throw error;
  }
};

export const deleteBook = async (client: any, bookId: string) => {
  try {
    // Step 1: Delete all associated slides
    const slidesResult = await deleteSlidesByBook(client, bookId);

    if (!slidesResult.success) {
      console.log("Failed to delete slides:", slidesResult.error);
    }

    // Step 2: Delete the book itself
    const bookResult = await client.graphql({
      query: deleteRead,
      variables: {
        input: { id: bookId },
      },
      authMode: "userPool",
    });

    const deletedBook = bookResult.data?.deleteRead;

    if (!deletedBook) {
      console.log("Failed to delete book:", bookResult.errors);
    }

    return {
      success: true,
      deletedBookId: deletedBook.id,
      deletedSlideCount: slidesResult.deletedCount,
    };
  } catch (error: any) {
    console.log("Error deleting book and its slides:", error);
    return {
      success: false,
      error: error.message || "Unknown error occurred during deletion.",
    };
  }
};

export const getUserBooks = async (client: any, userId: string) => {
  try {
    const response = await client.graphql({
      query: listReads,
      variables: {
        filter: { userId: { eq: userId } },
        limit: 100, // Adjust as necessary
      },
      authMode: "userPool",
    });
    return response.data?.listReads?.items || [];
  } catch (error: any) {
    console.log("Error fetching user books:", error);
    return [];
  }
};

export const listAllBooks = async (
  client: any,
  filter?: any,
  limit?: number,
  nextToken?: string
) => {
  try {
    const response = await client.graphql({
      query: listReads,
      variables: {
        filter,
        limit,
        nextToken,
      },
      authMode: "userPool",
    });
    return response.data?.listReads || { items: [], nextToken: null };
  } catch (error: any) {
    console.log("Error listing books:", error);
    return { items: [], nextToken: null };
  }
};

// Slide Operations
export const uploadSlides = async (
  client: any,
  readId: string,
  pageSummaries: PageSummary[]
) => {
  try {
    const uploadPromises = pageSummaries.map((page, index) => {
      const input = {
        readId,
        slideNumber: index + 1,
        text: page.content,
        imageUrl: page.imageUrl || "",
      };

      return client.graphql({
        query: createSlide,
        variables: { input },
        authMode: "userPool",
      });
    });

    const results = await Promise.all(uploadPromises);

    return {
      success: true,
      uploadedCount: results.length,
      results,
    };
  } catch (error: any) {
    console.log("Error uploading slides:", error);

    const errorMessage =
      error.errors?.[0]?.message || error.message || "Unknown error occurred";

    return {
      success: false,
      error: errorMessage,
    };
  }
};

export const deleteSlidesByBook = async (client: any, readId: string) => {
  try {
    // Fetch all slides associated with this book
    const slidesResponse = await client.graphql({
      query: listSlides,
      variables: {
        filter: { readId: { eq: readId } },
        limit: 1000,
      },
      authMode: "userPool",
    });
    const slides = slidesResponse.data?.listSlides?.items || [];
    if (slides.length === 0) {
      console.log("No slides found to delete.");
      return {
        success: true,
        deletedCount: 0,
        message: "No slides existed for deletion.",
      };
    }

    // Delete each slide individually
    const deletePromises = slides.map((slide: any) =>
      client.graphql({
        query: deleteSlide,
        variables: { input: { id: slide.id } },
        authMode: "userPool",
      })
    );
    await Promise.all(deletePromises);

    return {
      success: true,
      deletedCount: slides.length,
      message: `${slides.length} slides successfully deleted.`,
    };
  } catch (error: any) {
    console.log("Error deleting slides:", error);
    return {
      success: false,
      error: error.message || "Unknown error occurred",
    };
  }
};
