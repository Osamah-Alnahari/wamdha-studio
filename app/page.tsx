import { HomePage } from "@/components/home-page";
import { APP_NAME } from "@/constants";

export const metadata = {
  title: `${APP_NAME} - Your Digital Reading Companion`,
  description:
    "Transform your reading experience with AI-powered summaries and document analysis",
};

export default function Home() {
  return <HomePage />;
}
