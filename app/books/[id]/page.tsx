import { BookDetailsPage } from "@/components/book-details-page"

export const metadata = {
  title: "Book Details - Book Document Splitter",
  description: "View and edit book details",
}

export default function BookDetailsRoute({ params }: { params: { id: string } }) {
  console.log("Rendering BookDetailsRoute with id:", params.id)
  return <BookDetailsPage bookId={params.id} isNew={false} />
}
