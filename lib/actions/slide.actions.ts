import { listSlides } from "@/src/graphql/queries";

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
