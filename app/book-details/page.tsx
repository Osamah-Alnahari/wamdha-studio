import { redirect } from "next/navigation"

export default function BookDetailsPage() {
  // Check if the URL has a query parameter indicating we want to create a new book
  const url = new URL(window.location.href)
  if (url.searchParams.get("new") === "true") {
    redirect("/books/new")
  }

  // Otherwise redirect to the books page
  redirect("/books")
}
