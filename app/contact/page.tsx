import { ContactPage } from "@/components/contact-page";
import { APP_NAME } from "@/constants";

export const metadata = {
  title: `Contact Us - ${APP_NAME}`,
  description: `Get in touch with the ${APP_NAME} team. We'd love to hear from you.`,
};

export default function Contact() {
  return <ContactPage />;
}
