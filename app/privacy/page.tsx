import { PrivacyPage } from "@/components/privacy-page";
import { APP_NAME } from "@/constants";

export const metadata = {
  title: `Privacy Policy - ${APP_NAME}`,
  description: `Learn how ${APP_NAME} protects your privacy and handles your data with the utmost care.`,
};

export default function Privacy() {
  return <PrivacyPage />;
}
