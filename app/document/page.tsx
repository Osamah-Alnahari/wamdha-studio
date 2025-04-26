import { redirect } from "next/navigation"

export default function Document() {
  // Redirect to the books page
  redirect("/books")
}
