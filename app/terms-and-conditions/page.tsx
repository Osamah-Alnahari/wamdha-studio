import { TermsPage } from "@/components/terms-page";
import { APP_NAME } from "@/constants";

export const metadata = {
  title: `Terms and Conditions - ${APP_NAME}`,
  description: `Read the terms and conditions for using ${APP_NAME}'s AI-powered reading platform.`,
};

export default function TermsAndConditions() {
  return <TermsPage />;
}
