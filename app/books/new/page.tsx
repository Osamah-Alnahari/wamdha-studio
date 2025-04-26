import { BookDetailsPage } from "@/components/book-details-page"

export const metadata = {
  title: "Create New Book - Book Document Splitter",
  description: "Create a new book and enter its details",
}

export default function NewBookPage() {
  // Force isNew to be true to prevent any redirection
  return <BookDetailsPage isNew={true} />
}
