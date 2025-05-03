import { BookDetailsPage } from "@/components/shared/book/book-details-page";

export const metadata = {
  title: "Book Details",
  description: "View and edit book details",
};

export default async function BookDetailsRoute({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <BookDetailsPage bookId={id} isNew={false} />;
}
