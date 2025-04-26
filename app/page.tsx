import { redirect } from "next/navigation"

export default function Home() {
  // Only redirect the exact root path
  redirect("/books")
}
