import { OurStoryPage } from "@/components/ourstory-page";
import { APP_NAME } from "@/constants";

export const metadata = {
  title: `Our Story - ${APP_NAME}`,
  description: `Discover the journey behind ${APP_NAME} and our mission to revolutionize digital reading`,
};

export default function OurStory() {
  return <OurStoryPage />;
}
