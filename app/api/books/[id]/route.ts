import { NextResponse } from "next/server"

// GET /api/books/[id] - Get a specific book
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    // In a real application, this would fetch from a database
    // For this demo, we'll read from localStorage on the client side

    return NextResponse.json({ message: "This endpoint is meant to be called from client components", id })
  } catch (error) {
    console.error("Error fetching book:", error)
    return NextResponse.json({ error: "Failed to fetch book" }, { status: 500 })
  }
}

// PUT /api/books/[id] - Update a specific book
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const bookData = await request.json()

    if (!bookData.title || !bookData.author) {
      return NextResponse.json({ error: "Title and author are required" }, { status: 400 })
    }

    // In a real application, this would update in a database
    // For this demo, we'll handle saving in the client component

    return NextResponse.json({ ...bookData, id })
  } catch (error) {
    console.error("Error updating book:", error)
    return NextResponse.json({ error: "Failed to update book" }, { status: 500 })
  }
}

// DELETE /api/books/[id] - Delete a specific book
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    // In a real application, this would delete from a database
    // For this demo, we'll handle deletion in the client component

    return NextResponse.json({ message: "Book deleted successfully", id })
  } catch (error) {
    console.error("Error deleting book:", error)
    return NextResponse.json({ error: "Failed to delete book" }, { status: 500 })
  }
}
