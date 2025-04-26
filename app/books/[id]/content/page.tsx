import { DocumentPage } from "@/components/document-page"

export const metadata = {
  title: "Content Management - Book Document Splitter",
  description: "Manage book content and create summaries",
}

export default function BookContentPage({ params }: { params: { id: string } }) {
  return <DocumentPage bookId={params.id} />
}
