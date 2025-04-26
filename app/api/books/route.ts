import { NextResponse } from "next/server"

// GET /api/books - Get all books
export async function GET() {
  try {
    // In a real application, this would fetch from a database
    // For this demo, we'll read from localStorage on the client side
    return NextResponse.json({ message: "This endpoint is meant to be called from client components" })
  } catch (error) {
    console.error("Error fetching books:", error)
    return NextResponse.json({ error: "Failed to fetch books" }, { status: 500 })
  }
}

// POST /api/books - Create a new book
export async function POST(request: Request) {
  try {
    const bookData = await request.json()

    if (!bookData.title || !bookData.author) {
      return NextResponse.json({ error: "Title and author are required" }, { status: 400 })
    }

    // Generate a unique ID if not provided
    const book = {
      ...bookData,
      id: bookData.id || `book-${Date.now()}`,
      createdAt: bookData.createdAt || Date.now(),
    }

    // In a real application, this would save to a database
    // For this demo, we'll handle saving in the client component

    return NextResponse.json(book, { status: 201 })
  } catch (error) {
    console.error("Error creating book:", error)
    return NextResponse.json({ error: "Failed to create book" }, { status: 500 })
  }
}
