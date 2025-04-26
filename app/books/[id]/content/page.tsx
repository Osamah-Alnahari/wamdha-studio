import { DocumentPage } from "@/components/document-page";

export const metadata = {
  title: "Content Management",
  description: "Manage book content and create summaries",
};

export default async function BookContentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <DocumentPage bookId={id} />;
}
