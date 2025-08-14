import { createSlide, updateSlide, deleteSlide } from "@/src/graphql/mutations";
import {
  getSlide,
  listSlides,
  slidesByReadIdAndSlideNumber,
} from "@/src/graphql/queries";

// Slide CRUD Operations
export const createSlideItem = async (client: any, input: any) => {
  try {
    const response = await client.graphql({
      query: createSlide,
      variables: { input },
      authMode: "userPool",
    });
    return response.data?.createSlide || null;
  } catch (error: any) {
    console.log("Error creating slide:", error);
    throw error;
  }
};

export const getSlideById = async (client: any, slideId: string) => {
  try {
    const response = await client.graphql({
      query: getSlide,
      variables: { id: slideId },
      authMode: "userPool",
    });
    return response.data?.getSlide || null;
  } catch (error: any) {
    console.log("Error fetching slide by ID:", error);
    return null;
  }
};

export const updateSlideItem = async (client: any, input: any) => {
  try {
    const response = await client.graphql({
      query: updateSlide,
      variables: { input },
      authMode: "userPool",
    });
    return response.data?.updateSlide || null;
  } catch (error: any) {
    console.log("Error updating slide:", error);
    throw error;
  }
};

export const deleteSlideItem = async (client: any, slideId: string) => {
  try {
    const response = await client.graphql({
      query: deleteSlide,
      variables: { input: { id: slideId } },
      authMode: "userPool",
    });
    return response.data?.deleteSlide || null;
  } catch (error: any) {
    console.log("Error deleting slide:", error);
    throw error;
  }
};

// Slide Query Operations
export const getBookContent = async (client: any, readId: string) => {
  try {
    const response = await client.graphql({
      query: listSlides,
      variables: {
        filter: { readId: { eq: readId } },
        limit: 100,
      },
      authMode: "userPool",
    });

    const slides = response.data?.listSlides?.items || [];

    // Sort slides by slideNumber (ascending)
    slides.sort((a: any, b: any) => a.slideNumber - b.slideNumber);

    return slides;
  } catch (error) {
    console.error("Error fetching slides:", error);
    throw error;
  }
};

export const listAllSlides = async (
  client: any,
  filter?: any,
  limit?: number,
  nextToken?: string
) => {
  try {
    const response = await client.graphql({
      query: listSlides,
      variables: {
        filter,
        limit,
        nextToken,
      },
      authMode: "userPool",
    });
    return response.data?.listSlides || { items: [], nextToken: null };
  } catch (error: any) {
    console.log("Error listing slides:", error);
    return { items: [], nextToken: null };
  }
};

export const getSlidesByReadIdAndSlideNumber = async (
  client: any,
  readId: string,
  slideNumber?: any,
  sortDirection?: any,
  filter?: any,
  limit?: number,
  nextToken?: string
) => {
  try {
    const response = await client.graphql({
      query: slidesByReadIdAndSlideNumber,
      variables: {
        readId,
        slideNumber,
        sortDirection,
        filter,
        limit,
        nextToken,
      },
      authMode: "userPool",
    });
    return (
      response.data?.slidesByReadIdAndSlideNumber || {
        items: [],
        nextToken: null,
      }
    );
  } catch (error: any) {
    console.log("Error fetching slides by read ID and slide number:", error);
    return { items: [], nextToken: null };
  }
};
