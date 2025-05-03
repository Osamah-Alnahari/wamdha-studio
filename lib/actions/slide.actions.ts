import { listSlides } from "@/src/graphql/queries";
import { client } from "../amplify";

export const getBookContent = async (readId: string) => {
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
    slides.sort((a, b) => a.slideNumber - b.slideNumber);

    return slides;
  } catch (error) {
    console.error("Error fetching slides:", error);
    throw error;
  }
};
